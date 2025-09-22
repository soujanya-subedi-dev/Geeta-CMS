from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Custom User admin, based on Django's built-in UserAdmin.
    """

    # Fields shown in list view
    list_display = ("username", "email", "is_staff", "is_superuser")

    # Search bar support
    search_fields = ("username", "email")

    # Filters in sidebar
    list_filter = ("is_staff", "is_superuser", "is_active")

    # Optional: organize fieldsets
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Custom Fields", {"fields": ("is_admin",)}),  # your custom field
    )
