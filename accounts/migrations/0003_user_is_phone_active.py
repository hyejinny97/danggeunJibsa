# Generated by Django 3.2.13 on 2022-12-05 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20221205_1549'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_phone_active',
            field=models.BooleanField(default=False),
        ),
    ]