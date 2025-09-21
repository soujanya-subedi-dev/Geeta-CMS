from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    BlogViewSet, GalleryImageViewSet, EventViewSet, 
    TestimonialViewSet, NoticeViewSet, CommentViewSet,
    CommentUserViewSet
)

router = DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blog')
router.register(r'gallery', GalleryImageViewSet, basename='gallery')
router.register(r'events', EventViewSet, basename='event')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'notices', NoticeViewSet, basename='notice')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'users', CommentUserViewSet, basename='user')  # signup

urlpatterns = [path('', include(router.urls))]
