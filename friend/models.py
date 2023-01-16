from django.db import models
from django.contrib.auth.models import User

class FriendList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user")
    friends = models.ManyToManyField(User, blank=True, related_name="friends")

    def __str__(self):
        return self.user.username
    
    def add_friend(self, account):
        if not account in self.friends.all():
            self.friends.add(account)

    def remove_friend(self, account):
        if account in self.friends.all():
            self.friends.remove(account)

    def unfriend(self, removee):
        remover_friend_list = self
        remover_friend_list.remove_friend(removee)
        friends_list = FriendList.objects.get(user=removee)
        friends_list.remove_friend(self.user)

    def is_mutual_friend(self, friend):
        if friend in self.friends.all():
            return True
        return False


# class FriendRequest(models.Model):
#     sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
#     receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver')
#     is_active = models.BooleanField(blank=True, null=False, default=True)
#     created = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.sender.username

#     def accept(self):
#         receiver_friend_list = FriendList.objects.get(user=self.receiver)
#         if receiver_friend_list:
#             receiver_friend_list.add_friend(self.sender)
#             sender_friend_list = FriendList.objects.get(user=self.sender)
#             if sender_friend_list:
#                 sender_friend_list.add_friend(self.receiver)
#                 self.is_active=False
#                 self.save()
            
#     def declineorcancel(self):
#         self.is_active = False
