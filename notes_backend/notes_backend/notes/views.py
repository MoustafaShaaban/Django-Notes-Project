from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView, ListView, CreateView, UpdateView, DeleteView
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
    #queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
