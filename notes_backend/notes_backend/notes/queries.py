from graphql import GraphQLError
import graphene
from graphene_django.filter import DjangoFilterConnectionField

from .models import Note
from .types import NoteType, NoteNode


class Query(graphene.ObjectType):
    all_notes = graphene.List(NoteType)
    note_by_title = graphene.List(NoteType)
    all_notes_with_filters = DjangoFilterConnectionField(NoteNode)

    @classmethod
    def resolve_all_notes(cls, root, info):
        # context will reference to the Django request
        if not info.context.user.is_authenticated:
            return Note.objects.none()
        else:
            return Note.objects.filter(user=info.context.user)

    def resolve_note_by_title(cls, root, info, title):
        try:
            return Note.objects.filter(title__contains=title)
        except Note.DoesNotExist:
            return GraphQLError('No note found with the provided title')
