# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from datetime import datetime, timedelta
from django.contrib.auth.models import User
from django.conf import settings
from django.utils import timezone
from django.utils.text import slugify
from django.core.urlresolvers import reverse
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.utils import formats
from django.template.loader import render_to_string
from django.db.models import F

# Default value for null is False
# Default value for blank is False

class UserProfile(models.Model):
    user = models.OneToOneField(User, unique=True, on_delete=models.CASCADE, related_name="profile")
    rating = models.PositiveIntegerField(default=0, blank=True)

    def update_rating(self, i):
        self.ranking = self.ranking+i
        self.save()

    def __str__(self):
        return str(self.pk)

class Problem(models.Model):
    board = models.CharField(max_length=400, blank=False)
    start_row = models.PositiveSmallIntegerField(blank=True, default=0)
    end_row = models.PositiveSmallIntegerField(blank=False)
    start_col = models.PositiveSmallIntegerField(blank=True, default=0)
    end_col = models.PositiveSmallIntegerField(blank=False)
    rating = models.IntegerField(blank=True, default=0)
    responses = models.CharField(max_length=50000, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    category = models.CharField(max_length=100, blank=False, default='')

    def __str__(self):
        return str(self.pk)

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.CharField(max_length=5000)
    pub_date = models.DateTimeField(auto_now_add=True, blank=True)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, null=True, blank=True)
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, blank=True)
    score = models.IntegerField(blank=True, default=0)

    def __str__(self):
        return str(self.pk)

    class Meta:
        ordering = ['-pub_date']

class Settings(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    display_timer = models.BooleanField(default=False)
    book_mode = models.BooleanField(default=False)

    def __str__(self):
        return str(self.pk)
    

class Vote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    value = models.BooleanField(default=False)
    pub_date = models.DateTimeField(auto_now_add=True, blank=True)

class Attempt(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, null=True)
    successful = models.BooleanField(default=False)
    user_rating = models.IntegerField(blank=True, default=0) # at that time
    problem_rating = models.IntegerField(blank=True, default=0) # at that time
    duration = models.DecimalField(default=0, decimal_places=2, max_digits=6, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
