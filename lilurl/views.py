from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
#from rest_framework import generics
#from serializers import UrlSerializer
from django.core import serializers
from .models import Url
import random
import string
import json

@ensure_csrf_cookie
def index(request):
    return render(request, 'lilurl/index.html')

def postdetails(request):
    if request.method == 'GET':
        return HttpResponse('post details get')
    if request.method == 'POST':
        host = request.get_host()
        host = 'http://'+host+'/'
        url = request.POST.get('link')
        if (url is not None) and (url!=""):
            key = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8))
            q = Url(shortener_code=key, redirect_url=url)
            q.save()
            data = json.dumps([{'link':url, 'code': host+key}])
            print data
            return HttpResponse(data)

def redir(request, shortener_code):
    url = get_object_or_404(Url, shortener_code=shortener_code)
    link = url.redirect_url
    if 'https://' not in link and 'http://' not in link: 
        link = 'https://' + link
    return redirect(link)
