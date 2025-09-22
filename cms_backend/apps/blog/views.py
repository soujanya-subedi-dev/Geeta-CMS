from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, viewsets

from .models import Blog, Comment
from .serializers import BlogSerializer, CommentSerializer


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().prefetch_related("comments")
    serializer_class = BlogSerializer
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["author"]
    search_fields = ["title", "author", "content"]
    ordering_fields = ["created_at", "title"]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.select_related("blog", "user")
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["blog"]
    ordering = ["-created_at"]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user if self.request.user.is_authenticated else None)
