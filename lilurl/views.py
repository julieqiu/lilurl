from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
#from rest_framework import generics
#from serializers import UrlSerializer

from .models import Url
import random
import string

@ensure_csrf_cookie
def index(request):
    return render(request, 'lilurl/index.html')

def postdetails(request):
    if request.method == 'POST':
        url = request.POST.get('link')
        if (url is not None) and (url!=""):
            print url
            key = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8))
            q = Url(shortener_code=key, redirect_url=url)
            print key
            print q
            q.save()
    return HttpResponse('Hello')

def redir(request, shortener_code):
    print shortener_code
    url = get_object_or_404(Url, shortener_code=shortener_code)
    print url.shortener_code
    link = url.redirect_url
    if 'https://' not in link and 'http://' not in link: 
        link = 'https://' + link
    return redirect(link)
