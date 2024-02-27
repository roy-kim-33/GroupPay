'''
mutations
'''
from datetime import datetime
import graphene
from django.contrib.auth import get_user_model
from grouppay_app_api.models import (
    # User,
    Account,
    PaymentStatus,
    Group,
    GroupMember
)
from .objtypes import (
    UserType,
    AccountType,
    PaymentStatusType,
    GroupType,
    GroupMemberType
)
from .utils import (
    get_user_or_404,
    get_account_or_404,
    get_payment_status_or_404,
    get_group_or_404,
    get_group_member_or_404
)

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

class PatchUser(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()

    user = graphene.Field(type_=UserType)
    def mutate(self, info, id, username=None, email=None, password=None):
        user = get_user_or_404(id=id) # fix this to use get_user_model
        if username is not None:
            user.username = username
        if email is not None:
            user.email = email
        if password is not None:
            user.password = password
        user.save()
        return PatchUser(user=user)

class DeleteUser(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    user = graphene.Field(type_=UserType)
    def mutate(self, info, id):
        user = get_user_or_404(id=id)
        user.delete()
        return DeleteUser(user=user)

class PostAccount(graphene.Mutation):
    class Arguments:
        balance = graphene.Float()
        user_id = graphene.ID(required=True)

    account = graphene.Field(type_=AccountType)
    def mutate(self, info, balance, user_id):
        if balance is None:
            balance = 100
        user = get_user_or_404(id=user_id)
        account = Account(balance=balance, user=user)
        account.save()
        return PostAccount(account=account)

class PatchAccount(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        balance = graphene.Float()
        user_id = graphene.ID()

    account = graphene.Field(type_=AccountType)
    def mutate(self, info, id, balance=None, user_id=None):
        account = get_account_or_404(id=id)
        if balance is not None:
            account.balance = balance
        if user_id is not None:
            user = get_user_or_404(id=user_id)
            account.user = user
        account.save()
        return PatchAccount(account=account)

class DeleteAccount(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    account = graphene.Field(type_=AccountType)
    def mutate(self, info, id):
        account = get_account_or_404(id=id)
        account.delete()
        return DeleteAccount(account=account)

class PostPaymentStatus(graphene.Mutation):
    class Arguments:
        status_code = graphene.Int(required=True)
        description = graphene.String(required=True)

    payment_status = graphene.Field(type_=PaymentStatusType)
    def mutate(self, info, status_code, description=None):
        payment_status = PaymentStatus(status_code=status_code, description=description)
        payment_status.save()
        return PostPaymentStatus(payment_status=payment_status)

class PatchPaymentStatus(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        status_code = graphene.Int()
        description = graphene.String()

    payment_status = graphene.Field(type_=PaymentStatusType)
    def mutate(self, info, id, description=None):
        payment_status = get_payment_status_or_404(status_code=id)
        if description is not None:
            payment_status.description = description
        payment_status.save()
        return PatchPaymentStatus(payment_status=payment_status)

class DeletePaymentStatus(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    payment_status = graphene.Field(type_=PaymentStatusType)
    def mutate(self, info, id):
        payment_status = get_payment_status_or_404(status_code=id)
        payment_status.delete()
        return DeletePaymentStatus(payment_status=payment_status)

class PostGroup(graphene.Mutation):
    class Arguments:
        leader_user_id = graphene.ID(required=True)
        payment = graphene.Float(required=True)
        status_code = graphene.Int(required=True)
        name = graphene.String()
        about = graphene.String()

    group = graphene.Field(type_=GroupType)
    def mutate(self, info, leader_user_id, payment, status_code, name=None, about=None):
        if name is None:
            name = ''
        if about is None:
            about = ''
        group = Group(
            name=name,
            leader_user=get_user_or_404(id=leader_user_id),
            created_at=datetime.now(),
            payment=payment,
            status=get_payment_status_or_404(status_code=status_code),
            about=about)
        group.save()
        return PostGroup(group=group)

class PatchGroup(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        leader_user_id = graphene.ID()
        payment = graphene.Float()
        status_code = graphene.Int()
        about = graphene.String()

    group = graphene.Field(type_=GroupType)
    def mutate(self, info, id, name=None, leader_user_id=None, payment=None, status_code=None, about=None):
        group = get_group_or_404(id)
        if name is not None:
            group.name = name
        if leader_user_id is not None:
            group.leader_user = get_user_or_404(id=leader_user_id)
        if payment is not None:
            group.payment = payment
        if status_code is not None:
            group.status = get_payment_status_or_404(status_code=status_code)
        if about is not None:
            group.about = about
        group.save()
        return PatchGroup(group=group)

class DeleteGroup(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    group = graphene.Field(type_=GroupType)
    def mutate(self, info, id):
        group = get_group_or_404(id)
        group.delete()
        return DeleteGroup(group=group)

class PostGroupMember(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        group_id = graphene.ID(required=True)
        is_leader = graphene.Boolean()
        accepted_payment = graphene.Boolean()

    group_member = graphene.Field(type_=GroupMemberType)
    def mutate(self, info, user_id, group_id, is_leader=None, accepted_payment=None):
        if is_leader is None:
            is_leader = False
        if accepted_payment is None:
            accepted_payment = False
        group_member = GroupMember(
            user=get_user_or_404(id=user_id),
            group=get_group_or_404(id=group_id),
            is_leader=is_leader,
            accepted_payment=accepted_payment,
            accepted_payment_at=datetime.now())
        group_member.save()
        return PostGroupMember(group_member=group_member)

class PatchGroupMember(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        user_id = graphene.ID()
        group_id = graphene.ID()
        is_leader = graphene.Boolean()
        accepted_payment = graphene.Boolean()

    group_member = graphene.Field(type_=GroupMemberType)
    def mutate(self, info, id, user_id=None, group_id=None, is_leader=None, accepted_payment=None):
        group_member = get_group_member_or_404(id)
        if user_id is not None:
            group_member.user = get_user_or_404(id=user_id)
        if group_id is not None:
            group_member.group = get_group_or_404(id=group_id)
        if is_leader is not None:
            group_member.is_leader = is_leader
        if accepted_payment is not None:
            group_member.accepted_payment = accepted_payment
        group_member.save()
        return PatchGroupMember(group_member=group_member)

class DeleteGroupMember(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    group_member = graphene.Field(type_=GroupMemberType)
    def mutate(self, info, id):
        group_member = get_group_member_or_404(id)
        group_member.delete()
        return DeleteGroupMember(group_member=group_member)


class Mutation(graphene.ObjectType):
    post_user = PostUser.Field()
    patch_user = PatchUser.Field()
    delete_user = DeleteUser.Field()

    post_account = PostAccount.Field()
    patch_account = PatchAccount.Field()
    delete_account = DeleteAccount.Field()

    post_payment_status = PostPaymentStatus.Field()
    patch_payment_status = PatchPaymentStatus.Field()
    delete_payment_status = DeletePaymentStatus.Field()

    post_group = PostGroup.Field()
    patch_group = PatchGroup.Field()
    delete_group = DeleteGroup.Field()

    post_group_member = PostGroupMember.Field()
    patch_group_member = PatchGroupMember.Field()
    delete_group_member = DeleteGroupMember.Field()
