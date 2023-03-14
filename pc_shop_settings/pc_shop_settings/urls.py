from django.contrib import admin
from django.urls import include,path
from pc_shop import views as tea_views
from rest_framework_nested import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r'ctg', tea_views.CategoryViewSet, basename='category')
router.register(r'manufac',tea_views.ManufacViewSet, basename='manufacturer')
router.register(r'cart', tea_views.CartViewSet, basename='cart')
router.register(r'status', tea_views.StatusViewSet, basename='status')
router.register(r'order', tea_views.OrderViewSet, basename='order')
router.register(r'group', tea_views.GroupViewSet, basename='groups of prods')
router.register(r'orderm', tea_views.MGROrderViewSet, basename='manager order')
router.register(r'orderlist', tea_views.OrderListViewSet, basename='order details')
router.register(r'prodm', tea_views.ProductsMViewSet, basename='prods')


ctg_router = routers.NestedSimpleRouter(router, r'ctg', lookup='category')
ctg_router.register(r'prods', tea_views.ProductsViewSet, basename='products')

urlpatterns = [
    path('', include(router.urls)),
    path('',include(ctg_router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('ismgr/', tea_views.get_manager, name='is moderator'),
    path('income/',tea_views.get_income,name='income'),
    path('getname/', tea_views.get_name, name='get username'),
    path('prodprice/<int:catid>', tea_views.get_price_limits),
    path('add_user', tea_views.setUser, name='setUser'),
    path('api/user', tea_views.user, name='user'),
    path('api/token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
