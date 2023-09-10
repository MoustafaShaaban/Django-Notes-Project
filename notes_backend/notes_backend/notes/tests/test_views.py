from django.test import TestCase
from django.urls import reverse

from notes_backend.notes.models import Note
from notes_backend.users.models import User

class NoteListViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        number_of_notes = 9
        user = User.objects.create_user('test', 'test@test.com', 'test')

        for note_id in range(number_of_notes):
            Note.objects.create(
                title=f'Note {note_id}',
                content=f'Note content {note_id} ',
                user=user
            )

    def test_view_url_exits_at_desired_location(self):
        user = User.objects.create_user("Juliana," "juliana@dev.io", "some_pass")
        self.client.force_login(user=user)
        response = self.client.get(reverse("notes:note-list"))
        self.assertEqual(response.status_code, 200)

    def test_view_url_accessible_by_name(self):
        user = User.objects.create_user("Juliana," "juliana@dev.io", "some_pass")
        self.client.force_login(user=user)
        response = self.client.get(reverse("notes:note-list"))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        user = User.objects.create_user("Juliana," "juliana@dev.io", "some_pass")
        self.client.force_login(user=user)
        response = self.client.get(reverse("notes:note-list"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'notes/notes_list.html')
