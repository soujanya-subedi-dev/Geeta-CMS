from rest_framework import viewsets, permissions
from .models import Blog, Comment, GalleryImage, Event, Testimonial, Notice, CommentUser
from .serializers import (BlogSerializer, CommentSerializer, 
                          GalleryImageSerializer, EventSerializer, 
                          TestimonialSerializer, NoticeSerializer,
                          CommentUserSerializer)

# User signup viewset
class CommentUserViewSet(viewsets.ModelViewSet):
    queryset = CommentUser.objects.all()
    serializer_class = CommentUserSerializer
    permission_classes = [permissions.AllowAny]  # anyone can register

# Blog CRUD
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# Comment CRUD
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(approved=True).order_by('-created_at')
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Other CRUD (events, gallery, testimonial, notice)
class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by('-uploaded_at')
    serializer_class = GalleryImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-start_datetime')
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all().order_by('-created_at')
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all().order_by('-published_date')
    serializer_class = NoticeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
