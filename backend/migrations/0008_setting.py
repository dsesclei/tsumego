# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-16 21:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_auto_20161116_1846'),
    ]

    operations = [
        migrations.CreateModel(
            name='Setting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display_timer', models.BooleanField(default=False)),
                ('book_mode', models.BooleanField(default=False)),
            ],
        ),
    ]
