# exbuy_core/views.py
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_GET

from merchants.models import Merchant
from orders.models import Order


@require_GET
def popular_products(request):
    """Return demo popular products for the home page."""
    return JsonResponse({
        "results": [
            {
                "id": 1,
                "name": "Smartwatch",
                "price": "3.75",
                "image": "/static/demo/watch.jpg",
            },
            {
                "id": 2,
                "name": "Smart Glasses",
                "price": "44.9",
                "image": "/static/demo/glasses.jpg",
            },
        ]
    })


@require_GET
def analyst_choice(request):
    """Return demo analyst choice products for the home page."""
    return JsonResponse({
        "results": [
            {
                "id": 3,
                "name": "Perfume Bottle",
                "price": "0.1",
                "image": "/static/demo/perfume.jpg",
            },
            {
                "id": 4,
                "name": "CeraVe Skincare",
                "price": "2.0",
                "image": "/static/demo/cerave.jpg",
            },
        ]
    })


@login_required
def home(request):
    """Return dashboard data based on the authenticated user's role."""
    role = getattr(request.user, "role", "guest")
    stats = {
        "merchants": Merchant.objects.count(),
        "orders": Order.objects.count(),
    }
    cards = {
        "admin": [
            {"title": "Merchants", "link": "/merchants", "desc": "Manage all merchants"},
            {"title": "Orders", "link": "/orders", "desc": "Track and update orders"},
            {"title": "Billing", "link": "/billing/invoices", "desc": "Invoices & payments"},
        ],
        "merchant": [
            {"title": "My Orders", "link": "/orders", "desc": "View and manage your orders"},
            {"title": "Shipments", "link": "/shipments", "desc": "Proof of delivery uploads"},
            {"title": "Invoices", "link": "/billing/invoices", "desc": "Check billing status"},
        ],
        "ops": [
            {"title": "Assignments", "link": "/ops/assign", "desc": "Assign couriers"},
            {"title": "Tracking", "link": "/tracking", "desc": "Monitor shipments"},
        ],
    }
    return JsonResponse({
        "status": "running",
        "role": role,
        "stats": stats,
        "cards": cards.get(role, []),
        "banners": [
            {"title": "Welcome to Exbuy", "cta": "View docs", "link": "/api/docs/"},
            {"title": "Merchants onboard", "cta": "Add merchant", "link": "/merchants/new"},
        ],
        "features": [
            {"icon": "grid", "title": "All Categories", "link": "/categories"},
            {"icon": "quote", "title": "Request for Quotation", "link": "/rfq"},
            {"icon": "show", "title": "Trade Shows", "link": "/shows"},
            {"icon": "star", "title": "Analyst's Choice", "link": "/analyst"},
        ],
    })