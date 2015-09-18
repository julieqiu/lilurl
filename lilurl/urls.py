from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^postdetails/', views.postdetails, name='postdetails'),
    url(r'^linkdata/', views.linkdata, name='linkdata'),
    #url(r'^base/', views.base, name='base'),
    url(r'^(?P<shortener_code>\w+)/$', views.redir, 
        name='redir'),
    #url(r'^$', TemplateView.as_view(template_name='index.html'
    #url(r'^api/(?P<shortener_code>\w+)$', views.url_detail),
]
