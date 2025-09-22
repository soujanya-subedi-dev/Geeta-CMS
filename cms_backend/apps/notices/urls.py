from rest_framework.routers import DefaultRouter

from .views import NoticeViewSet

router = DefaultRouter()
router.register(r"notices", NoticeViewSet, basename="notices")

urlpatterns = router.urls
