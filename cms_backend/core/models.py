from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# -------- User for comments --------
class CommentUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CommentUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CommentUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

# -------- Blog Models --------
def upload_to(instance, filename):
    return f'{instance.__class__.__name__.lower()}/{filename}'

class Blog(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    author = models.ForeignKey(CommentUser, on_delete=models.SET_NULL, null=True, related_name='blogs')
    content = models.TextField()
    excerpt = models.CharField(max_length=500, blank=True)
    featured_image = models.ImageField(upload_to=upload_to, null=True, blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)[:200]
            slug = base
            counter = 1
            while Blog.objects.filter(slug=slug).exists():
                slug = f'{base}-{counter}'
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(CommentUser, on_delete=models.SET_NULL, null=True)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=True)

    def __str__(self):
        return f"Comment by {self.user.email} on {self.blog.title}"

class GalleryImage(models.Model):
    title = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to=upload_to)
    caption = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or f'Image {self.id}'

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to=upload_to, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    message = models.TextField()
    photo = models.ImageField(upload_to=upload_to, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Notice(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to=upload_to)
    published_date = models.DateField()
    expires_at = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title
