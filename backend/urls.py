"""tsumego URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.views.generic import TemplateView
from . import settings
from . import views
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token

admin.autodiscover()

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^sign_out', views.sign_out),
    url(r'^secrect', views.ExampleView.as_view()),
    url(r'^login', obtain_jwt_token),
    url(r'^problems/(?P<pk>[0-9]+)$', views.ProblemDetail.as_view()),
    url(r'^problems/(?P<pk>[0-9]+)/comments$', views.ProblemCommentsList.as_view()),
    url(r'^problems/next$', views.ProblemNext.as_view()),
    url(r'^problems$', views.ProblemList.as_view()),
    url(r'^comments/(?P<pk>[0-9]+)$', views.CommentDetail.as_view()),
    url(r'^comments/(?P<pk>[0-9]+)/vote$', views.VoteView.as_view()),
    url(r'^comments$', views.CommentList.as_view()),
    url(r'^register$', views.CreateUserView.as_view()),
]
