from django.http import Http404
from django.db.models import Model
from django.contrib.auth import get_user_model
from grouppay_app_api.models import (
    # User,
    Account,
    PaymentStatus,
    Group,
    GroupMember
)
# def get_model_or_404(model: Model, id: str):
#     try:
#         return model.objects.get(id=id)
#     except model.DoesNotExist:
#         raise Http404(f'{model} id={id} not found')

def get_user_or_404(id: str):
    User = get_user_model()
    try:
        return User.objects.get(id=id)
    except User.DoesNotExist:
        raise Http404(f'User id={id} not found')

def get_account_or_404(id: str):
    try:
        return Account.objects.get(id=id)
    except Account.DoesNotExist:
        raise Http404(f'Account id={id} not found')

def get_payment_status_or_404(status_code: int):
    try:
        return PaymentStatus.objects.get(status_code=status_code)
    except PaymentStatus.DoesNotExist:
        raise Http404(f'PaymentStatus status_code={status_code} not found')

def get_group_or_404(id: str):
    try:
        return Group.objects.get(id=id)
    except Group.DoesNotExist:
        raise Http404(f'Group id={id} not found')

def get_group_member_or_404(id: str):
    try:
        return GroupMember.objects.get(id=id)
    except GroupMember.DoesNotExist:
        raise Http404(f'GroupMember id={id} not found')