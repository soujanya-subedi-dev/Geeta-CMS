from rest_framework import serializers
from .models import Blog, Comment, GalleryImage, Event, Testimonial, Notice, CommentUser

class CommentUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = CommentUser
        fields = ['id', 'email', 'full_name', 'password']

    def create(self, validated_data):
        user = CommentUser.objects.create_user(**validated_data)
        return user

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')
    class Meta:
        model = Comment
        fields = ["id","blog","user","text","created_at","approved"]
        read_only_fields = ["id","created_at","user","approved"]

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.email')
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Blog
        fields = ["id","title","slug","author","content","excerpt",
                  "featured_image","is_published","created_at","updated_at","comments"]
        read_only_fields = ["slug","created_at","updated_at"]

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ['id','title','image','caption','uploaded_at']
        read_only_fields = ['uploaded_at']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id','title','description','start_datetime','end_datetime','location','image','created_at']
        read_only_fields = ['created_at']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id','name','message','photo','created_at']
        read_only_fields = ['created_at']

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = ['id','title','file','published_date','expires_at']
