from django.db import models
from django.contrib.auth.models import User
import time

class IndividualExpenseModel(models.Model):
    borrower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='borrower')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver')
    borrowed = models.DecimalField(max_digits=7, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.borrower.username} - {self.receiver.username}'

    def pay(self, amount):
        if self.borrowed > amount:
            self.borrowed -= amount
            self.save()
        elif self.borrowed == amount:
            self.settleup(self.borrower, self.receiver)
        elif self.borrowed < amount:
            amount -= self.borrowed
            new_record = IndividualExpenseModel.objects.create(
                borrower= self.receiver,
                receiver= self.borrower,
                borrowed= amount
            )
            new_record.save()
            self.delete()
            

class GroupExpenseModel(models.Model):
    group_name = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_by')
    group_members = models.ManyToManyField(User, blank=True, related_name='group_members')
    group_expense = models.DecimalField(max_digits=7, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.group_name

    def add_member(self, account):
        if account not in self.group_members.all():
            self.group_members.add(account)

    def remove_member(self, account):
        if account in self.group_members.all():
            self.group_members.remove(account)

    def divide_equally(self):
        individual_expense = self.group_expense/len(self.group_members+1)
        for user in self.group_members:
            try:
                expense = IndividualExpenseModel.objects.get(borrower=self.created_by, receiver=user)
                expense.borrowed += individual_expense
            except IndividualExpenseModel.DoesNotExist:
                IndividualExpenseModel.objects.create(
                    borrower = self.created_by,
                    receiver = user,
                    borrowed = individual_expense
                )
         