from rest_framework import serializers

from .models import Blog, Comment


class CommentSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source="display_name", read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "blog",
            "user",
            "name",
            "email",
            "message",
            "created_at",
            "display_name",
        ]
        read_only_fields = ["id", "user", "created_at", "display_name"]

    def validate(self, attrs):
        request = self.context.get("request")
        user = getattr(request, "user", None)
        email = attrs.get("email")
        name = attrs.get("name")
        if (not user or not user.is_authenticated) and not email:
            raise serializers.ValidationError("Email is required for guest comments.")
        if email and not name:
            attrs["name"] = email.split("@")[0]
        return attrs


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
        read_only_fields = ["id", "slug", "created_at", "updated_at"]
