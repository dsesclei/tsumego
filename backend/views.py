import random
import json
from django.db.models import F
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from django.contrib.auth.models import User
from . import serializers
from . import models


class ExampleView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return JsonResponse(content)

    def post(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return JsonResponse(content)

class VoteView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, pk, format=None):
        response = {
            'status': 'fail',
        }
        # try if comment exist
        try:
            comment = models.Comment.objects.get(pk=pk)
        except models.Comment.DoesNotExist:
            # May cause error
            response['message'] = 'Comment Does Not Exist'
            return JsonResponse(response)
        # validate vote value
        value = request.data['value']
        if not value or value not in ['1','-1']:
            response['message'] = 'Comment Vote Does Not Exist'
            return JsonResponse(response)
        value = True if value == '1' else False 
        # get previous vote by this user on this comment
        vote, created = models.Vote.objects.get_or_create(user=request.user,comment=comment, defaults={'value': value})
        response['value'] = value
        response['commentId'] = pk
        if created:
            response['status'] = 'success'
            if value:
                comment.score = F('score') + 1
            else:
                comment.score = F('score') - 1
            comment.save()
        else:
            if vote.value == value:
                response['message'] = 'Same Vote Existed'
            else:
                response['status'] = 'success'
                if vote.value:
                    comment.score = F('score') - 2
                else:
                    comment.score = F('score') + 2
                vote.value = value
                vote.save()
                comment.save()
        response['score'] = models.Comment.objects.get(pk=pk).score
        return JsonResponse(response)

class ProblemDetail(generics.RetrieveAPIView):
    queryset = models.Problem.objects.all()
    serializer_class = serializers.ProblemSerializer

class ProblemNext(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.ProblemSerializer
    queryset = models.Problem.objects.all()

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = serializers.ProblemSerializer(queryset, many=False)
        return Response(serializer.data)

    # logic for picking next problem
    def get_queryset(self):
        problems = models.Problem.objects.all()
        return problems[random.randrange(0,len(problems))]

class ProblemList(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = models.Problem.objects.all()
    serializer_class = serializers.ProblemSerializer

class ProblemCommentsList(generics.ListCreateAPIView):
    serializer_class = serializers.CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    def perform_create(self, serializer):
        try:
            problem = models.Problem.objects.get(pk=self.kwargs['pk'])
        except models.Problem.DoesNotExist:
            raise ValidationError('Problem Does Not Exist')
        # queryset = models.Problem.objects.filter(pk=self.kwargs['pk'])
        # if queryset.exists():
        #     raise ValidationError('You have already signed up')
        serializer.save(problem=problem)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_queryset(self):
        pk = self.kwargs['pk']
        return models.Comment.objects.filter(problem=pk)

class CommentDetail(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer

class CommentList(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer


# def random_color(request):
#     colors = ['blue', 'red', 'green', 'orange', 'gray', 'purple']
#     color = random.choice(colors)
#     return JsonResponse({ 'color': color })

# def sign_in(request):
#     data = json.loads(request.body)
#     return JsonResponse({ 'success': True, 'id': 130, 'username': data['username'] })

def sign_out(request):
    return JsonResponse({})

def secrect(request):
    if request.user.is_authenticated():
        return JsonResponse({ 'authenticated': 'yes' })
    return JsonResponse({ 'authenticated': 'no' })

class CreateUserView(generics.CreateAPIView):
    model = User
    permission_classes = [
        AllowAny # Or anon users can't register
    ]
    serializer_class = serializers.UserSerializer

class CreateAttemptView(generics.CreateAPIView):
    model = models.Attempt
    permission_classes = [
        IsAuthenticated # Not set to current user only yet. 
    ]
    serializer_class = serializers.AttemptSerializer

    def perform_create(self, serializer):
        try:
            problem = models.Problem.objects.get(pk=self.kwargs['pk'])
        except models.Problem.DoesNotExist:
            raise ValidationError('Problem Does Not Exist')
        queryset = models.Attempt.objects.filter(user=self.request.user, problem=problem)
        if queryset.exists():
            raise ValidationError('You have already tried before')
        serializer.save(user=self.request.user, problem=problem, problem_rating=problem.rating, user_rating=self.request.user.profile.ranking)