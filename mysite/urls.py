from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('lilurl.urls', namespace="lilurl")),
    url(r'^favicon\.ico$', RedirectView.as_view(url=staticfiles_storage.url('img/favicon.ico'), permanent=False), name="favicon")
]
