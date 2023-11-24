from django.db import models
from django.conf import settings
from django.urls import reverse

class Note(models.Model):
    """Model definition for Note."""

    title = models.CharField(max_length=250)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True
    )
    content = models.TextField(blank=True)
    created_on = models.DateField(auto_now_add=True)

    class Meta:
        """Meta definition for Note."""
        ordering = ['-created_on']
        indexes = [
            models.Index(fields=['-created_on', 'user'])
        ]
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'

    def __str__(self):
        """Unicode representation of Note."""
        return f'Note Title: {self.title}, By: {self.user}'

    def get_absolute_url(self):
        return reverse('notes:note-detail', kwargs={'pk': self.pk})
