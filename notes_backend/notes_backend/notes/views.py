import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView, ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.http import JsonResponse
from django.views.decorators.cache import cache_page
from graphene_django.views import GraphQLView

from rest_framework import viewsets, generics
from rest_framework import permissions

from notes_backend.notes.models import Note
from notes_backend.notes.permissions import IsOwnerOrReadOnly
from notes_backend.notes.serializers import NoteSerializer


class PrivateGraphQLView(LoginRequiredMixin, GraphQLView):
    pass


class ListNotes(LoginRequiredMixin, ListView):
    model = Note
    template_name = 'notes/notes_list.html'
    context_object_name = 'notes'
    paginate_by = 5

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)


class NoteDetail(LoginRequiredMixin, DetailView):
    model = Note
    context_object_name = 'note'


class CreateNote(LoginRequiredMixin, CreateView):
    model = Note
    fields = ['title', 'content']
    template_name = 'notes/create_note.html'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)


class UpdateNote(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Note
    fields = ['title', 'content']
    template_name = 'notes/update_note.html'
    success_url = reverse_lazy('notes:note-list')


    def test_func(self):
        note = self.get_object()
        if self.request.user == note.user:
            return True
        return False


class DeleteNote(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Note
    template_name = 'notes/delete_note.html'
    success_url = reverse_lazy('notes:note-list')

    def test_func(self):
        note = self.get_object()
        if self.request.user == note.user:
            return True
        return False


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.username})