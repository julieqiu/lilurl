# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lilurl', '0002_url_num_clicks'),
    ]

    operations = [
        migrations.AlterField(
            model_name='url',
            name='shortener_code',
            field=models.CharField(unique=True, max_length=8),
        ),
    ]
