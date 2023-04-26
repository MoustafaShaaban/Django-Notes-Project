from django.contrib.auth import get_user_model

import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql import GraphQLError

from backend.notes.models import Note


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
        interfaces = (graphene.relay.Node, )



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



class UpdateNoteMutation(graphene.relay.ClientIDMutation):
    note = graphene.Field(NoteNode)

    class Input:
        id = graphene.Int(required=True)
        title = graphene.String()
        #slug = graphene.String(required=True)
        content = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        note = Note.objects.get(id=input.get('id'))

        if not note:
            raise Exception('Invalid Link!')
        
        if note.user != info.context.user:
            raise GraphQLError("only note owner can delete it")
        else:
            note.title = input.get('title')
            note.content = input.get('content')
            note.save()
        
        return UpdateNoteMutation(note=note)


class DeleteNoteMutation(graphene.relay.ClientIDMutation):
    success = graphene.Boolean()

    class Input:
        id = graphene.Int(required=True)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        note = Note.objects.get(id=input.get('id'))
        if not note.user == info.context.user:
            raise GraphQLError("only note owner can delete it")
        note.delete()

        return DeleteNoteMutation(success=True)


class Query(graphene.ObjectType):
    note = relay.Node.Field(NoteNode)
    all_notes = DjangoFilterConnectionField(NoteNode)



class Mutations(graphene.ObjectType):
    create_note = CreateNote.Field(description="Create a new note")
    update_note = UpdateNoteMutation.Field(description="Update a note by id")
    delete_note = DeleteNoteMutation.Field(description="Delete a note by id")

schema = graphene.Schema(query=Query, mutation=Mutations)