from django.urls import path
from .views import Expense

urlpatterns = [
    path('expense/<str:token>', Expense.as_view()),
    path('addexpense/', Expense.as_view(), {"action":"POST"}),
    path('removeexpense/<int:id>', Expense.as_view(), {"action":"DELETE"})
]