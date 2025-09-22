from django.db import models


def upload_to(instance: models.Model, filename: str) -> str:
    return f"notice/{filename}"


class Notice(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    published_date = models.DateField()
    attachment = models.FileField(upload_to=upload_to, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_date", "title"]

    def __str__(self) -> str:
        return self.title
