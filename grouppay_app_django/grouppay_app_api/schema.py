import graphene
from graphene_django import DjangoObjectType
from django.http import Http404
from django.db import models
from .models import *

def get_model_or_404(model: models.Model, id):
    try:
        return model.objects.get(id=id)
    except model.DoesNotExist:
        raise Http404(f'{model} id={id} not found')

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"

class AccountType(DjangoObjectType):
    class Meta:
        model = Account
        fields = "__all__"

class PaymentStatusType(DjangoObjectType):
    class Meta:
        model = PaymentStatus
        fields = "__all__"
class GroupType(DjangoObjectType):
    class Meta:
        model = Group
        fields = "__all__"

class GroupMemberType(DjangoObjectType):
    class Meta:
        model = GroupMember
        fields = "__all__"




#QUERIES -- GET models
class Query:
    # Define queries
    users_list = graphene.List(UserType)
    accounts_list = graphene.List(AccountType)
    payment_statuses_list = graphene.List(PaymentStatusType)
    groups_list = graphene.List(GroupType)
    group_members_list = graphene.List(GroupMemberType)
    
    # Detail View
    user = graphene.Field(UserType, id=graphene.ID(required=True))
    account = graphene.Field(AccountType, id=graphene.ID(required=True))
    payment_status = graphene.Field(PaymentStatusType, id=graphene.ID(required=True))
    group = graphene.Field(GroupType, id=graphene.ID(required=True))
    group_member = graphene.Field(GroupMemberType, id=graphene.ID(required=True))
    
    # Define query resolvers
    # NOTE TO PEERS: Currently assuming potential need to filter on all fields. This may not be necessary.
        #places to consider removing filter functionality:
            # accounts: balance
            # payment_statuses: description
            # groups: description
    
    def resolve_users_list(self, info, id=None, username=None, email=None, password_hash=None):
        filters = {}
        if id is not None:
            filters['id__exact'] = id
        if username is not None:
            filters['username__icontains'] = username
        if email is not None:
            filters['email__icontains'] = email
        if password_hash is not None:
            filters['password_hash__exact'] = password_hash
        return models.User.objects.all().filter(**filters)    
    
    def resolve_accounts_list(self, info, id=None, balance=None, user_id=None):
        filters = {}
        if id is not None:
            filters['id__exact'] = id
        if balance is not None:
            filters['balance__icontains'] = balance
        if user_id is not None:
            filters['user_id__exact'] = user_id
        return models.Account.objects.all().filter(**filters)  
          
    def resolve_payment_statuses_list(self, info, id=None, description=None):
        filters = {}
        if id is not None:
            filters['id__exact'] = id
        if description is not None:
            filters['description__icontains'] = description
        return models.PaymentStatus.objects.all().filter(**filters)  
    
    def resolve_groups_list(self, info, id=None, name=None, leader_user=None, created_at=None, payment=None, status=None, description=None):
        filters = {}
        if id is not None:
            filters['id__exact'] = id
        if name is not None:
            filters['name__icontains'] = name
        if leader_user is not None:
            filters['leader_user__exact'] = leader_user
        if created_at is not None:
            filters['created_at__icontains'] = created_at
        if payment is not None:
            filters['payment__exact'] = payment
        if status is not None:
            filters['status__icontains'] = status
        if description is not None:
            filters['description__icontains'] = description
        return models.Group.objects.all().filter(**filters)
      
    def resolve_group_members_list(self, info, id=None, user=None, group=None, is_leader=None, accepted_payment=None, accepted_payment_at=None):
        filters = {}
        if id is not None:
            filters['id__exact'] = id
        if user is not None:
            filters['user__exact'] = user
        if group is not None:
            filters['group__exact'] = group
        if is_leader is not None:
            filters['is_leader__icontains'] = is_leader
        if accepted_payment is not None:
            filters['accepted_payment__icontains'] = accepted_payment
        if accepted_payment_at is not None:
            filters['accepted_payment_at__icontains'] = accepted_payment_at
        return models.GroupMember.objects.all().filter(**filters)      


# '''should be include Serializer
schema = graphene.Schema(query=Query)
