from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FriendList

class FriendListSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendList
        fields = '__all__'