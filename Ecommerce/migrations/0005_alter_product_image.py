# Generated by Django 3.2 on 2021-07-01 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Ecommerce', '0004_auto_20210503_1133'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/temp.jpg', null=True, upload_to=''),
        ),
    ]
