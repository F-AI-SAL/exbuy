import type { NextFunction, Request, Response } from 'express';
import type { Redis } from 'ioredis';

import { config } from './config.js';

export function rateLimit(redis: Redis) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const key = `ratelimit:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, 60);
    }

    if (count > config.rateLimitPerMinute) {
      res.status(429).json({ error: 'Too many requests' });
      return;
    }

    next();
  };
}
