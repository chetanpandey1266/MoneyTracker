from django.urls import path
from .views import UserFriends
urlpatterns = [
    path('friends/<str:token>', UserFriends.as_view(), name='friends'),
]