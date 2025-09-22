from rest_framework.routers import DefaultRouter

from .views import TestimonialViewSet

router = DefaultRouter()
router.register(r"testimonials", TestimonialViewSet, basename="testimonials")

urlpatterns = router.urls
