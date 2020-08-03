from rest_framework import serializers
from .models import Workers,Kiln

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token



class WorkersListSerializer(serializers.ModelSerializer):
    # kiln = serializers.SerializerMethodField()
    class Meta:
        model = Workers
        fields = '__all__'

    # def get_kiln(self, obj):
    #     return obj.get_kiln_display()


class KilnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kiln
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','email','password']
        extra_kwargs = {'password':{'write_only':True,'required':True}}


    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user = user)
        return user
