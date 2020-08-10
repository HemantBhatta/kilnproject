from rest_framework import serializers
from .models import Workers,Kiln,ExtendedUser,ngos

# from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ExtendedUser
        fields = ['id','username','first_name','last_name','email','password','ngo']
        extra_kwargs = {'password':{'write_only':True,'required':True}}


    def create(self,validated_data):
        user = ExtendedUser.objects.create_user(**validated_data)
        Token.objects.create(user = user)
        return user


class WorkersListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workers
        fields = '__all__'



class KilnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kiln
        fields = '__all__'

class NgosSerializer(serializers.ModelSerializer):
    class Meta:
        model = ngos
        fields = '__all__'



