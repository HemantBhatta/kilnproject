from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users',views.UserViewSet)

urlpatterns = [

    path('workers/<int:pk>', views.workers_detail),
    path('workers/', views.workers_list),
    path('kiln/<int:pk>', views.kiln_detail),
    path('kiln/', views.kiln_list),
    path('user/', views.user),
    path('ngos/', views.ngos_list),
    path('sync-payments/', views.sync_payments),
    path('',include(router.urls))
]
