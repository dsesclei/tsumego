import os
import sys

proj_path = os.path.join(os.getcwd(), '..')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
sys.path.append(proj_path)
os.chdir(proj_path)
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

from backend.models import UserProfile, Problem

for p in UserProfile.objects.all():
    p.rating = 500
    p.save()

for p in Problem.objects.all():
    p.rating = 500
    p.save()
