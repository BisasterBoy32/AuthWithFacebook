# Generated by Django 3.0.1 on 2019-12-27 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20191222_2012'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='icon',
            field=models.CharField(max_length=256),
        ),
    ]
