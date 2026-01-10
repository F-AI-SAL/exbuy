import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 8080),
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtIssuer: process.env.JWT_ISSUER || 'exbuy-api',
  rateLimitPerMinute: Number(process.env.RATE_LIMIT_PER_MINUTE || 60),
  orderPublicKey: process.env.ORDER_PAYLOAD_PUBLIC_KEY || '',
};
