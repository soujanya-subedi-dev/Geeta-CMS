from django.db import models


def notice_attachment_path(instance, filename):
    return f"notices/{filename}"


class Notice(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    published_date = models.DateField()
    attachment = models.FileField(upload_to=notice_attachment_path, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_date", "title"]

    def __str__(self):
        return self.title
