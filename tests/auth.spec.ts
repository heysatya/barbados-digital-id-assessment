import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard Authentication (Single-Route)', () => {
  const ADMIN_EMAIL = 'trident-admin@dida.local';
  const ADMIN_PASSWORD = 'Tr1dent@Barbad0s';

  test('should show login modal when unauthenticated and allow login', async ({ page }) => {
    test.slow();
    await page.goto('http://localhost:3000/dashboard');

    await expect(page.locator('text=Institutional Access')).toBeVisible();
    const loginForm = page.locator('#login-form');
    await expect(loginForm).toBeVisible();

    await expect(page.locator('nav')).not.toBeVisible();

    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');

    await expect(loginForm).not.toBeVisible({ timeout: 20000 });
    await expect(page.locator('nav')).toBeVisible({ timeout: 10000 });

    await expect(page.getByRole('button', { name: /Executive Summary/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Pillar Dashboard/i })).toBeVisible();

    await page.reload({ waitUntil: 'networkidle' });
    await expect(loginForm).not.toBeVisible();
    await expect(page.getByRole('button', { name: /Executive Summary/i })).toBeVisible();
  });

  test('should show error message on invalid credentials', async ({ page }) => {
    test.slow(); // Give slower browsers more time to process the auth failure
    await page.goto('http://localhost:3000/dashboard');

    await page.fill('input[name="email"]', 'wrong@dida.local');
    await page.fill('input[name="password"]', 'WrongPassword123');
    await page.click('button[type="submit"]');

    // FIX: Instead of looking for a DIV, we look for a SPAN or use getByText.
    // getByText is "strict" but avoids the nested DIV container conflict.
    const errorMessage = page.getByText(/Invalid login credentials/i);
    await expect(errorMessage).toBeVisible({ timeout: 15000 });
  });
});