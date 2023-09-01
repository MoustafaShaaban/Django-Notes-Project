import uuid
import pytest

from django.test import TestCase
from django.urls import reverse


@pytest.fixture
def create_user(db, django_user_model, test_password):
    def make_user(**kwargs):
        kwargs['password'] = test_password
        if 'username' not in kwargs:
            kwargs['username'] = str(uuid.uuid4())
        return django_user_model.objects.create_user(**kwargs)
    return make_user


# class HomepageTests(TestCase):
#     def test_url_exists_at_correct_location(self):
#         response = self.client.get("/")
#         self.assertEqual(response.status_code, 200)

#     def test_url_available_by_name(self):  
#         response = self.client.get(reverse("notes:note-list"))
#         self.assertEqual(response.status_code, 200)

#     def test_template_name_correct(self):  
#         response = self.client.get(reverse("notes:note-list"))
#         self.assertTemplateUsed(response, "notes/notes_list.html")



# @pytest.fixture
# def test_password():
#     return 'strong-test-pass'




# @pytest.mark.django_db
# def test_auth_views(client, create_user, test_password):
#     user = create_user()
#     url = reverse("blog:tag-list")
#     client.login(username=user.username, password=test_password)
#     response = client.get(url)
#     assert response.status_code == 200

# def test_auth_views(client, django_user_model):
#     username = 'test'
#     password = '1234'
#     user = django_user_model.objects.create_user(username=username, password=password)
#     client.force_login(user)
#     url = reverse("blog:tag-list")
#     response = client.get(url)
#     assert response.status_code == 200


@pytest.mark.django_db
def test_notes_list_url(admin_client):
    url = reverse('notes:note-list')
    response = admin_client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_create_note_url(admin_client):
    url = reverse('notes:create-note')
    response = admin_client.get(url)
    assert response.status_code == 200