from django.urls import path,include
from . import views
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from rest_framework import routers
    

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    path('', views.getRoutes),
    path('register/', UserRegisterCreateAPIView.as_view(), name='apiregister'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('mycart/<int:user_id>/', CartProductsViewSet.as_view(), name='mycart'),
    path('send_order_email/', sendEmail.as_view(), name='send_order_email'),
    
    path('', include(router.urls)),
]
