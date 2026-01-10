import type { Redis } from 'ioredis';

export async function getIdempotency(redis: Redis, key: string) {
  if (!key) return null;
  const data = await redis.get(`idempotency:${key}`);
  return data ? JSON.parse(data) : null;
}

export async function setIdempotency(redis: Redis, key: string, value: unknown) {
  if (!key) return;
  await redis.set(`idempotency:${key}`, JSON.stringify(value), 'EX', 600);
}
