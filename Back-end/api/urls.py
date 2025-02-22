from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

router.register('project',viewset=ProjectViewSets,basename='project')
urlpatterns = router.urls