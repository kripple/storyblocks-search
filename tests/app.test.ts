import { test, expect } from '@playwright/test';
import { setupServer } from 'msw/node';
import { handlers } from './fixtures/handlers';

const server = setupServer(...handlers);

test.beforeAll(() => server.listen());
test.afterEach(() => server.resetHandlers());
test.afterAll(() => server.close());

test.describe('Storyblocks Search App', () => {
  test('has a search input', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('input[type="text"]')).toBeVisible();
  });

  test.skip('shows placeholder text initially', async ({ page }) => {
    await page.goto('/');

    // Check for placeholder text
  });

  test.skip('can perform a search', async ({ page }) => {
    await page.goto('/');

    // Fill search form
    await page.fill('input[type="text"]', 'nature');
    await page.click('button[type="submit"]');

    // Wait for results

    // Check results appear
  });

  test.skip('shows loading state', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[type="text"]', 'loading-test');
    await page.click('button[type="submit"]');

    // TODO
  });

  test.skip('handles empty search results', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[type="text"]', 'empty-results');
    await page.click('button[type="submit"]');

    // Check results
  });

  test.skip('handles API errors gracefully', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[type="text"]', 'error-test');
    await page.click('button[type="submit"]');

    // Check results
  });
});
