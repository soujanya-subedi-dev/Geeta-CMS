from django.contrib import admin

from .models import Notice


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ("title", "published_date", "attachment")
    search_fields = ("title", "description")
    list_filter = ("published_date",)
