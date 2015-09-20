from django.db import models

# Create your models here.
class Url(models.Model):
    shortener_code = models.CharField(max_length=8, null=False, unique=True)
    redirect_url = models.CharField(max_length=200)
    num_clicks = models.IntegerField(default=0)
    



