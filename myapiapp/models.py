from django.db import models
from django.contrib.auth.models import User

# Create your models here.
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
    address = models.CharField(max_length=100 ,default="ram")
    naikename = models.CharField(max_length=100,default="ram")
    naikelastname = models.CharField(max_length=100,default="ram")
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True)
    age = models.IntegerField(null=True)
  
    district = models.CharField(max_length=100 ,null=True)
    municipality = models.CharField(max_length=100 ,null=True)
    ward = models.CharField(max_length=100 ,null=True)
    phone = models.IntegerField(default=9999999999)
    workercategory = models.CharField(max_length=100 ,null=True)
    kiln = models.ForeignKey(Kiln,on_delete = models.CASCADE,blank=True,null=True)

    @property
    def name(self):
      return 11



    








	







