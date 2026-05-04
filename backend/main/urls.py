from django.urls import path

from .views import caffeine_list

urlpatterns = [
    path('caffeine/', caffeine_list, name='caffeine-list'),
]
