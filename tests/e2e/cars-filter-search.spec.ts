import { expect, test } from "@playwright/test";

test.setTimeout(90_000);

test("filters cars by transmission/fuel and supports reset", async ({ page }) => {
  await page.goto("/?transmission=manual&fuelType=benzin", {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });

  await expect(page.getByTestId("cars-heading")).toBeVisible();

  const cards = page.getByTestId("car-card");
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    await expect(cards.nth(index)).toContainText("Převodovka: Manuál");
    await expect(cards.nth(index)).toContainText("Palivo: Benzín");
  }

  await expect(page.getByRole("link", { name: "zrušit filter" })).toBeVisible();
  await page.getByRole("link", { name: "zrušit filter" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByTestId("car-card").first()).toBeVisible();
});
