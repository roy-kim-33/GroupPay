from django.db import models, IntegrityError
from django.db.models import Q
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth import get_user_model
# Custom user manager
class UserManager(BaseUserManager):
    def create_user(self, email: str, username: str, password: str):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        
        existing_user = self.model.objects.filter(Q(username__iexact=username))
        if existing_user.exists():
            raise IntegrityError('Username already exists.')
        
        username = username.lower()
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, username: str, password: str):
        user = self.create_user(email=email, username=username, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user
    
# Custom user model
class User(AbstractBaseUser):
    # id = models.UUIDField
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']

    def __str__(self):
        return f"User {self.username}"

# Account model
class Account(models.Model):
    balance = models.FloatField()
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='account') # accounts with user_id=n aree deleted if user with id=n is deleted

    def __str__(self):
        return f"Account {self.id} - Balance {self.balance}"

# PaymentStatus model
class PaymentStatus(models.Model):
    status_code = models.PositiveIntegerField(unique=True, null=True)
    description = models.CharField(max_length=500)

    def __str__(self):
        return f"Status code {self.id} - {self.about}"

# Group model
class Group(models.Model):
    name = models.CharField(max_length=255)
    leader_user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='led_groups')
    created_at = models.DateTimeField(auto_now_add=True)
    payment = models.FloatField()
    status = models.ForeignKey(PaymentStatus, null=True, on_delete=models.SET_NULL)
    about = models.CharField(max_length=500)

    def __str__(self):
        return f"Group {self.name}"

# GroupMember model
class GroupMember(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='user')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='group_members')
    is_leader = models.BooleanField(default=False)
    accepted_payment = models.BooleanField(default=False)
    accepted_payment_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"GroupMember {self.user_id.username} in {self.group_id.name}"




# ''''''
# Here's a brief explanation of the components:

# UserManager: This is a custom manager for the User model that provides helper methods like create_user and create_superuser.

# User: A custom user model that uses email as the USERNAME_FIELD and requires a username as well.

# Account: The Account model has a One-to-One relationship with the User model.

# Group: The Group model has a ForeignKey to User for the leader and a ForeignKey to PaymentStatus for the payment status.

# GroupMember: This model represents the relationship between users and groups, along with additional attributes like is_leader and accepted_payment.

# PaymentStatus: This model is used to store different payment statuses that can be linked to groups.
# '''