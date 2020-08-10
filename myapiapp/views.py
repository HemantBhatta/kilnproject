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

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):   
    queryset = ExtendedUser.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (AllowAny,)

        return super(UserViewSet, self).get_permissions()

def permDenied():
    return Response({'error': 'Permission denied'}, status=403)

@api_view(['GET'])
def user(request):
    return Response(model_to_dict(request.user))

@api_view(['GET', 'POST'])
def workers_list(request):
    if request.method == 'GET':
        #return Response(model_to_dict(request.user))
        users = Workers.objects.values()
        kilns = Kiln.objects
        #return Response(users)
        for u in users:
            if 'kiln_id' in u:
                u['kiln'] = model_to_dict(kilns.get(id=u['kiln_id']))
        return Response(users)
        
    elif request.method == 'POST':
        if not request.user.is_superuser: return permDenied()
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
        return Response(data)


    elif request.method == 'PUT':
        if not request.user.is_superuser: return permDenied()
        request.data['kiln'] = request.data['kiln_id']
        del request.data['kiln_id']
        serializer = WorkersListSerializer(worker,data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = dict(serializer.data)
            data['kiln_id'] =  data['kiln']
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


