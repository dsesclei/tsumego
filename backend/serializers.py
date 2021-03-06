# http://www.django-rest-framework.org/tutorial/1-serialization/#setting-up-a-new-environment

from rest_framework import serializers
from . import models, settings
from django.contrib.auth.models import User
import jwt
from rest_framework_jwt.utils import jwt_payload_handler
from rest_framework.fields import CurrentUserDefault

class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Settings
        fields = ('display_timer', 'book_mode')

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    username = serializers.SerializerMethodField()

    class Meta:
        model = models.Comment
        fields = ('content', 'pub_date', 'score', 'username', 'user', 'pk') 
        read_only_fields = ('user', 'username', 'score', 'pub_date', 'pk')

    def get_username(self, comment):
        return comment.user.username

    # def create(self, validated_data):
    #     user = None
    #     request = self.context.get("request")
    #     if request and hasattr(request, "user"):
    #         user = request.user
    #         comment = models.Comment.create(user=self.request.user, content=self.validated_data['content'])
    #         return comment
    #     return None    

class AttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Attempt
        fields = ('successful', 'duration', 'timestamp')

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Problem
        board = serializers.JSONField()
        fields = ('pk', 'board', 'start_row', 'end_row', 'start_col', 'end_col', 'rating', 'responses', 'timestamp', 'category')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ('user', 'rating')

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
        profile = models.UserProfile(user=user)
        profile.save()
        user.profile = profile
        user.save()
        return user
