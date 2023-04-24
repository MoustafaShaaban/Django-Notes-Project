from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView, ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from graphene_django.views import GraphQLView

from backend.notes.models import Note


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
