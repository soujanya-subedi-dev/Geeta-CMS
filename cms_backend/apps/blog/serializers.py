from rest_framework import serializers

from .models import Blog, Comment


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "blog", "user", "content", "created_at", "approved", "rejected"]
        read_only_fields = ["id", "created_at", "approved", "rejected", "user", "blog"]
        extra_kwargs = {"content": {"required": True}}


class BlogSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    author = serializers.StringRelatedField(read_only=True)
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)

    class Meta:
        model = Blog
        fields = [
            "id",
            "title",
            "slug",
            "featured_image",
            "author",
            "content",
            "created_at",
            "updated_at",
            "comments",
            "comments_count",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "slug",
            "comments",
            "comments_count",
            "author",
        ]
