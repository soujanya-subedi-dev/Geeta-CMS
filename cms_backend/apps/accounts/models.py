from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name="profile", on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Profile for {self.user.username}"

    @property
    def is_admin(self):
        user_model = get_user_model()
        if isinstance(self.user, user_model):
            return self.user.is_staff or self.user.is_superuser
        return False


class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser.
    You can safely add extra fields later (e.g., role, phone, etc.).
    """

    # Example field (optional – keep or remove as you like)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.username