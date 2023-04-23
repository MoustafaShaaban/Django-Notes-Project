from django import forms

from backend.notes.models import Note


class NoteForm(forms.ModelForm):

    class Meta:
        model = Note
        fields = ['title', 'content']
