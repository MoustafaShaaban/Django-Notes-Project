# Generated by Django 4.1.8 on 2023-04-23 19:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("notes", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="note",
            name="updated_on",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
