from django.urls import path

from notes_backend.notes import views
from notes_backend.notes.schema import schema
#from backend.notes.strawberry import schema
#from strawberry.django.views import GraphQLView
from graphene_django.views import GraphQLView


app_name = 'notes'


urlpatterns = [
    path('', views.ListNotes.as_view(), name='note-list'),
    path('note/<int:pk>/', views.NoteDetail.as_view(), name='note-detail'),
    path('create-note/', views.CreateNote.as_view(), name='create-note'),
    path('update-note/<int:pk>/', views.UpdateNote.as_view(), name='update-note'),
    path('delete-note/<int:pk>/', views.DeleteNote.as_view(), name='delete-note'),
    path("graphql/", views.PrivateGraphQLView.as_view(graphiql=True, schema=schema), name='graphiql'),
]
