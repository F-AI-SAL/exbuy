import { Queue, Worker } from 'bullmq';
import type { RedisOptions } from 'ioredis';

import { config } from './config.js';
import { logger } from './logger.js';

const connection: RedisOptions = {
  host: new URL(config.redisUrl).hostname,
  port: Number(new URL(config.redisUrl).port || 6379),
  password: new URL(config.redisUrl).password || undefined,
};

export const orderQueue = new Queue('order-automation', { connection });

export const orderWorker = new Worker(
  'order-automation',
  async (job) => {
    logger.info({ jobId: job.id, type: job.name }, 'Processing order automation job');
    await new Promise((resolve) => setTimeout(resolve, 250));
    return { status: 'queued_for_processing' };
  },
  { connection }
);
