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

# Default value for null is False
# Default value for blank is False

class UserProfile(models.Model):
    user = models.OneToOneField(User, unique=True, on_delete=models.CASCADE, related_name="profile")
    ranking = models.PositiveIntegerField(default=0, blank=True)
    # completedGame

class Game(models.Model):
    problem = models.CharField(max_length=400, blank=False)
    start_row = models.PositiveSmallIntegerField(blank=True, default=0)
    end_row = models.PositiveSmallIntegerField(blank=False)
    start_col = models.PositiveSmallIntegerField(blank=True, default=0)
    end_col = models.PositiveSmallIntegerField(blank=False)
    rating = models.DecimalField(max_digits=12, decimal_places=4, blank=True, default=0)
    solution = models.CharField(max_length=50000, blank=False)
    pub_date = models.DateTimeField(auto_now_add=True, blank=True)

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.CharField(max_length=5000)
    pub_date = models.DateTimeField(auto_now_add=True, blank=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=True)
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True)
    
class Vote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    VOTE_VALUE_CHOICE = (
        ('0', 'Up Vote'),
        ('1', 'Down Vote'),
    )
    value = models.CharField(max_length=1, choices=VOTE_VALUE_CHOICE, default='0')
    pub_date = models.DateTimeField(auto_now_add=True, blank=True)

class GameHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=True)
    GAME_RESULT_CHOICE = (
        ('0', 'Loss'),
        ('1', 'Win'),
    )
    result = models.CharField(max_length=1, choices=GAME_RESULT_CHOICE, default='0')
    user_rating = models.DecimalField(max_digits=12, decimal_places=4, blank=True, default=0) # at that time
    problem_rating = models.DecimalField(max_digits=12, decimal_places=4, blank=True, default=0) # at that time
    duration = models.DurationField(default=0)
    pub_date = models.DateTimeField(auto_now_add=True, blank=True)

