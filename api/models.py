from django.db import models

class Todo(models.Model):
    text = models.CharField(max_length=24)
    completed = models.BooleanField(default=False, blank=True, null=True)
    
    def __str__(self):
        return self.text
