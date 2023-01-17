from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from friend.models import FriendList
from django.contrib.auth.models import User
from .models import IndividualExpenseModel
from .serializers import IndividualExpenseSerializer

class Expense(APIView):
    def get(self, request, token):
        user = Token.objects.get(key=token).user
        owes_from = IndividualExpenseModel.objects.filter(borrower=user)
        owes_to = IndividualExpenseModel.objects.filter(receiver=user)
        serializer_owes_from = IndividualExpenseSerializer(owes_from, many=True)
        serializer_owes_to = IndividualExpenseSerializer(owes_to, many=True)
        owes_from = []
        owes_to = []
        for data in serializer_owes_from.data:
            data['receiver_email'] = User.objects.get(id=data['receiver']).email
            data['borrower_email'] = User.objects.get(id=data['borrower']).email
            owes_from.append(data)
        for data in serializer_owes_to.data:
            data['receiver_email'] = User.objects.get(id=data['receiver']).email
            data['borrower_email'] = User.objects.get(id=data['borrower']).email
            owes_to.append(data)
        return Response({
            'owes_from':owes_from, 
            'owes_to':owes_to
        })

    def post(self, request):
        data = request.data
        borrower = Token.objects.get(key=data.get('token')).user
        receiver = User.objects.get(email=data.get('email'))
        
        try:
            expense = IndividualExpenseModel.objects.get(borrower=borrower, receiver=receiver)
            expense.pay(int(data.get('amount')))
        except IndividualExpenseModel.DoesNotExist:
            expense = IndividualExpenseModel.objects.create(
                borrower= borrower,
                receiver= receiver,
                borrowed= data.get('amount')
            )
            expense.save()
        return Response({"message":"successful"})

    def delete(self, request, id):
        data = request.data
        borrower = Token.objects.get(key=data.get('token')).user
        receiver = User.objects.get(id=id)
        try:
            expense = IndividualExpenseModel.objects.get(borrower=borrower, receiver=receiver)
            expense.delete()
            return Response({"message":"deleted successfully"})
        except IndividualExpenseModel.DoesNotExist:
            return Response(status=404)
