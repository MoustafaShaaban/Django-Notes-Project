from rest_framework import serializers

from backend.notes.models import Note


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ['title', 'content']