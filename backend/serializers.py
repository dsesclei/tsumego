# http://www.django-rest-framework.org/tutorial/1-serialization/#setting-up-a-new-environment

from rest_framework import serializers
from . import models, settings
from django.contrib.auth.models import User
import jwt
from rest_framework_jwt.utils import jwt_payload_handler

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
        board = serializers.JSONField()
        fields = ('board', 'start_row', 'end_row', 'start_col', 'end_col', 'rating', 'responses', 'timestamp', 'category')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Problem
        fields = ('ranking')

class UserInfoSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)

class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'token')
        write_only_fields = ('password',)
        read_only_fields = ('id', 'token')

    def get_token(self, user):
        payload = jwt_payload_handler(user)
        token = jwt.encode(payload, settings.SECRET_KEY)
        return token.decode('unicode_escape')

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            #first_name=validated_data['first_name'],
            #last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
