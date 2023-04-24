from django.urls import path

from backend.notes import views
from backend.notes.schema import schema


app_name = 'notes'


urlpatterns = [
    path('', views.ListNotes.as_view(), name='note-list'),
    path('create-note/', views.CreateNote.as_view(), name='create-note'),
    path('update-note/<int:pk>/', views.UpdateNote.as_view(), name='update-note'),
    path('delete-note/<int:pk>/', views.DeleteNote.as_view(), name='delete-note'),
    path("graphql/", views.PrivateGraphQLView.as_view(graphiql=True, schema=schema), name='graphiql'),
]