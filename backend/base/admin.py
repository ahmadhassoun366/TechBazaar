from django.contrib import admin
from .models import *
# Register your models here.
    
class ProductAdmin(admin.ModelAdmin):
    list_display = ('user', 'price', 'title', 'description', 'date', 'image')
    fields = ('user', 'price', 'title', 'description', 'date', 'image')


class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'product')
    fields = ('user', 'product')


admin.site.register(Product, ProductAdmin)
admin.site.register(Cart, CartAdmin)
