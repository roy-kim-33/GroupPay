# Generated by Django 5.0.1 on 2024-02-26 08:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('grouppay_app_api', '0010_rename_payment_status_group_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupmember',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_members', to='grouppay_app_api.group'),
        ),
    ]
