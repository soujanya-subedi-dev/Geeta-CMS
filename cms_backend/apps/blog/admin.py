from django.contrib import admin

from .models import Blog, Comment


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "created_at", "updated_at")
    search_fields = ("title", "author")
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ("created_at",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("blog", "email", "created_at")
    search_fields = ("blog__title", "email", "name")
    list_filter = ("created_at",)
    autocomplete_fields = ("blog",)
