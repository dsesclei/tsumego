from django.test import TransactionTestCase
from django.contrib.auth.models import AnonymousUser, User
from backend.models import UserProfile, Problem, Comment, Vote, Attempt, Settings
from django.test import Client
from django.db import IntegrityError
from django.utils import timezone


class UserTestCase(TransactionTestCase):
    
    def test_no_dup_users_allowed(self):
	
	user1 = User.objects.create_user(username='Janice', email='jJanice@hotmail.com', password='goJanice')
	user1.save()

	with self.assertRaises(IntegrityError): # checks that a duplicate user cannot be made
		user2 = User.objects.create_user(username='Janice', email='jJanice@hotmail.com', password='goJanice')

	with self.assertRaises(IntegrityError): # checkst that usernames must be UNIQUE
		user4 = User.objects.create_user(username='Janice', email='different@hotmail.com', password='different')
	
	#**NOTE: IntegrityError is not thrown when a new user is made with an email address already in the DB	
	#with self.assertRaises(IntegrityError):
		#user3 = User.objects.create_user(username='janice84746', email='jJanice@hotmail.com', password='guessIt')
	
    def test_user_can_login(self):
	user1 = User.objects.create_user(username='Janice', email='jJanice@hotmail.com', password='goJanice')
	user1.save()
	c = Client()
	logged_in = c.login(username='Janice', password='goJanice')
	self.assertTrue(logged_in)

    def test_user_profile(self):
	testRating = 1; # start the user with this rating
	user1 = User.objects.create_user(username='Janice', email='jJanice@hotmail.com', password='goJanice')
	user1.save()
	profile = UserProfile.objects.create(user=user1, rating=testRating)
	profile.update_rating(1) #should just increment the rating by 1	
	self.assertEqual(profile.rating, testRating + 1) #test rating
	self.assertEqual(profile.__str__(), str(profile.pk)) #test __str__() (to get the primary key of the object)

    def test_problem(self):
	problem1 = Problem.objects.create(board=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,-1,-1], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,-1,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,-1,-1,1], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,-1,-1,0]],
			start_row=0, end_row=18, start_col=0, end_col=18, rating=1.0, responses='hard', 
			timestamp=timezone.now(), category='mid-game')
	
	self.assertEqual(problem1.__str__(), str(problem1.pk))

    def test_comment(self):
	user1 = User.objects.create_user(username='Peter88', email='pdiddy@hotmail.com', password='iLoveGo')
	problem1 = Problem.objects.create(board=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,-1,-1], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,-1,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,-1,-1,1], 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,-1,-1,0]],
			start_row=0, end_row=18, start_col=0, end_col=18, rating=1.0, responses='hard', 
			timestamp=timezone.now(), category='mid-game')

	profile = UserProfile.objects.create(user=user1, rating=4)

	comment1 = Comment.objects.create(user=user1, content = 'AWESOME!', pub_date=timezone.now(), problem=problem1,
			profile=profile, score=5)

	self.assertEqual(comment1.__str__(),str(comment1.pk))

    def test_settings(self):
	
	user1 = User.objects.create_user(username='Peter88', email='pdiddy@hotmail.com', password='iLoveGo')	
	setting = Settings.objects.create(user=user1, display_timer=True, book_mode=True)
	self.assertEqual(setting.__str__(), str(setting.pk))





