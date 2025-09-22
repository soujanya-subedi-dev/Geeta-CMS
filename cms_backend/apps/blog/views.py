from rest_framework import decorators, permissions, response, status, viewsets
from rest_framework.views import APIView

from apps.events.serializers import EventSerializer
from apps.events.models import Event
from apps.testimonials.models import Testimonial
from apps.testimonials.serializers import TestimonialSerializer
from apps.notices.models import Notice
from apps.notices.serializers import NoticeSerializer

from .models import Blog, Comment
from .serializers import BlogSerializer, CommentSerializer


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().prefetch_related("comments")
    serializer_class = BlogSerializer
    lookup_field = "slug"
    filterset_fields = ["author"]
    search_fields = ["title", "content", "author__username"]
    ordering_fields = ["created_at", "updated_at", "title"]
    permission_classes = [permissions.IsAdminUser]

    def get_permissions(self):
        if self.action in ["list", "retrieve", "comments"]:
            return [permissions.AllowAny()]
        if self.action == "create_comment":
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user if self.request.user.is_authenticated else None)

    def perform_update(self, serializer):
        serializer.save(author=self.request.user if self.request.user.is_authenticated else None)

    @decorators.action(detail=True, methods=["get"], url_path="comments")
    def comments(self, request, slug=None):
        blog = self.get_object()
        queryset = blog.comments.all()
        if not request.user.is_staff:
            queryset = queryset.filter(approved=True, rejected=False)
        serializer = CommentSerializer(queryset, many=True)
        return response.Response(serializer.data)

    @decorators.action(
        detail=True,
        methods=["post"],
        permission_classes=[permissions.IsAuthenticated],
        url_path="comments",
    )
    def create_comment(self, request, slug=None):
        blog = self.get_object()
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        Comment.objects.create(
            blog=blog,
            user=request.user,
            content=serializer.validated_data["content"],
        )
        return response.Response({"detail": "Comment submitted for moderation."}, status=status.HTTP_201_CREATED)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.select_related("blog")
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAdminUser]
    filterset_fields = ["blog__slug", "blog__id", "approved", "rejected"]
    search_fields = ["content", "user__username"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_staff:
            queryset = queryset.filter(approved=True, rejected=False)
        return queryset

    @decorators.action(detail=True, methods=["post"], url_path="approve")
    def approve(self, request, pk=None):
        comment = self.get_object()
        comment.approved = True
        comment.rejected = False
        comment.save(update_fields=["approved", "rejected"])
        return response.Response({"status": "approved"})

    @decorators.action(detail=True, methods=["post"], url_path="reject")
    def reject(self, request, pk=None):
        comment = self.get_object()
        comment.approved = False
        comment.rejected = True
        comment.save(update_fields=["approved", "rejected"])
        return response.Response({"status": "rejected"})


class HomeSummaryView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        blogs = Blog.objects.order_by("-created_at")[:3]
        events = Event.objects.order_by("start")[:3]
        testimonials = Testimonial.objects.order_by("-created_at")[:2]
        notices = Notice.objects.order_by("-published_date")[:3]

        data = {
            "blogs": BlogSerializer(blogs, many=True, context={"request": request}).data,
            "events": EventSerializer(events, many=True, context={"request": request}).data,
            "testimonials": TestimonialSerializer(
                testimonials, many=True, context={"request": request}
            ).data,
            "notices": NoticeSerializer(notices, many=True, context={"request": request}).data,
        }
        return response.Response(data)
