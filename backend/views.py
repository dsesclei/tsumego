import random
from django.http import JsonResponse


def random_color(request):
    colors = ['blue', 'red', 'green', 'orange', 'gray', 'purple']
    color = random.choice(colors)
    return JsonResponse({ 'color': color })
