import { expect, test, type Page } from "@playwright/test";

test.setTimeout(90_000);

async function setSelectValue(page: Page, fieldName: string, label: string) {
  await page.locator(`select[name="${fieldName}"]`).selectOption({ label });
}

test("create car validates and creates a new record", async ({ page }) => {
  const uniqueName = `E2E Create ${Date.now()}`;

  await page.goto("/cars/new", {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });

  await page.getByRole("button", { name: "Uložit auto" }).click();
  await expect(page.getByText("Název je povinný.").first()).toBeVisible();

  await page.getByRole("textbox", { name: /Název/ }).fill(uniqueName);
  await page
    .getByRole("textbox", { name: /URL obrázku/ })
    .fill("/images/cars/audi-a6-avant.avif");
  await setSelectValue(page, "transmission", "Automat");
  await setSelectValue(page, "fuelType", "Elektro");
  await page.getByRole("spinbutton", { name: /Cena/ }).fill("1234567");

  await page.getByRole("button", { name: "Uložit auto" }).click();

  await expect(page).toHaveURL(/\/cars\/.+\?created=1$/);
  await expect(page.getByTestId("car-title")).toContainText(uniqueName);
  await expect(page.getByTestId("car-price")).toContainText("1\u00a0234\u00a0567 Kč");

  await page.getByTestId("back-link").click();
  await expect(page).toHaveURL("/");
  await expect(
    page.getByTestId("car-title").filter({ hasText: uniqueName }),
  ).toBeVisible();
});
