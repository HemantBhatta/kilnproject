from django.contrib import admin
from .models import Workers,Kiln
# Register your models here.


class WorkersAdmin(admin.ModelAdmin):
    list_display = ['f_name']

admin.site.register(Workers,WorkersAdmin)


class KilnAdmin(admin.ModelAdmin):
    list_display = ['name']

admin.site.register(Kiln,KilnAdmin)