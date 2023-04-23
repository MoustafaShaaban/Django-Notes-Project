from django.contrib.auth import get_user_model

import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.forms.mutation import DjangoModelFormMutation

from backend.notes.models import Note
from backend.notes.forms import NoteForm


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        exclude = ('password', 'email', 'last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined')



class NoteNode(DjangoObjectType):

    class Meta:
        model = Note
        filter_fields = {
            "title": ['exact', 'icontains', 'istartswith'],
            "content": ['exact', 'icontains', 'istartswith'],
            "user": ['exact']
        }
        interfaces = (relay.Node, )



class CreateNote(graphene.relay.ClientIDMutation):
    note = graphene.Field(NoteNode)

    class Input:
        title = graphene.String()
        content = graphene.String()

    def mutate_and_get_payload(root, info, **input):
        user = info.context.user

        note = Note(
            title=input.get('title'),
            content=input.get('content'),
            user=user
        )
        note.save()

        return CreateNote(note=note)



class Query(graphene.ObjectType):
    note = relay.Node.Field(NoteNode)
    all_notes = DjangoFilterConnectionField(NoteNode)



class Mutations(graphene.ObjectType):
    create_note = CreateNote.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)