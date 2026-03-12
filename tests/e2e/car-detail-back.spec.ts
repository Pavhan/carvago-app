import { expect, test } from "@playwright/test";

test("car detail back navigation", async ({ page }) => {
  await page.goto("/");

  // Ověř listing
  await expect(page.getByTestId("car-card").first()).toBeVisible();

  // Vyber konkrétní auto — ne první náhodné
  const firstCar = page.getByTestId("car-card").first();
  await expect(firstCar).toBeVisible();

  // Zapamatuj si název auta pro pozdější ověření
  const carTitle = await firstCar.getByTestId("car-title").textContent();
  if (!carTitle) {
    throw new Error(
      "Expected car title text to be present before opening detail.",
    );
  }

  // Přejdi na detail
  await firstCar.getByTestId("car-detail-link").click();

  // Ověř URL i obsah stránky
  await expect(page).toHaveURL(/\/cars\/.+/);
  await expect(page.getByTestId("car-title")).toContainText(carTitle);
  await expect(page.getByTestId("car-price")).toBeVisible();

  // Zpět na listing
  await page.getByTestId("back-link").click();

  // Ověř návrat
  await expect(page).toHaveURL("/");
  await expect(page.getByTestId("car-card").first()).toBeVisible();
});
