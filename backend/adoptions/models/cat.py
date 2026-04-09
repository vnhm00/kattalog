from django.db import models

from .center import Center


class Cat(models.Model):
    class Sex(models.TextChoices):
        MALE = "male", "Male"
        FEMALE = "female", "Female"

    class AdoptionStatus(models.TextChoices):
        AVAILABLE = "available", "Available"
        RESERVED = "reserved", "Reserved"
        ADOPTED = "adopted", "Adopted"

    center = models.ForeignKey(Center, on_delete=models.CASCADE, related_name="cats")
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=100, unique=True)
    source_url = models.URLField()
    estimated_birth_date = models.DateField(blank=True, null=True)
    sex = models.CharField(max_length=10, choices=Sex.choices)
    trait = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image_urls = models.JSONField(default=list, blank=True)
    adoption_status = models.CharField(max_length=15, choices=AdoptionStatus.choices)
    inserted_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
