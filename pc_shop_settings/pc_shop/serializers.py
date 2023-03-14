from pc_shop.models import *
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Categories
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Groups
        fields = '__all__'

class ManufacSerializer(serializers.ModelSerializer):

    class Meta:
        model = Manufac
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):

    category = CategorySerializer(read_only=True)
    group = GroupSerializer(read_only=True)
    manufac=ManufacSerializer(read_only=True)

    class Meta:
        model = Products
        fields = ["id", "name" , "description","amount", "price", "is_shown", "category","picture", "group","manufac"]

class EmptyProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Products
        fields =  ["id", "name" , "description","amount", "price", "is_shown", "category","picture", "group","manufac"]


class StatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = '__all__'


class OrderListSerializer(serializers.ModelSerializer):
    prod = ProductSerializer(read_only=True)

    class Meta:
        model = Orderlist
        fields = '__all__'


class EmptyOrderListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Orderlist
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    status = StatusSerializer(read_only=True)
    list_of_order=OrderListSerializer(read_only=True,many=True)

    class Meta:
        model = Order
        fields = ["id", "user" , "status","creationdate", "editiondate", "completitiondate", "list_of_order","fullprice"]


class EmptyOrderSerializer(serializers.ModelSerializer):


    class Meta:
        model = Order
        fields = ["id", "user", "status", "creationdate", "editiondate", "fullprice","completitiondate"]


class CartSerializer(serializers.ModelSerializer):
    prod = ProductSerializer(read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'


class EmptyCartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = '__all__'

        class LoginRequestSerializer(serializers.ModelSerializer):
            model = User
            username = serializers.CharField(required=True)
            password = serializers.CharField(required=True)


class LoginRequestSerializer(serializers.ModelSerializer):
    model = User
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

class AUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]