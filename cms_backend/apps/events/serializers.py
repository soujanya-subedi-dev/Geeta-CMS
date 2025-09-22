from rest_framework import serializers

from .models import Event, EventRegistration


class EventSerializer(serializers.ModelSerializer):
    registrations_count = serializers.IntegerField(source="registrations.count", read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "description",
            "start",
            "end",
            "location",
            "created_at",
            "updated_at",
            "registrations_count",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = ["id", "event", "name", "contact", "age", "interested", "created_at"]
        read_only_fields = ["id", "created_at", "event"]
