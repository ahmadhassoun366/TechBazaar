from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from grappelli import urls as grappelli_urls

urlpatterns = [
    path('admin/', include(grappelli_urls)),
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls'))
] + static(settings.STATIC_URL, documnet_root=settings.STATIC_ROOT)

