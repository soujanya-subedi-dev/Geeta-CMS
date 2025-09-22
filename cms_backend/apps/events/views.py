from rest_framework import viewsets

from .models import Event
from .serializers import EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_fields = ["date", "location"]
    search_fields = ["title", "location", "description"]
    ordering_fields = ["date", "title", "created_at"]
