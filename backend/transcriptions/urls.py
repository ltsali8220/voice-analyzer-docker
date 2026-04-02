from django.urls import path
from .views import store_text, delete_text, tts

urlpatterns = [
    path('store-text', store_text),
    path('store-text/<int:pk>', delete_text),
    path('tts', tts),
]
