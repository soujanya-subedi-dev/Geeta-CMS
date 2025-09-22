from django.contrib import admin

from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "designation", "created_at")
    search_fields = ("name", "designation")
    list_filter = ("created_at",)
