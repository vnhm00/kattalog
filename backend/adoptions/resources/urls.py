from django.urls import path

from adoptions.resources import center_resource

urlpatterns = [
    path('api/centers/', center_resource.centers, name='centers'),
]
