from django.http import HttpResponse

def index(request):
    return HttpResponse("Billing API is working!")

# Create your views here.
