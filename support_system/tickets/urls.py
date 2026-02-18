from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, ticket_stats

router = DefaultRouter()
router.register(r"tickets", TicketViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("tickets/stats/", ticket_stats),
]
