from rest_framework import routers
from .views import TimetableViewSet,StaffViewSet
from django.urls import path,include

router = routers.DefaultRouter()

router.register(r'timetable',TimetableViewSet)
router.register(r'staff',StaffViewSet)

urlpatterns = [
    path('',include(router.urls)),
    #path('',include("rest_framework.urls"))
]
