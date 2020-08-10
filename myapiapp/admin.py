from django.contrib import admin
from .models import Workers,Kiln,ExtendedUser,ngos
# Register your models here.

class ExtendedUserAdmin(admin.ModelAdmin):
    list_display = ['username','email']
admin.site.register(ExtendedUser,ExtendedUserAdmin)

class WorkersAdmin(admin.ModelAdmin):
    list_display = ['f_name']

admin.site.register(Workers,WorkersAdmin)


class KilnAdmin(admin.ModelAdmin):
    list_display = ['name']

admin.site.register(Kiln,KilnAdmin)

class NgosAdmin(admin.ModelAdmin):
    list_display = ['name']
admin.site.register(ngos,NgosAdmin)