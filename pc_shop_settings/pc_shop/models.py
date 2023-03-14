from django.db import models
from django.contrib.auth.models import User


class Categories(models.Model):
    name = models.CharField(max_length=45, blank=True, null=True)
    pic = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f'id = {self.id}, name = {self.name}, picture = {self.pic}'

    class Meta:
        managed = False
        db_table = 'categories'



class Status(models.Model):
    name = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'status'


class Groups(models.Model):
    name = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'group'


class Manufac(models.Model):
    name = models.CharField(unique=True, max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'manufac'


class Cart(models.Model):
    prod = models.ForeignKey('Products', models.DO_NOTHING, db_column='prod')
    amount = models.IntegerField(blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING, db_column='user')

    class Meta:
        managed = False
        db_table = 'cart'


class Order(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING, db_column='user')
    status = models.ForeignKey('Status', models.DO_NOTHING, db_column='status')
    creationdate = models.DateTimeField(blank=True, null=True)
    editiondate = models.DateTimeField(blank=True, null=True)
    completitiondate = models.DateTimeField(blank=True, null=True)
    fullprice = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order'


class Orderlist(models.Model):
    name = models.CharField(max_length=45, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    amount = models.IntegerField(blank=True, null=True)
    prod = models.ForeignKey('Products', models.DO_NOTHING, db_column='prod')
    order = models.ForeignKey(Order, models.DO_NOTHING, db_column='order', related_name="list_of_order")

    class Meta:
        managed = False
        db_table = 'orderlist'


class Products(models.Model):
    name = models.CharField(max_length=45, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    amount = models.IntegerField(blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    is_shown = models.IntegerField(blank=True, null=True)
    category = models.ForeignKey(Categories, models.DO_NOTHING, db_column='category')
    picture = models.CharField(max_length=200, blank=True, null=True)
    group = models.ForeignKey(Groups, models.DO_NOTHING, db_column='group')
    manufac = models.ForeignKey(Manufac, models.DO_NOTHING, blank=True, null=True, db_column='manufac')

    class Meta:
        managed = False
        db_table = 'products'

# Create your models here.
