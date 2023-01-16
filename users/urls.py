from django.urls import path
from .views import RegisterUserAPIView, LoginAPI, UserDetailAPI


urlpatterns = [
    path('register/', RegisterUserAPIView.as_view()),
    path('login/', LoginAPI.as_view()),
    path('users/', UserDetailAPI.as_view())
]