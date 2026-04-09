from django.core.management.base import BaseCommand
from pathlib import Path
import json
from adoptions.models import Cat, Center


BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent

class Command(BaseCommand):
    help = "Import dummy centers and cats data"

    def handle(self, *args, **options):
        with open(BASE_DIR / 'data/centers.json', 'r') as centers_file:
            centers = json.load(centers_file)

        for center_json in centers:
            Center.objects.update_or_create(
                slug=center_json["slug"],
                defaults=center_json,
            )

        with open(BASE_DIR / 'data/cats.json', 'r') as cats_file:
            cats = json.load(cats_file)

        for cat_json in cats:
            Cat.objects.update_or_create(
                slug=cat_json["slug"],
                defaults=cat_json,
            )

        self.stdout.write(f"Imported {Center.objects.count()} centers")
        self.stdout.write(f"Imported {Cat.objects.count()} cats")