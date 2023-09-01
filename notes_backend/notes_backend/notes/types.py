import strawberry
from strawberry import auto
from typing import List

from . import models

@strawberry.django.type(models.Note)
class NoteType:
    id: auto
    title: auto
    content: auto
    created_on: auto
    user: auto