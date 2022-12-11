# Generated by Django 3.2.13 on 2022-12-10 17:23

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dogwalking', '0005_alter_dogwalking_walking_member'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dogwalking',
            name='walking_member',
            field=models.IntegerField(help_text='0~9사이 값으로 입력하세요', validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(9)]),
        ),
    ]