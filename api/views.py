from django.http import request
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TodoSerializer
from .models import Todo
from django.http import JsonResponse

@api_view(['GET'])
def all(request):
    todo = Todo.objects.all()
    serializer = TodoSerializer(todo, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def create(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response("Created successfully.")

@api_view(['DELETE'])
def delete(request):
    text = request.data["text"]
    todo = Todo.objects.get(text=text)
    todo.delete()
    return Response("Deleted successfully.")

@api_view(['PUT'])
def status(request):
    text = request.data["text"]
    todo = Todo.objects.get(text=text)
    serializer = TodoSerializer(instance = todo,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
