"""userapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

from rest_framework.authtoken.views import obtain_auth_token
from django.shortcuts import render
from rest_framework.response import Response
from django.forms.models import model_to_dict

def index(request):
    # return Response('asdasd')
    return render(request,'index.html')

# def indexo(r):
#     return 'L'
#     return Response(['Hello'])


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/', include('myapiapp.urls')),
   
    path('auth/',obtain_auth_token),
    path('', index)
]
