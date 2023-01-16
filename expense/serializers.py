from rest_framework import serializers
from django.contrib.auth.models import User
from .models import IndividualExpenseModel

class IndividualExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = IndividualExpenseModel
        fields = ['receiver', 'borrower', 'borrowed', 'created']