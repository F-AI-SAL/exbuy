# ExBuy Enterprise Ops Guide

## Environment Variables

Frontend (Vercel):
- `NEXT_PUBLIC_API_BASE` = `https://api.yourdomain.tld`
- `NEXT_PUBLIC_IMAGE_HOST` = `cdn.yourdomain.tld`
- `NEXT_PUBLIC_SITE_URL` = `https://exbuy.yourdomain.tld`
- `JWT_SECRET` (for Next.js auth API routes)
- `MONGODB_URI` (for Next.js auth API routes)

Backend (Railway/Docker):
- `SECRET_KEY`
- `DEBUG` = `False`
- `ALLOWED_HOSTS` = `api.yourdomain.tld`
- `DATABASE_URL`
- `REDIS_URL`
- `CORS_ALLOWED_ORIGINS` = `https://exbuy.yourdomain.tld`
- `CSRF_TRUSTED_ORIGINS` = `https://exbuy.yourdomain.tld`
- `SECURE_SSL_REDIRECT` = `True`
- `SECURE_HSTS_SECONDS` = `31536000`
- `ORDER_PAYLOAD_PRIVATE_KEY` = `-----BEGIN PRIVATE KEY-----...`

Order Automation Microservice:
- `PORT` = `8080`
- `REDIS_URL`
- `JWT_SECRET`
- `JWT_ISSUER` = `exbuy-api`
- `RATE_LIMIT_PER_MINUTE` = `60`
- `ORDER_PAYLOAD_PUBLIC_KEY` = `-----BEGIN PUBLIC KEY-----...`

Playwright Bot:
- `BOT_BASE_URL` = `https://www.1688.com`
- `BOT_ORDER_URL` = `https://www.1688.com`
- `BOT_STORAGE_STATE` = `./storage-state.json`
- `BOT_SCREENSHOTS_DIR` = `./screenshots`
- `BOT_HEADLESS` = `true`

## Cloudflare Configuration

- Cache everything for `/static/*` and `/_next/*` with browser TTL 1 year.
- Respect origin cache headers for `/products/*` (ISR).
- WAF rules: challenge requests to `/api/*` from non-verified bots or high-risk IPs.
- Rate limiting: `/api/*` 60 req/min per IP (Burst 10).
- Enable Bot Fight Mode and Origin Shield.
- Enable HSTS in Cloudflare and on the origin (already set in Django/Next headers).

## Deployment Checklist

1. Vercel: set env vars and use `frontend` as root.
2. Railway/Docker: set env vars and run migrations.
3. Verify `/api/ops/health/` and `/health` (microservice).
4. Configure custom domains and SSL.
5. Set Cloudflare cache rules and WAF.
6. Run smoke tests: auth, product details, encrypted order create, order automation enqueue.

## Postman Snippets

JWT:
```
POST {{API_BASE}}/api/token/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

Product details (JWT required):
```
GET {{API_BASE}}/api/products/sample-slug/
Authorization: Bearer {{access}}
```

Encrypted order create:
```
POST {{API_BASE}}/api/orders/place/encrypted/
Authorization: Bearer {{access}}
Idempotency-Key: {{uuid}}
Content-Type: application/json

{
  "payload": "{{base64_rsa_oaep_payload}}"
}
```

Automation enqueue:
```
POST {{AUTOMATION_BASE}}/api/orders
Authorization: Bearer {{access}}
Idempotency-Key: {{uuid}}
Content-Type: application/json

{
  "order": {
    "customer_name": "Sample Buyer",
    "payment_status": "pending",
    "items": [
      { "name": "Sample", "price": "10.00", "qty": 1 }
    ]
  }
}
```
