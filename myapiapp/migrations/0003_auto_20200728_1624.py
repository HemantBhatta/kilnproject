# Generated by Django 3.0.7 on 2020-07-28 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapiapp', '0002_auto_20200728_1458'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workers',
            name='gender',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Others', 'Others')], max_length=10, null=True),
        ),
    ]