# todo/models.py

from django.db import models
# Create your models here.

# add this
class Lobby(models.Model):
  id = models.CharField(max_length=120, primary_key=True)
  completed = models.BooleanField(default=False)

  def _str_(self):
    return self.id
