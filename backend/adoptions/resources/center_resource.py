from django.http import JsonResponse
from django.views.decorators.http import require_GET

from adoptions.models import Center


@require_GET
def centers(request):
    centers = Center.objects.prefetch_related('cats')
    result = []

    for center in centers:
        result.append(
            {
                "id": center.id,
                "website_url": center.website_url,
                "slug": center.slug,
                "name": center.name,
                "county": center.county,
                "address": center.address,
                "logo_url": center.logo_url,
                "cats": list(center.cats.values()),
            }
        )

    return JsonResponse(
        {
            "centers": result,
        }
    )
