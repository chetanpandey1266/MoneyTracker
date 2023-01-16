from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django import core

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email')


class AuthTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.get(email=validated_data['email'])
        return user

    def validate(self, data):
        user_obj = None
        email = data.get('email')
        password = data.get('password')
        if email and password:
            user_obj = User.objects.filter(email=email).first()
            if not user_obj:
                raise serializers.ValidationError("This email is not registered")
            if not user_obj.check_password(password):
                raise serializers.ValidationError("Incorrect credentials")
        return self.create(data)


#Serializer to Register User
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
    )  
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
            'email')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user