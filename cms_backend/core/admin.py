from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    CommentUser, Blog, Comment, GalleryImage,
    Event, Testimonial, Notice
)

@admin.register(CommentUser)
class CommentUserAdmin(UserAdmin):
    model = CommentUser
    list_display = ('email', 'full_name', 'is_staff')
    ordering = ('email',)
    search_fields = ('email', 'full_name')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('full_name',)}),
        ('Permissions', {'fields': ('is_staff','is_superuser','groups','user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = ((None, {
        'classes': ('wide',),
        'fields': ('email','full_name','password1','password2','is_staff','is_superuser')
    }),)

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'is_published', 'created_at')
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ('title', 'content')
    list_filter = ('is_published',)

admin.site.register(Comment)
admin.site.register(GalleryImage)
admin.site.register(Event)
admin.site.register(Testimonial)
admin.site.register(Notice)
