from django.contrib import admin

from .models import Event, EventRegistration


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "start", "end", "location")
    list_filter = ("start", "end")
    search_fields = ("title", "location")


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ("event", "name", "contact", "interested", "created_at")
    list_filter = ("interested", "created_at")
    search_fields = ("event__title", "name", "contact")
    autocomplete_fields = ("event",)
