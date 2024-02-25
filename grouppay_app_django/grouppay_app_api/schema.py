import graphene
from graphene_django import DjangoObjectType
from django.http import Http404
from django.db.models import Model, Q
from django.contrib.auth import get_user_model
from .models import *

def get_model_or_404(model: Model, id):
    try:
        return model.objects.get(id=id)
    except model.DoesNotExist:
        raise Http404(f'{model} id={id} not found')

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



# QUERIES -- GET models
class Query(graphene.ObjectType):
    
    # Define queries
    users_list = graphene.List(of_type=UserType, id=graphene.ID(), username=graphene.String(), email=graphene.String())
    accounts_list = graphene.List(of_type=AccountType, id=graphene.ID(), user_id=graphene.ID())
    payment_statuses_list = graphene.List(of_type=PaymentStatusType, id=graphene.ID(), about=graphene.String())
    groups_list = graphene.List(of_type=GroupType, id=graphene.ID(), name=graphene.String(), leader_user_id=graphene.ID(), created_at=graphene.DateTime(), payment=graphene.Float(), status_id=graphene.ID(), about=graphene.String())
    group_members_list = graphene.List(of_type=GroupMemberType, id=graphene.ID(), user_id=graphene.ID(), group_id=graphene.ID(), is_leader=graphene.Boolean(), accepted_payment=graphene.Boolean(), accepted_payment_at=graphene.DateTime())
    
    # Detail View
    user = graphene.Field(UserType, id=graphene.ID(required=True))
    account = graphene.Field(AccountType, id=graphene.ID(required=True))
    payment_status = graphene.Field(PaymentStatusType, id=graphene.ID(required=True))
    group = graphene.Field(GroupType, id=graphene.ID(required=True))
    group_member = graphene.Field(GroupMemberType, id=graphene.ID(required=True))
    
    # Define query resolvers
    # NOTE TO PEERS: Currently assuming potential need to filter on all fields. This may not be necessary.
        # places to consider removing filter functionality:
    # users: password - removed
    # accounts: balance - removed
    # payment_statuses: description - kept for debugging
    # groups: description - removed

    def resolve_users_list(self, info, id=None, username=None, email=None):
        filters = Q()
        if id is not None:
            filters &= Q(id=id)
        if username is not None:
            filters &= Q(username__icontains=username)
        if email is not None:
            filters &= Q(email__icontains=email)
        return get_user_model().objects.filter(filters)

    
    def resolve_accounts_list(self, info, id=None, user_id=None):
        filters = Q()
        if id is not None:
            filters &= Q(id=id)
        if user_id is not None:
            filters &= Q(user_id=user_id)
        return Account.objects.filter(filters)
          
    def resolve_payment_statuses_list(self, info, id=None, about=None):
        filters = Q()
        if id is not None:
            filters &= Q(id=id)
        if about is not None:
            filters &= Q(about__icontains=about)
        return PaymentStatus.objects.filter(filters)  
    
    def resolve_groups_list(self, info, id=None, name=None, leader_user_id=None, created_at=None, payment=None, status_id=None, about=None):
        filters = Q()
        if id is not None:
            filters &= Q(id=id)
        if name is not None:
            filters &= Q(name__icontains=name)
        if leader_user_id is not None:
            filters &= Q(leader_user_id=leader_user_id)
        if created_at is not None:
            filters &= Q(created_at__gte=created_at)
        if payment is not None:
            filters &= Q(payment__exact=payment)
        if status_id is not None:
            filters &= Q(status_id__icontains=status_id)
        if about is not None:
            filters &= Q(about__icontains=about)  
        return Group.objects.filter(filters)
      
    def resolve_group_members_list(self, info, id=None, user_id=None, group_id=None, is_leader=None, accepted_payment=None, accepted_payment_at=None):
        filters = Q()
        if id is not None:
            filters &= Q(id=id)
        if user_id is not None:
            filters &= Q(user_id=user_id)
        if group_id is not None:
            filters &= Q(group_id=group_id)
        if is_leader is not None:
            filters &= Q(is_leader=is_leader)
        if accepted_payment is not None:
            filters &= Q(accepted_payment=accepted_payment)
        if accepted_payment_at is not None:
            filters &= Q(accepted_payment_at__gte=accepted_payment_at)
        return GroupMember.objects.filter(filters)      


# MUTATIONS -- POST, PATCH, DELETE models
class PostUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True) # consider using hash function here

    user = graphene.Field(type_=UserType)
    def mutate(self, info, username, email, password):
        user = get_user_model().objects.create_user(
            username=username,
            email=email,
            password=password
        )
        return PostUser(user=user)

class Mutation(graphene.ObjectType):
    post_user = PostUser.Field()


# '''should be include Serializer
schema = graphene.Schema(query=Query, mutation=Mutation)
