import { test, expect } from '@playwright/test';

test.describe('Dashboard 10-Tab Audit', () => {
  const ADMIN_EMAIL = 'trident-admin@dida.local';
  const ADMIN_PASSWORD = 'Tr1dent@Barbad0s';

  test.beforeEach(async ({ page }) => {
    // 1. Give the login flow extra time (crucial for Firefox/Webkit)
    test.slow();

    await page.goto('http://localhost:3000/dashboard');

    // 2. Wait for the login modal to be ready
    await expect(page.locator('text=Institutional Access')).toBeVisible();

    // 3. Authenticate
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');

    // 4. Wait for the login modal to disappear completely
    await expect(page.locator('#login-form')).not.toBeVisible({ timeout: 20000 });

    // 5. Ensure the main dashboard nav is fully rendered before proceeding
    await expect(page.locator('nav')).toBeVisible({ timeout: 10000 });
  });

  // Upgrade tabs to use flexible regex patterns for Role-based targeting
  const tabs = [
    { name: 'Executive Summary', pattern: /Executive/i },
    { name: 'Pillar Dashboard', pattern: /Pillar Dashboard/i },
    { name: 'Subpillar Heatmap', pattern: /Heatmap/i },      // Was /Subpillar Heatmap/i
    { name: 'Expert Response View', pattern: /Expert/i },
    { name: 'Raw Responses View', pattern: /Raw/i },         // Was /Raw Response/i
    { name: 'Question Aggregation', pattern: /Question/i },  // Was /Question Aggregation/i
    { name: 'Data Quality', pattern: /Quality/i },
    { name: 'Divergence Analysis', pattern: /Divergence/i },
    { name: 'Admin Actions', pattern: /Admin/i },
    { name: 'Exports', pattern: /Export/i },
  ];

  for (const tab of tabs) {
    test(`Audit Tab: ${tab.name}`, async ({ page }) => {
      // FIX: Use getByRole('button') to specifically click the sidebar navigation
      // This completely bypasses the "Strict Mode Violation"
      const tabButton = page.getByRole('button', { name: tab.pattern });

      await expect(tabButton).toBeVisible();
      await tabButton.click();

      // Basic accessibility/rendering check: ensure no "Data load error" or empty screen
      await expect(page.locator('text=Data load error')).not.toBeVisible();

      // Wait for the main content area to render
      await expect(page.locator('main')).toBeVisible();
    });
  }
});