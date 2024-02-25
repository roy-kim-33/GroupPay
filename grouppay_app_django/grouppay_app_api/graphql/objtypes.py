'''
types of DjangoObjectType classes for GraphQL
'''
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from grouppay_app_api.models import Account, PaymentStatus, Group, GroupMember

class UserType(DjangoObjectType):
    class Meta:
        # model = User
        # fields = "__all__"
        model = get_user_model()

class AccountType(DjangoObjectType):
    class Meta:
        model = Account
        fields = "__all__"

class PaymentStatusType(DjangoObjectType):
    class Meta:
        model = PaymentStatus
        fields = "__all__"
    # description = graphene.String()

class GroupType(DjangoObjectType):
    class Meta:
        model = Group
        fields = "__all__"

class GroupMemberType(DjangoObjectType):
    class Meta:
        model = GroupMember
        fields = "__all__"
