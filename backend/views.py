import random
import json
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from django.contrib.auth.models import User
from . import serializers
from . import models


class ExampleView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return JsonResponse(content)

    def post(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return JsonResponse(content)

class ProblemDetail(generics.RetrieveAPIView):
    queryset = models.Problem.objects.all()
    serializer_class = serializers.ProblemSerializer

class ProblemList(generics.ListAPIView):
    queryset = models.Problem.objects.all()
    serializer_class = serializers.ProblemSerializer

# def random_color(request):
#     colors = ['blue', 'red', 'green', 'orange', 'gray', 'purple']
#     color = random.choice(colors)
#     return JsonResponse({ 'color': color })

# def sign_in(request):
#     data = json.loads(request.body)
#     return JsonResponse({ 'success': True, 'id': 130, 'username': data['username'] })

def sign_out(request):
    return JsonResponse({})

def secrect(request):
    if request.user.is_authenticated():
        return JsonResponse({ 'authenticated': 'yes' })
    return JsonResponse({ 'authenticated': 'no' })

class CreateUserView(generics.CreateAPIView):
    model = User
    permission_classes = [
        AllowAny # Or anon users can't register
    ]
    serializer_class = serializers.UserSerializer
