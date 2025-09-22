from rest_framework import viewsets

from .models import Notice
from .serializers import NoticeSerializer


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer
    filterset_fields = ["published_date"]
    search_fields = ["title", "description"]
    ordering_fields = ["published_date", "title", "created_at"]
