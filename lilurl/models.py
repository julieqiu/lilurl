from django.db import models

# Create your models here.
class Url(models.Model):
    shortener_code = models.CharField(max_length=6, null=False, unique=True)
    redirect_url = models.CharField(max_length=200)
    



