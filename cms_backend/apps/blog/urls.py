from rest_framework.routers import DefaultRouter

from .views import BlogViewSet, CommentViewSet

router = DefaultRouter()
router.register(r"blog", BlogViewSet, basename="blog")
router.register(r"comments", CommentViewSet, basename="comments")

urlpatterns = router.urls
