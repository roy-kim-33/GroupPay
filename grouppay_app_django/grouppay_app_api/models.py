from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Custom user manager
class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user

# Custom user model
class User(AbstractBaseUser):
    # id = models.UUIDField
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    password_hash = models.CharField(max_length=255)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

# Account model
class Account(models.Model):
    balance = models.FloatField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user') # accounts with user_id=n aree deleeted if user with id=n is deleted

    def __str__(self):
        return f"Account {self.id} - Balance {self.balance}"

# PaymentStatus model
class PaymentStatus(models.Model):
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.description

# Group model
class Group(models.Model):
    name = models.CharField(max_length=255)
    leader_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='led_groups')
    created_at = models.DateTimeField(auto_now_add=True)
    payment = models.FloatField()
    status = models.ForeignKey(PaymentStatus, null=True, on_delete=models.SET_NULL)
    description = models.TextField()

    def __str__(self):
        return self.name

# GroupMember model
class GroupMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='group_memberships')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='members')
    is_leader = models.BooleanField(default=False)
    accepted_payment = models.BooleanField(default=False)
    accepted_payment_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.group.name}"




# ''''''
# Here's a brief explanation of the components:

# UserManager: This is a custom manager for the User model that provides helper methods like create_user and create_superuser.

# User: A custom user model that uses email as the USERNAME_FIELD and requires a username as well.

# Account: The Account model has a One-to-One relationship with the User model.

# Group: The Group model has a ForeignKey to User for the leader and a ForeignKey to PaymentStatus for the payment status.

# GroupMember: This model represents the relationship between users and groups, along with additional attributes like is_leader and accepted_payment.

# PaymentStatus: This model is used to store different payment statuses that can be linked to groups.
# '''