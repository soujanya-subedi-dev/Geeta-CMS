from rest_framework import decorators, permissions, response, status, viewsets

from .models import Event, EventRegistration
from .serializers import EventRegistrationSerializer, EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().prefetch_related("registrations")
    serializer_class = EventSerializer
    filterset_fields = ["start", "end", "location"]
    search_fields = ["title", "location", "description"]
    ordering_fields = ["start", "title", "created_at"]
    permission_classes = [permissions.IsAdminUser]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        if self.action == "register":
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    @decorators.action(
        detail=True,
        methods=["post"],
        permission_classes=[permissions.IsAuthenticated],
        url_path="register",
    )
    def register(self, request, pk=None):
        event = self.get_object()
        serializer = EventRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        registration = EventRegistration.objects.create(
            event=event,
            name=serializer.validated_data["name"],
            contact=serializer.validated_data["contact"],
            age=serializer.validated_data.get("age"),
            interested=serializer.validated_data.get("interested", True),
        )
        return response.Response(
            EventRegistrationSerializer(registration).data,
            status=status.HTTP_201_CREATED,
        )

    @decorators.action(
        detail=True,
        methods=["get"],
        permission_classes=[permissions.IsAdminUser],
        url_path="registrations",
    )
    def registrations(self, request, pk=None):
        event = self.get_object()
        registrations = event.registrations.all()
        serializer = EventRegistrationSerializer(registrations, many=True)
        return response.Response(serializer.data)
