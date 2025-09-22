from rest_framework.routers import DefaultRouter

from django.urls import path
from .views import BlogViewSet, CommentViewSet, HomeSummaryView

router = DefaultRouter()
router.register(r"blogs", BlogViewSet, basename="blogs")
router.register(r"comments", CommentViewSet, basename="comments")

urlpatterns = [
    path("home/summary/", HomeSummaryView.as_view(), name="home-summary"),
]
urlpatterns += router.urls
