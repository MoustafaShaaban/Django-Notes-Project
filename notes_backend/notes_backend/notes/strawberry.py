import strawberry
from typing import List
from .types import NoteType
from .models import Note


@strawberry.type
class Query:
    @strawberry.field
    def notes(self) -> List[NoteType]:
       return Note.objects.all()
    
schema = strawberry.Schema(query=Query)