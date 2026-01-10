import path from 'node:path';

import { runBot } from './1688.js';

const baseUrl = process.env.BOT_BASE_URL || 'https://www.1688.com';
const orderUrl = process.env.BOT_ORDER_URL || 'https://www.1688.com';
const storageStatePath = process.env.BOT_STORAGE_STATE || path.resolve('storage-state.json');
const screenshotsDir = process.env.BOT_SCREENSHOTS_DIR || path.resolve('screenshots');

runBot(
  {
    baseUrl,
    storageStatePath,
    screenshotsDir,
    headless: process.env.BOT_HEADLESS !== 'false',
  },
  orderUrl
).catch((err) => {
  console.error('Bot failed', err);
  process.exit(1);
});
