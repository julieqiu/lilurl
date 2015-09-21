import random, string
from django.db import IntegrityError
from .models import Url

def create_lilurl(redirect_url):
    size = 6
    chars = string.ascii_letters + string.digits
    count = 0
    while True:
        shortener_code = ''.join(random.choice(chars) for _ in range(size))
        try:
            print shortener_code
            lilurl = Url(shortener_code=shortener_code, redirect_url=redirect_url) 
            lilurl.save()
            return shortener_code
        except IntegrityError as e:
            print e 
            if count > 6:
                raise Exception('More Than 6 Collisons')
            continue

