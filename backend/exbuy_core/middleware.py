import uuid


class RequestIdMiddleware:
    """Attach a request ID to each request/response for traceability."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request_id = request.headers.get("X-Request-Id") or str(uuid.uuid4())
        request.request_id = request_id
        response = self.get_response(request)
        response["X-Request-Id"] = request_id
        return response
