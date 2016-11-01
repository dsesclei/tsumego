# http://www.django-rest-framework.org/tutorial/1-serialization/#setting-up-a-new-environment

from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ('content', 'pub_date', 'score')

class AttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Attempt
        fields = ('successful', 'duration', 'timestamp')

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Problem
        fields = ('board', 'start_row', 'end_row', 'start_col', 'end_col', 'rating', 'responses', 'timestamp', 'category')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Problem
        fields = ('ranking')

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)
        