from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer, AuthTokenSerializer, UserDetailSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from friend.models import FriendList
from django.contrib.auth.models import User

class UserDetailAPI(APIView):
    def get(self, request):
        all_users = User.objects.all()
        serializer = UserDetailSerializer(all_users, many=True)
        return Response(serializer.data)
    
    # def get(self, request, id):
    #     user = User.objects.get(id=id)
    #     serializer = UserDetailSerializer(user)
    #     return Response(serializer.data)

class LoginAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = AuthTokenSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            try:
                friend_list = FriendList.objects.get(user=user)
            except FriendList.DoesNotExist:
                friend_list = FriendList(user=user)
                friend_list.save()
            Token.objects.filter(user=user).delete()
            token = Token.objects.create(user=user)
            return Response({
                "id": user.id,
                "username": user.username,
                "email" : user.email,
                "token": token.key,
            })
        return Response(serializer.errors, status=404)

# Class based view to register user 
class RegisterUserAPIView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

