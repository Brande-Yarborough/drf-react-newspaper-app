from django.conf import settings
from django.db import models

# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=255)

    class Meta:
        # changes model name to plural so it is spelled correctly in admin
        verbose_name_plural = "categories"

    def __str__(self):
        return self.title


class Article(models.Model):
    image = models.ImageField(upload_to="articles/", null=True)
    title = models.CharField(max_length=255)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    body = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    # time stamp with moment of creation
    created_at = models.DateTimeField(auto_now_add=True)
    # automatically updates with any changes made to post
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    DRAFT = 'DFT'
    SUBMITTED = 'SBM'
    PUBLISHED = 'PUB'
    REJECTED = 'REJ'
    ARCHIVED = 'ARC'

    ARTICLE_PHASE = [
        (DRAFT, 'Draft'),
        (SUBMITTED, 'Submitted'),
        (PUBLISHED, 'Published'),
        (REJECTED, 'Rejected'),
        (ARCHIVED, 'Archived'),
    ]

    phase = models.CharField(
        max_length=20, choices=ARTICLE_PHASE, blank=True, default=DRAFT,)

    def __str__(self):
        return self.title
