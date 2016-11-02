from __future__ import unicode_literals
from django.contrib import admin
from .models import *

admin.site.register(UserProfile)
admin.site.register(Problem)
admin.site.register(Comment)
admin.site.register(Vote)
admin.site.register(Attempt)
