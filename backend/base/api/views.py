from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.conf import settings

from .serializers import *

# when the user logged in successfully , the token will be created and returned to the user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        print(user)
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        # ...

        return token


#  View to api

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
@api_view(['POST'])
def getRoutes(request):
    routes = [
        '/api/register/',
    ]

    return Response(routes)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     user = request.user
#     notes = user.note_set.all()
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)


# To see the api in the chrome

class UserRegisterCreateAPIView(APIView):
 
#  to post new user (Registration)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class CartProductsViewSet(APIView):
    def get(self, request, user_id):
        # Logic for handling GET request
        carts = Cart.objects.filter(user = user_id)
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class sendEmail(APIView):

    def post(self,request):
        
        email = request.data.get('email')
        location = request.data.get('location')
        print(email)
        print(location)
     
        if email is not None:
            subject = 'Order Confirmation'
            message = f'Thank you for your order! Your order will be delivered to {location}.'
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]
            print(email)
            send_mail(subject, message, from_email, recipient_list)
                
            return JsonResponse({'message': 'Email sent successfully'})
        else:
            return JsonResponse({'error': 'Invalid request method'})

        