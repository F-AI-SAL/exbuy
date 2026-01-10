import express from 'express';
import { jwtVerify } from 'jose';
import { createHash } from 'crypto';
import Redis from 'ioredis';

import { config } from './config.js';
import { encryptOrderPayload } from './crypto.js';
import { getIdempotency, setIdempotency } from './idempotency.js';
import { logger } from './logger.js';
import { orderQueue, orderWorker } from './queue.js';
import { rateLimit } from './rateLimit.js';

const app = express();
const redis = new Redis(config.redisUrl);

app.use(express.json({ limit: '1mb' }));
app.use(rateLimit(redis));

app.use((req, res, next) => {
  const requestId = req.header('X-Request-Id') || createHash('sha1').update(`${Date.now()}-${Math.random()}`).digest('hex');
  res.setHeader('X-Request-Id', requestId);
  (req as typeof req & { requestId?: string }).requestId = requestId;
  next();
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/orders', async (req, res) => {
  if (!config.jwtSecret) {
    res.status(500).json({ error: 'JWT secret missing' });
    return;
  }

  const auth = req.header('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  try {
    await jwtVerify(token, new TextEncoder().encode(config.jwtSecret), {
      issuer: config.jwtIssuer,
    });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const idempotencyKey = req.header('Idempotency-Key') || '';
  const cached = await getIdempotency(redis, idempotencyKey);
  if (cached) {
    res.status(200).json(cached);
    return;
  }

  const { payload, order } = req.body as { payload?: string; order?: Record<string, unknown> };
  let encryptedPayload = payload;
  if (!encryptedPayload && order) {
    if (!config.orderPublicKey) {
      res.status(400).json({ error: 'ORDER_PAYLOAD_PUBLIC_KEY is required' });
      return;
    }
    encryptedPayload = encryptOrderPayload(order, config.orderPublicKey);
  }

  if (!encryptedPayload) {
    res.status(400).json({ error: 'Missing payload or order' });
    return;
  }

  const job = await orderQueue.add('order.place', { payload: encryptedPayload });
  const response = { jobId: job.id, status: 'queued' };
  await setIdempotency(redis, idempotencyKey, response);

  logger.info({ jobId: job.id }, 'Order queued');
  res.status(202).json(response);
});

orderWorker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Order job failed');
});

app.listen(config.port, () => {
  logger.info({ port: config.port }, 'Order automation service listening');
});
