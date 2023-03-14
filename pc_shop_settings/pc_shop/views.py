from django.shortcuts import render
from pc_shop.serializers import *
from pc_shop.models import *
from django.db.models import Max, Min, Sum
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import Group
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser, BasePermission, SAFE_METHODS
    #,IsManagerOrReadOnly
from django.contrib.auth.models import User

class IsManagerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and User.objects.filter(pk=request.user.id, groups__name='manager').exists())
# Create your views here.
@api_view(['GET'])
def get_price_limits(request, catid):
    return Response(Products.objects.filter(category=catid).aggregate(min_cost=Min('price'),max_cost = Max('price')))

@api_view(['GET'])
def get_income(request):
    order = Order.objects.all()
    params = request.query_params.dict()
    try :
        order = order.filter(creationdate__lte=params['latest'])
    except:
        pass
    try:
        order = order.filter(creationdate__gte=params['newest'])
    except:
        pass
    return Response(order.aggregate(income=Sum('fullprice')))


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_manager(request):
    user = request.user
    return Response(user.groups.filter(name='manager').exists())

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_name(request):
    user = request.user
    return Response(user.username)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsManagerOrReadOnly]
    queryset=Categories.objects.all().order_by('id')

class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    permission_classes = [IsManagerOrReadOnly]
    queryset=Groups.objects.all().order_by('id')

class ManufacViewSet(viewsets.ModelViewSet):
    serializer_class = ManufacSerializer
    permission_classes = [IsManagerOrReadOnly]
    queryset=Manufac.objects.all().order_by('id')

class StatusViewSet(viewsets.ModelViewSet):
    serializer_class = StatusSerializer
    permission_classes = [IsManagerOrReadOnly]
    queryset=Status.objects.all().order_by('id')

class ProductsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductSerializer
        else:
            return EmptyProductSerializer

    def get_queryset(self):

        queryset = Products.objects.filter(category = self.kwargs['category_pk'])
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(name__icontains=params['name'])
            except:
                pass
            try:
                queryset = queryset.filter(price__lte=params['max_cost'])
            except:
                pass
            try:
                queryset = queryset.filter(price__gte=params['min_cost'])
            except:
                pass
            try:
                queryset = queryset.filter(group__in=params['groups'].split(','))
            except:
                pass
        return queryset.order_by("id")

class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CartSerializer
        else:
            return EmptyCartSerializer

    def get_queryset(self):
        queryset = Cart.objects.all()
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(user=params['user'])
                try:
                    queryset = queryset.filter(prod=params['product'])
                except:
                    pass
                return queryset.order_by("id")
            except:
                pass
        return queryset.order_by("id")

class OrderListViewSet(viewsets.ModelViewSet):

    serializer_class = EmptyOrderListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Orderlist.objects.all().order_by('id')


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return OrderSerializer
        else:
            return EmptyOrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(user=params['user'])
                try:
                    queryset = queryset.filter(creationdate__gte=params['start_date'])
                except:
                    pass
                try:
                    queryset = queryset.filter(creationdate__lte=params['end_date'])
                except:
                    pass
                try:
                    queryset = queryset.filter(status__in=params['statuses'].split(','))
                except:
                    pass
                return queryset.order_by("-creationdate")
            except:
                pass
        return queryset.order_by("-creationdate")

class MGROrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsManagerOrReadOnly]
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return OrderSerializer
        else:
            return EmptyOrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                try:
                    queryset = queryset.filter(creationdate__gte=params['start_date'])
                except:
                    pass
                try:
                    queryset = queryset.filter(creationdate__lte=params['end_date'])
                except:
                    pass
                try:
                    queryset = queryset.filter(status__in=params['statuses'].split(','))
                except:
                    pass
                return queryset.order_by("-creationdate")
            except:
                pass
        return queryset.order_by("-creationdate")

@api_view(['GET', 'POST'])
def setUser(request):
        if request.method == 'POST':
            user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
            customer = Group.objects.get(name='Customer')
            customer.user_set.add(user)
            user.save()
            print(request.data)
            return HttpResponse("{'status': 'ok'}")
        else:
            return HttpResponse("{'status': 'denied'}")


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request: Request):
    print(1,request.data)
    serializer = LoginRequestSerializer(data=request.data)
    if serializer.is_valid():
        authenticated_user = authenticate(**serializer.validated_data)
        if authenticated_user is not None:
            login(request, authenticated_user)
            return HttpResponse(status=200)
        else:
            return Response({'error': 'Invalid credentials'}, status=403)
    else:
        return Response(serializer.errors, status=400)

@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    print(AUserSerializer(request.user).data)

    return Response({
        'data': AUserSerializer(request.user).data,
    })




class ProductsMViewSet(viewsets.ModelViewSet):
    permission_classes = [IsManagerOrReadOnly]
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductSerializer
        else:
            return EmptyProductSerializer

    def get_queryset(self):
        queryset = Products.objects.all()
        return queryset.order_by("id")

# Create your views here.
