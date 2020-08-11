from django.db import models
# from django.contrib.auth.models import User

# Create your models here.
from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser, BaseUserManager

class User_manager(BaseUserManager):
    def create_user(self, username,email,first_name,last_name,  password,ngo):
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name,ngo=ngo)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, username,email, first_name, last_name, password,ngo):
        user = self.create_user(username=username, email=email, first_name=first_name, last_name=last_name, password=password,ngo=ngo)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user



class ExtendedUser(PermissionsMixin, AbstractBaseUser):
    username = models.CharField(max_length=32, unique=True,)
    email = models.EmailField(max_length=32)
    first_name = models.CharField(max_length=32 , blank=True, null=True)
    last_name = models.CharField(max_length=32 , blank=True, null=True)
    ngo = models.CharField(max_length=32, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    REQUIRED_FIELDS = ["email","first_name","last_name","ngo"]
    USERNAME_FIELD = "username"
    objects = User_manager()










class Kiln(models.Model):
    name = models.CharField(max_length=100 ,default="ram")
    address = models.CharField(max_length=100 ,default="ram")
    

    def __str__(self):
        return self.name

    

class Workers(models.Model):
    GENDER_CHOICES = (
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
        ('OTHERS', 'Others'),
    )
    f_name = models.CharField(max_length=100 ,default="ram")
    l_name = models.CharField(max_length=100 ,default="ram")
    address = models.CharField(max_length=100 ,blank=True,null=True)
    naike_f_name = models.CharField(max_length=100,blank=True,null=True)
    naike_l_name = models.CharField(max_length=100,blank=True,null=True)
    naike_phone = models.CharField(max_length=100,blank=True,null=True)
    
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True,null=True)
    age = models.CharField(max_length=100,blank=True,null=True)

    country = models.CharField(max_length=100 ,blank=True,null=True)
    district = models.CharField(max_length=100 ,blank=True,null=True)
    municipality = models.CharField(max_length=100 ,blank=True,null=True)
    village = models.CharField(max_length=100 ,blank=True,null=True)
    ward = models.CharField(max_length=100 ,blank=True,null=True)
    phone = models.CharField(max_length=100,blank=True,null=True)
    category = models.CharField(max_length=100 ,blank=True,null=True)
    kiln = models.ForeignKey(Kiln,on_delete = models.CASCADE,blank=True,null=True)
    children = models.CharField(max_length=2000, blank=True,null=True)
    extra = models.CharField(max_length=2000, blank=True,null=True)


class ngos(models.Model):
    name = models.CharField(max_length=100 ,blank=True,null=True)


    








	







