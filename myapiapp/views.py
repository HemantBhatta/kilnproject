from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Workers,Kiln
from .serializers import WorkersListSerializer,KilnSerializer
from django.forms.models import model_to_dict
#import django.contrib.auth.decorators as all
import rest_framework.permissions as isAuthenticated
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated  
from .serializers import UserSerializer

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)     
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def workers_list(request):
    if request.method == 'GET':
        users = Workers.objects.values()
        kilns = Kiln.objects
        #return Response(users)
        for u in users:
            if 'kiln_id' in u:
                u['kiln'] = model_to_dict(kilns.get(id=u['kiln_id']))
        return Response(users)

    elif request.method == 'POST':
        request.data['kiln'] = request.data['kiln_id']
        del request.data['kiln_id']
        serializer = WorkersListSerializer(data=request.data)
        #serializer.data.kiln = serializer.data.kiln_id
        #delattr(serializer.data, 'kiln_id')
        #return Response(serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def kiln_list(request):
    if request.method == 'GET':
        kiln = Kiln.objects.all()
        
        serializer = KilnSerializer(kiln,many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        #return Response(request.data)
        serializer = KilnSerializer(data=request.data)
        if serializer.is_valid():
           # return Response(serializer.data)
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def workers_detail(request,pk):

    try:
        worker = Workers.objects.get(pk=pk)
    except Workers.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)


    if request.method == 'GET':
        serializer = WorkersListSerializer(worker)
        return Response(serializer.data)


    elif request.method == 'PUT':
        serializer = WorkersListSerializer(worker,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        worker.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def kiln_detail(request,pk):

    try:
        kiln = Kiln.objects.get(pk=pk)
    except Kiln.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)


    if request.method == 'GET':
        serializer = KilnSerializer(kiln)
        return Response(serializer.data)


    elif request.method == 'PUT':
        request.data['kiln'] = request.data['kiln_id']
        del request.data['kiln_id']
        serializer = KilnSerializer(kiln,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        kiln.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    