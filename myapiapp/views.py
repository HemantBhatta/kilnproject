from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Workers,Kiln,ngos
from .serializers import WorkersListSerializer,KilnSerializer,NgosSerializer
from django.forms.models import model_to_dict
import rest_framework.permissions as isAuthenticated
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets
from .models import ExtendedUser
from rest_framework.permissions import IsAuthenticated  ,AllowAny
from .serializers import UserSerializer
from rest_framework.exceptions import PermissionDenied
import json
from django.db import connection


import random




# Create your views here.


class UserViewSet(viewsets.ModelViewSet):   
    queryset = ExtendedUser.objects.all()
    serializer_class = UserSerializer

    def create(self,request):
        ngo = ngos.objects.get(uuid=request.data['ngo'])
        if ngo:
            request.data['ngo'] = ngo.id
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return super(UserViewSet, self).create(request)
    
    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (AllowAny,)

        return super(UserViewSet, self).get_permissions()
        # return Response('ok')

def permDenied():
    return Response({'error': 'Permission denie'}, status=403)

@api_view(['GET'])
def user(request):
    user = model_to_dict(request.user)
    if user['ngo']:

        ngo = model_to_dict(ngos.objects.get(id=user['ngo']))
        user['ngo'] = ngo
    return Response(user)

@api_view(['GET', 'POST'])
def workers_list(request):
    if request.method == 'GET':
        #return Response(model_to_dict(request.user))
        users =  Workers.objects.values()[2100:2500]
       
        
        kilns = Kiln.objects
        #return Response(users)
        for u in users:
            u['children'] = json.loads(u['children']) if type(u['children']) is str else u['children']
            u['extra'] = json.loads(u['extra']) if type(u['extra']) is str else u['extra']
            if 'kiln_id' in u:
                u['kiln'] = model_to_dict(kilns.get(id=u['kiln_id']))
        return Response(users)
        
    elif request.method == 'POST':
        if not request.user.is_superuser: return permDenied()
        request.data['kiln'] = request.data['kiln_id']
        request.data['children'] = json.dumps(request.data['children'])
        request.data['extra'] = json.dumps(request.data['extra'])
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
        if not request.user.is_superuser: return permDenied()
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
        data = model_to_dict(worker)
        data['kiln_id'] =  data['kiln']
        del data['kiln']
        data['children'] = json.loads(data['children']) if type(data['children']) is str else data['children']
        data['extra'] = json.loads(data['extra']) if type(data['extra']) is str else data['extra']
        return Response(data)


    elif request.method == 'PUT':
        
        request.data['kiln'] = request.data['kiln_id']
        request.data['children'] = json.dumps(request.data['children'])
        request.data['extra'] = json.dumps(request.data['extra'])
        del request.data['kiln_id']
       
        serializer = WorkersListSerializer(worker,data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = dict(serializer.data)
            data['kiln_id'] =  data['kiln']
            data['children'] = json.loads(data['children']) if type(data['children']) is str else data['children']
            data['extra'] = json.loads(data['extra']) if type(data['extra']) is str else data['extra']
            del data['kiln']
            return Response(data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        if not request.user.is_superuser: return permDenied()
        worker.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def kiln_detail(request,pk):

    try:
        kiln = Kiln.objects.get(pk=pk)
    except Kiln.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)


    if request.method == 'GET':
        user = request.user
        
        serializer = KilnSerializer(kiln)
        return Response(serializer.data)


    


    elif request.method == 'PUT':
        if not request.user.is_superuser: return permDenied()
        request.data['kiln'] = request.data['kiln_id']
        del request.data['kiln_id']
        serializer = KilnSerializer(kiln,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        if not request.user.is_superuser: return permDenied()
        kiln.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



  
@api_view(['GET'])
def ngos_list(request):
    if request.method == 'GET':
        ngoss = ngos.objects.all()
        serializer = NgosSerializer(ngoss,many=True)
        return Response(serializer.data)

def cc(data):
    data['kiln'] = data['kiln_id']
    data['children'] = json.dumps(data['children'])
    data['extra'] = json.dumps(data['extra'])
    del data['kiln_id']
    return data

@api_view(['POST'])
def sync_payments(request):
    data = [cc(d) for d in request.data]
    #return Response( Workers.objects.model._meta.db_table )
    
    with connection.cursor() as cursor:
        for d in data:
            cursor.execute("UPDATE myapiapp_workers SET extra = %s WHERE id = %s", [d['extra'], d['id']])
    
    return Response(True)

# 








