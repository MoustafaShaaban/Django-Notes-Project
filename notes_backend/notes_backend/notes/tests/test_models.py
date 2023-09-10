import pytest

from django.test import TestCase

from notes_backend.users.models import User
from notes_backend.notes.models import Note


@pytest.mark.django_db
def test_user_create():
    user = User.objects.create_user('test', 'test@test.com', 'test')
    count = User.objects.all().count()
    assert User.objects.count() == 1


@pytest.mark.django_db
def test_create_note():
    user = User.objects.create_user('test', 'test@test.com', 'test')
    note = Note.objects.create(
        title="Note 1",
        content="Note 1 content",
        user=user
    )
    assert Note.objects.count() == 1
    assert note.title == 'Note 1'
    assert note.content == 'Note 1 content'
    assert note.user.username == 'test'


class NoteModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        user = User.objects.create_user('test', 'test@test.com', 'test')
        note = Note.objects.create(
            title="Note 1",
            content="Note 1 content",
            user=user
        )

    def test_note_title_max_length(self):
        note = Note.objects.get(id=1)
        max_length = note._meta.get_field('title').max_length
        self.assertEqual(max_length, 250)

    def test_model_str(self):
        note = Note.objects.get(id=1)
        expected_object_name = f'Note Title: {note.title}, By: {note.user}'
        self.assertEqual(str(note), expected_object_name)

    def test_get_absolute_url(self):
        note = Note.objects.get(id=1)
        # This will also fail if the urlconf is not defined.
        self.assertEqual(note.get_absolute_url(), '/note/1/')
