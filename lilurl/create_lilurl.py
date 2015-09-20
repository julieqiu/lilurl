import random, string
from django.db import IntegrityError
from .models import Url

def create_lilurl(redirect_url):
    size = 6
    chars = string.ascii_letters + string.digits
    while True:
        shortener_code = ''.join(random.choice(chars) for _ in range(size))
        try: 
            lilurl = Url(shortener_code=shortener_code, redirect_url=redirect_url) 
            lilurl.save()
            break
        except IntegrityError:
            print 'shortener_code collision on %s' %shortener_code
            continue
    return shortener_code

