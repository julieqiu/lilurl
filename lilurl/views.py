from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.core import serializers
from .models import Url
from create_lilurl import create_lilurl
import random, string, json

@ensure_csrf_cookie
def index(request):
    return render(request, 'lilurl/index.html')

def postdetails(request):
    if request.method == 'POST':
        url = request.POST.get('link')
        if (url is not None) and (url!=""):
            key = create_lilurl(url)
            data = json.dumps([{'link':url, 'code': key}])
            return HttpResponse(data)
    return HttpResponse('post details get')

def redir(request, shortener_code):
    url = get_object_or_404(Url, shortener_code=shortener_code)
    link = url.redirect_url
    if 'https://' not in link and 'http://' not in link: 
        link = 'https://' + link
    return redirect(link)
