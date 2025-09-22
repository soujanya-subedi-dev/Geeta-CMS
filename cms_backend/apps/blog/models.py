from django.conf import settings
from django.db import models
from django.utils.text import slugify


def upload_to(instance: models.Model, filename: str) -> str:
    return f"{instance.__class__.__name__.lower()}/{filename}"


class Blog(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    author = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)[:240] or "blog"
            slug = base_slug
            counter = 1
            while Blog.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class Comment(models.Model):
    blog = models.ForeignKey(Blog, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="blog_comments",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    name = models.CharField(max_length=120, blank=True)
    email = models.EmailField(blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"Comment on {self.blog.title}"

    @property
    def display_name(self) -> str:
        if self.user and self.user.get_full_name():
            return self.user.get_full_name()
        if self.user:
            return self.user.get_username()
        return self.name or "Guest"
