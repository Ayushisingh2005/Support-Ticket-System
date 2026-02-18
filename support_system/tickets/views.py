from django.shortcuts import render

# Create your views here.
# tickets/views.py

from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .models import Ticket
from .serializers import TicketSerializer

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by("-created_at")
    serializer_class = TicketSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["category", "priority", "status"]
    search_fields = ["title", "description"]
    
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, Avg
from django.utils.timezone import now
from datetime import timedelta
from .models import Ticket

@api_view(["GET"])
def ticket_stats(request):
    total = Ticket.objects.count()
    open_count = Ticket.objects.filter(status="open").count()

    # average per day (last 30 days)
    last_30 = now() - timedelta(days=30)
    avg = (
        Ticket.objects.filter(created_at__gte=last_30)
        .values("created_at__date")
        .annotate(count=Count("id"))
        .aggregate(avg=Avg("count"))
    )["avg"] or 0

    priority_breakdown = dict(
        Ticket.objects.values("priority")
        .annotate(count=Count("id"))
        .values_list("priority", "count")
    )

    category_breakdown = dict(
        Ticket.objects.values("category")
        .annotate(count=Count("id"))
        .values_list("category", "count")
    )

    return Response({
        "total_tickets": total,
        "open_tickets": open_count,
        "avg_tickets_per_day": round(avg, 2),
        "priority_breakdown": priority_breakdown,
        "category_breakdown": category_breakdown
    })

# tickets/views.py

import os
from openai import OpenAI

@api_view(["POST"])
def classify_ticket(request):
    description = request.data.get("description")

    try:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        prompt = f"""
        Categorize the following support ticket into one of:
        billing, technical, account, general

        Also assign priority:
        low, medium, high, critical

        Return JSON:
        {{
            "category": "...",
            "priority": "..."
        }}

        Ticket:
        {description}
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )

        content = response.choices[0].message.content

        import json
        result = json.loads(content)

        return Response({
            "suggested_category": result["category"],
            "suggested_priority": result["priority"]
        })

    except Exception:
        # graceful fallback
        return Response({
            "suggested_category": "general",
            "suggested_priority": "medium"
        })
