from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from backend.users.api.views import UserViewSet
from backend.notes.views import NoteViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("notes", NoteViewSet)


app_name = "api"
urlpatterns = router.urls
