from django.contrib import admin
from .models import IndividualExpenseModel, GroupExpenseModel

admin.site.register(IndividualExpenseModel)
admin.site.register(GroupExpenseModel)