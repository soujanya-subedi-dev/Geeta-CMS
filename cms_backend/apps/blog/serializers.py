from rest_framework import serializers

from .models import Blog, Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "blog", "name", "email", "message", "created_at"]
        read_only_fields = ["id", "created_at"]


class BlogSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = [
            "id",
            "title",
            "slug",
            "image",
            "author",
            "content",
            "created_at",
            "updated_at",
            "comments",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "slug", "comments"]
