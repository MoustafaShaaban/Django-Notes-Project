from django.conf import settings
from django.urls import path

from rest_framework.routers import DefaultRouter, SimpleRouter

from notes_backend.users.api.views import UserViewSet
from notes_backend.notes import views as notes_views

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("notes", notes_views.NoteViewSet)


app_name = "api"

urlpatterns = [
    path('csrf/', notes_views.get_csrf, name='api-csrf'),
    path('login/', notes_views.login_view, name='api-login'),
    path('logout/', notes_views.logout_view, name='api-logout'),
    path('session/', notes_views.session_view, name='api-session'),  # new
    path('whoami/', notes_views.whoami_view, name='api-whoami'),  # new
]

urlpatterns += router.urls
