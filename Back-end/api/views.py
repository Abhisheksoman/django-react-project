from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets,permissions
from .models import *
from .serializers import *
from rest_framework.response import Response
def home(request):
    return HttpResponse("this is a home page")


class ProjectManagerViewSets(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = ProjectManager.objects.all()
    serializer = ProjectManagerSerializer

    def list(self ,request):
        queryset = self.queryset
        serializer = self.serializer(queryset ,many=True)
        return Response(serializer.data)

class ProjectViewSets(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer = ProjectSerializer

    def list(self ,request):
        queryset = self.queryset
        serializer = self.serializer(queryset ,many=True)
        return Response(serializer.data)

    def create(self ,request):
        serializer = self.serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)

    def retrieve(self ,request,pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer(queryset, many=False)
        return Response(serializer.data)

    def update(self ,request,pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer(data=request.data,instance=queryset)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self ,request,pk=None):
        queryset = self.queryset.get(pk=pk)
        queryset.delete()
        return Response(status=200)