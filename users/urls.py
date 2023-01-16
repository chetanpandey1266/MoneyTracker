from django.urls import path
from .views import RegisterUserAPIView, LoginAPI, UserDetailAPI


urlpatterns = [
    path('register/', RegisterUserAPIView.as_view()),
    path('login/', LoginAPI.as_view()),
    path('users/<int:id>', UserDetailAPI.as_view())
]