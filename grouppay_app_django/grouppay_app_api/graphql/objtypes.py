'''
types of DjangoObjectType classes for GraphQL
'''
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from grouppay_app_api.models import (
    User,
    Account,
    PaymentStatus,
    Group,
    GroupMember
)
import graphene
from graphql import GraphQLError

class UserType(DjangoObjectType):
    class Meta:
        # model = User
        # fields = "__all__"
        model = get_user_model()
        fields = "__all__"

    id = graphene.ID()

class AccountType(DjangoObjectType):
    class Meta:
        model = Account
        fields = "__all__"

    id = graphene.ID()
    # user_id = graphene.ID()
    # def resolve_user_id(self, info):
    #     if not self.user:
    #         raise GraphQLError(f"User is not linked to account {self.id}")
    #     return self.user.id

class PaymentStatusType(DjangoObjectType):
    class Meta:
        model = PaymentStatus
        fields = "__all__"

    id = graphene.ID()

class GroupType(DjangoObjectType):
    class Meta:
        model = Group
        fields = "__all__"

    id = graphene.ID()

class GroupMemberType(DjangoObjectType):
    class Meta:
        model = GroupMember
        fields = "__all__"

    id = graphene.ID()
