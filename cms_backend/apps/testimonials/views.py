from rest_framework import filters, permissions, viewsets

from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "designation", "message"]
    ordering_fields = ["created_at", "name"]
    ordering = ["-created_at"]
