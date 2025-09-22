from rest_framework import permissions, viewsets
from rest_framework.exceptions import ValidationError

from .models import Blog, Comment
from .serializers import BlogSerializer, CommentSerializer


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().prefetch_related("comments")
    serializer_class = BlogSerializer
    lookup_field = "slug"
    filterset_fields = ["author"]
    search_fields = ["title", "content", "author"]
    ordering_fields = ["created_at", "updated_at", "title"]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.select_related("blog")
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ["blog__slug", "blog__id"]
    search_fields = ["name", "email", "message"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        blog_slug = self.request.query_params.get("blog_slug")
        blog_id = self.request.query_params.get("blog")
        if blog_slug:
            queryset = queryset.filter(blog__slug=blog_slug)
        if blog_id:
            queryset = queryset.filter(blog_id=blog_id)
        return queryset

    def perform_create(self, serializer):
        blog = serializer.validated_data.get("blog")
        if not blog:
            raise ValidationError("Blog is required for a comment.")
        serializer.save()
