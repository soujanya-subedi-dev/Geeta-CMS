from django.contrib import admin

from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "date", "location", "registration_link")
    search_fields = ("title", "location", "description")
    list_filter = ("date",)
    ordering = ("-date",)
