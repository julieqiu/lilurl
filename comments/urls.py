from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^comments.json', views.comment, name='comment'),
    #url(r'^base/', views.base, name='base'),
    #url(r'^(?P<shortener_code>\w+)$', views.redirect, 
    #    name='redirect'),
    #url(r'^$', TemplateView.as_view(template_name='index.html'
    #url(r'^api/(?P<shortener_code>\w+)$', views.url_detail),
]
