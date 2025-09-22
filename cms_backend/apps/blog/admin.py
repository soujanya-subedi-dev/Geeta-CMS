from django.contrib import admin

from .models import Blog, Comment


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "created_at", "updated_at")
    search_fields = ("title", "author__username")
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ("created_at",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("blog", "user", "approved", "rejected", "created_at")
    search_fields = ("blog__title", "user__username", "content")
    list_filter = ("created_at", "approved", "rejected")
    autocomplete_fields = ("blog", "user")
