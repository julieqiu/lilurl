from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = patterns('',
    url(r'^$', include('lilurl.urls', namespace="lilurl")),
    url(r'^admin/', include(admin.site.urls)),
)

