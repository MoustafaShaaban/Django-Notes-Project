from django.contrib.auth import get_user_model
import graphene
from graphene import relay
from graphene_django import DjangoObjectType

from .models import Note

class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        exclude = ('password', 'email', 'last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined')



class NoteType(DjangoObjectType):
    class Meta:
        model = Note
        fields = ("id", "title", "content", "user", "created_on")


class NoteNode(DjangoObjectType):
    class Meta:
        model = Note
        fields = ("id", "title", "content")

        filter_fields = {
            'id': ['exact'],
            'title': ['exact', 'icontains', 'istartswith'],
            'content': ['exact', 'icontains', 'istartswith']
        }
        interfaces = (relay.Node,)
