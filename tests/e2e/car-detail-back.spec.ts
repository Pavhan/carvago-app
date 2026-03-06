import { expect, test } from '@playwright/test';

test('car detail back navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Auta' })).toBeVisible();

  const detailLink = page.getByRole('link', { name: 'Detail' }).first();
  await expect(detailLink).toBeVisible();
  await detailLink.click();

  await expect(page).toHaveURL(/\/cars\/.+/);

  const backLink = page.getByRole('link', { name: 'Zpět' });
  await expect(backLink).toBeVisible();
  await backLink.click();

  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { name: 'Auta' })).toBeVisible();
});
