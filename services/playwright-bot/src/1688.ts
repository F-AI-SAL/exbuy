import { chromium, type BrowserContext, type Page } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

export type BotOptions = {
  baseUrl: string;
  storageStatePath: string;
  screenshotsDir: string;
  headless?: boolean;
};

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

export async function loginAndSaveState(page: Page, options: BotOptions) {
  await page.goto(`${options.baseUrl}/login`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(options.screenshotsDir, 'login.png'), fullPage: true });
}

export async function placeOrder(page: Page, orderUrl: string, options: BotOptions) {
  await page.goto(orderUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(options.screenshotsDir, 'order.png'), fullPage: true });
}

export async function runBot(options: BotOptions, orderUrl: string) {
  await ensureDir(options.screenshotsDir);
  const browser = await chromium.launch({ headless: options.headless ?? true });
  const context: BrowserContext = await browser.newContext();
  const page = await context.newPage();

  try {
    await loginAndSaveState(page, options);
    await context.storageState({ path: options.storageStatePath });
    await placeOrder(page, orderUrl, options);
  } catch (err) {
    const failureShot = path.join(options.screenshotsDir, `failure-${Date.now()}.png`);
    await page.screenshot({ path: failureShot, fullPage: true });
    throw err;
  } finally {
    await browser.close();
  }
}
