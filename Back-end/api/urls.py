from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

router.register('project',viewset=ProjectViewSets,basename='project')
router.register('projectmanager',viewset=ProjectManagerViewSets,basename='projectmanager')
router.register('employees',viewset=EmployeeViewSets,basename='employees')
urlpatterns = router.urls