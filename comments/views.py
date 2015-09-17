from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.conf import settings
import os
import json
#from rest_framework import generics
#from serializers import UrlSerializer

from .models import Url
import random
import string

# Create your views here.
def index(request):
   return render(request, 'lilurl/index.html')

def comment(request):
    filename = settings.MEDIA_ROOT + '/comments.json'
    with open(filename, 'r') as file:
        comments = json.loads(file.read())
        if request.method == 'POST':
            y = request.POST
            print 'POSTED!'
            print dict(y)
            print request.POST.get('author')
            print request.POST.get('text')
            comments.append(dict(y))
            with open(filename, 'w') as file:
                file.write(json.dumps(comments, indent=4, separators=(',', ': ')))
        return HttpResponse(json.dumps(comments), content_type='application/json')
