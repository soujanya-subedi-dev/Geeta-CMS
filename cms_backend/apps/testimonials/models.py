from django.db import models


def upload_to(instance: models.Model, filename: str) -> str:
    return f"testimonial/{filename}"


class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    video_link = models.URLField(blank=True)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.name
