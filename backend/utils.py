from django.db import models
from . import serializers

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': serializers.UserInfoSerializer(user, context={'request': request}).data
    }
