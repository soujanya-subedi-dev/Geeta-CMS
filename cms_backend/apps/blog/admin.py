from django.contrib import admin

from .models import Blog, Comment


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "created_at", "updated_at")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "author", "content")
    list_filter = ("created_at", "author")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("blog", "display_name", "email", "created_at")
    search_fields = ("message", "email", "name", "blog__title")
    list_filter = ("created_at",)
    autocomplete_fields = ("blog", "user")
    readonly_fields = ("created_at",)
