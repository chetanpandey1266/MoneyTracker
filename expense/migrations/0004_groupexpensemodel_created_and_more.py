# Generated by Django 4.1.4 on 2023-01-16 14:37

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('expense', '0003_rename_individualexpense_individualexpensemodel_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupexpensemodel',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='individualexpensemodel',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
