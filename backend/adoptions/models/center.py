from django.db import models


class Center(models.Model):
    website_url = models.URLField(unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    county = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    logo_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name