# Generated by Django 3.0.7 on 2020-07-28 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapiapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workers',
            name='gender',
            field=models.CharField(choices=[('MALE', 'MALE'), ('FEMALE', 'FEMALE'), ('OTHERS', 'OTHERS')], max_length=10, null=True),
        ),
    ]