from django.urls import path
from . import views

urlpatterns = [
    path("all/", views.all, name="all"),
    path("create/", views.create, name="create"),
    path("delete/", views.delete, name="delete"),
    path("status/", views.status, name="status"),
]
