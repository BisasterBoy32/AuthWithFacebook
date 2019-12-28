from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile 
        fields = ("user","icon","born_date","join_date","active")
        read_only_fields = ["join_date","active","user"]

class RegisterSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ("username","password","email","first_name","profile")
        extra_kwargs = {'password': {'write_only': True}}

    def create(self , validated_data):
        prfile_data = validated_data.pop("profile")
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        
        Profile.objects.create(
            user = user,
            **prfile_data
            )
        
        return user

    def validate(self , data):
        user_email = data["email"]
        users = User.objects.all()
        if users.filter(email = user_email).exists():
            raise serializers.ValidationError("this email already exists")
        return data
    
class LoginSer(serializers.Serializer):
    username_or_email = serializers.CharField()
    password = serializers.CharField()

    def validate(self , data):

        user = authenticate(username=data["username_or_email"],password=data["password"])
        if not user :
            # see if there is a user with this email 
            user = User.objects.get(email=data["username_or_email"])
            if not user.check_password(data["password"]) :
                raise serializers.ValidationError("Wrong Credentials")
        
        return data

class ValidateUsernameEmailSer(serializers.Serializer):
    username = serializers.CharField(required=False ,allow_blank=True)
    email = serializers.CharField(required=False ,allow_blank=True)

    def validate(self , data):
        username = data["username"]
        email = data["email"]

        if username :
            if User.objects.filter(username=username).exists() :
                raise serializers.ValidationError("user with this username already exists")
            return data
        
        else :
            if User.objects.filter(email=email).exists() :
                raise serializers.ValidationError("user with this email already exists")
            return data