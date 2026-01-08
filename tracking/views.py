from django.http import HttpResponse

def index(request):
    return HttpResponse("Tracking API is working!")

# Create your views here.
