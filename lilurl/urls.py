from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^postdetails/', views.postdetails, name='postdetails'),
    url(r'^(?P<shortener_code>\w+)/$', views.redir, 
        name='redir'),
]
