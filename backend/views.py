import random
import json
from django.http import JsonResponse

def random_color(request):
    colors = ['blue', 'red', 'green', 'orange', 'gray', 'purple']
    color = random.choice(colors)
    return JsonResponse({ 'color': color })

def sign_in(request):
    data = json.loads(request.body)
    return JsonResponse({ 'success': True, 'id': 130, 'username': data['username'] })

def sign_out(request):
    return JsonResponse({})
