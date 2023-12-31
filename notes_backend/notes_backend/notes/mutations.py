from graphql import GraphQLError
import graphene
from graphene_django.forms.mutation import DjangoModelFormMutation

from .models import Note
from .types import NoteType, NoteNode
from .inputs import NoteInput



class CreateNoteMutation(graphene.Mutation):
    class Arguments:
        input = NoteInput(required=True)

    success = graphene.Boolean()
    note = graphene.Field(NoteType)

    @staticmethod
    def mutate(root, info, input=None):
        user = info.context.user

        try:
            note_instance = Note.objects.create(
                title=input.get('title'),
                user=user,
                content=input.get('content'),
            )
            note_instance.save()
            success = True
            return CreateNoteMutation(success=success, note=note_instance)
        except GraphQLError('Unable to add note try again later'):
            success = False


class UpdateNoteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = NoteInput(required=True)

    success = graphene.Boolean()
    note = graphene.Field(NoteType)

    @staticmethod
    def mutate(root, info, id, input=None):
        success = False
        user = info.context.user
        note_instance = Note.objects.get(pk=id)

        if note_instance.user != user:
            raise GraphQLError("Only note author can update it")
        else:
            note_instance.title = input.title
            note_instance.content = input.content
            note_instance.save()
            success = True
        return UpdateNoteMutation(success=success, note=note_instance)



class DeleteNoteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()

    @staticmethod
    def mutate(root, info, id):
        user = info.context.user
        note_instance = Note.objects.get(pk=id)

        if not note_instance:
            raise GraphQLError("No post found with the provided id")

        if note_instance.user != user:
            raise GraphQLError("Only note author can delete it")
        else:
            note_instance.delete()
            success = True
        return DeleteNoteMutation(success=success)
