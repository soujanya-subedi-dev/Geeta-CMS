from datetime import timedelta

from django.contrib.auth import get_user_model
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from apps.blog.models import Blog, Comment
from apps.events.models import Event, EventRegistration

User = get_user_model()


class CMSApiTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user("admin", password="pass123", is_staff=True)
        self.user = User.objects.create_user("user", password="pass123")

    def authenticate(self, user):
        self.client.force_authenticate(user=user)

    def test_signup_returns_tokens(self):
        url = reverse("auth-signup")
        payload = {
            "username": "newuser",
            "email": "new@example.com",
            "password": "ComplexPass!23",
            "first_name": "New",
            "last_name": "User",
        }
        response = self.client.post(url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertIn("user", response.data)
        self.assertTrue(User.objects.filter(username="newuser").exists())

    def test_admin_can_create_blog(self):
        self.authenticate(self.admin)
        url = reverse("blogs-list")
        payload = {"title": "New Blog", "content": "Content"}
        response = self.client.post(url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Blog.objects.filter(title="New Blog").exists())

    def test_user_comment_requires_moderation(self):
        blog = Blog.objects.create(title="Post", content="Body", author=self.admin)
        self.authenticate(self.user)
        url = reverse("blogs-create-comment", kwargs={"slug": blog.slug})
        response = self.client.post(url, {"content": "Great read!"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        comment = Comment.objects.get(blog=blog)
        self.assertFalse(comment.approved)
        self.assertFalse(comment.rejected)
        self.assertEqual(comment.user, self.user)

    def test_admin_can_approve_comment(self):
        blog = Blog.objects.create(title="Post", content="Body", author=self.admin)
        comment = Comment.objects.create(blog=blog, user=self.user, content="Pending")
        self.authenticate(self.admin)
        url = reverse("comments-approve", kwargs={"pk": comment.pk})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        comment.refresh_from_db()
        self.assertTrue(comment.approved)
        self.assertFalse(comment.rejected)

    def test_event_registration_flow(self):
        event = Event.objects.create(
            title="Orientation",
            description="Welcome",
            start=timezone.now(),
            end=timezone.now() + timedelta(hours=2),
            location="Campus",
        )
        self.authenticate(self.user)
        url = reverse("events-register", kwargs={"pk": event.pk})
        payload = {"name": "Student", "contact": "123456", "age": 20, "interested": True}
        response = self.client.post(url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(EventRegistration.objects.filter(event=event, name="Student").exists())
