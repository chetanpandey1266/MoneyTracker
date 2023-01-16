from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import FriendList
from .serializers import FriendListSerializer
from rest_framework.authtoken.models import Token

class UserFriends(APIView):
    # to get friends of a particular user
    def get(self, request, token):
        user = Token.objects.get(key=token).user
        friends = FriendList.objects.get(user=user)
        serializer = FriendListSerializer(friends)
        friends = serializer.data['friends']
        friends_email = []
        for id in friends:
            friends_email.append(User.objects.get(id=id).email)
        print(friends_email, user.email)
        return Response({
            "user": user.email,
            "friends_email": friends_email,
            "friends_id": friends 
        })

    # to add new friends
    def post(self, request, token):
        user = Token.objects.get(key=token).user
        friends = FriendList.objects.get(user=user)
        new_friend = User.objects.get(id=request.data.get('id'))
        friends.add_friend(new_friend)
        return Response(status=200)



