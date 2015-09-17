from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
#from rest_framework import generics
#from serializers import UrlSerializer

from .models import Url
import random
import string

def index(request):
   return render(request, 'lilurl/index.html')

def redirect(request, shortener_code):
    url = get_object_or_404(Url, shortener_code=shortener_code)
    return redirect(url)

def base(request):
    return render(request, 'lilurl/base.html')
