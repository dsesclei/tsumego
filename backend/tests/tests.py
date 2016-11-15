from django.test import TestCase
from django.contrib.auth.models import AnonymousUser, User
from backend.models import UserProfile, Problem, Comment, Vote, Attempt

class CommentTestCase(TestCase):
    def setUp(self):
        Comment.objects.create(name="lion", sound="roar")
        Comment.objects.create(name="cat", sound="meow")

    def test_problem_can_speak(self):
        lion = Animal.objects.get(name="lion")
        cat = Animal.objects.get(name="cat")
        self.assertEqual(lion.speak(), 'The lion says "roar"')
        self.assertEqual(cat.speak(), 'The cat says "meow"')