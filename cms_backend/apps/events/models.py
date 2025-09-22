from django.db import models


def upload_to(instance: models.Model, filename: str) -> str:
    return f"event/{filename}"


class Event(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    location = models.CharField(max_length=255)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    description = models.TextField()
    registration_link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date", "title"]

    def __str__(self) -> str:
        return self.title
