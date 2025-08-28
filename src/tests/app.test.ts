import { test, expect } from '@playwright/test';

test.describe('Storyblocks Search App', () => {
  test('has a search input', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('input[type="search"]')).toBeVisible();
  });

  test('can perform a search', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[type="search"]', 'colorful landscapes');
    await page.press('input[type="search"]', 'Enter');

    await expect(page.locator('[data-testid="NoResults"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="SearchError"]')).not.toBeVisible();

    await expect(page.locator('[data-testid="AssetCard"]')).toHaveCount(20);
  });

  test('shows loading state', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[type="search"]', 'loading');
    await page.press('input[type="search"]', 'Enter');

    await expect(page.locator('[data-testid="NoResults"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="SearchError"]')).not.toBeVisible();

    await expect(
      page.locator('[data-testid="LoadingSearchResults"]'),
    ).toBeVisible();
  });

  test('handles empty search results', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[type="search"]', 'empty');
    await page.press('input[type="search"]', 'Enter');

    await expect(page.locator('[data-testid="NoResults"]')).toBeVisible();
  });

  test('handles API errors gracefully', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[type="search"]', 'error');
    await page.press('input[type="search"]', 'Enter');

    await expect(page.locator('[data-testid="SearchError"]')).toBeVisible();
  });
});
