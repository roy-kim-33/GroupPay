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
        fields = '__all__'

class AccountType(DjangoObjectType):
    class Meta:
        model = Account
        fields = '__all__'

class PaymentStatusType(DjangoObjectType):
    class Meta:
        model = PaymentStatus
        fields = '__all___'
class GroupType(DjangoObjectType):
    class Meta:
        model = Group
        fields = '__all__'

class GroupMemberType(DjangoObjectType):
    class Meta:
        model = GroupMember
        fields = '__all__'




#QUERIES -- GET models
class Query:
    # Define queries
    # List View
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
    
    # Filtered View
    # filtered_recipe_steps = graphene.List(of_type=RecipeStepType, completed=graphene.Boolean())
    # def resolve_filtered_recipe_steps(self, info, completed=None):
    #     if completed is None:
    #         return RecipeStep.objects.all()
    #     return RecipeStep.objects.filter(completed=completed)
    # Define query resolvers
    def resolve_users_list(self, info, username=None, email=None, password_hash=None):
        return modUser.objects.all()    def resolve_accounts_list(self, info):
        return models.Account.objects.all()        def resolve_payment_statuses_list(self, info):
        return models.PaymentStatus.objects.all()  
    def resolve_groups_list(self, info):
        return models.Group.objects.all()  
    def resolve_group_members_list(self, info):
        return models.GroupMember.objects.all()      


# '''should be include Serializer

