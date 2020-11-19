from django.contrib import admin
from .models import Todo
# admin.site.register(Todo)

@admin.register(Todo)
class Todo(admin.ModelAdmin):
    list_display = ['text','completed']