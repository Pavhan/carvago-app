import { expect, test, type Page } from "@playwright/test";

test.setTimeout(90_000);

async function setSelectValue(page: Page, fieldName: string, label: string) {
  await page.locator(`select[name="${fieldName}"]`).selectOption({ label });
}

test("deletes car from detail and car becomes unavailable", async ({ page }) => {
  const uniqueName = `E2E Delete ${Date.now()}`;

  await page.goto("/cars/new", {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });

  await page.getByRole("textbox", { name: /Název/ }).fill(uniqueName);
  await page
    .getByRole("textbox", { name: /URL obrázku/ })
    .fill("/images/cars/tesla-model3.avif");
  await setSelectValue(page, "transmission", "Automat");
  await setSelectValue(page, "fuelType", "Elektro");
  await page.getByRole("spinbutton", { name: /Cena/ }).fill("1450000");

  await page.getByRole("button", { name: "Uložit auto" }).click();
  await expect(page).toHaveURL(/\/cars\/.+\?created=1$/);

  const detailPath = new URL(page.url()).pathname;

  await page.getByRole("button", { name: "Smazat" }).click();
  await expect(page.getByText("Opravdu smazat auto?")).toBeVisible();
  await page.getByRole("button", { name: "Smazat auto" }).click();

  await expect(page).toHaveURL("/");

  await page.getByRole("textbox", { name: "Hledat auto" }).fill(uniqueName);
  await expect(page.getByText("Žádné výsledky")).toBeVisible();

  await page.goto(detailPath, {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });
  await expect(page.getByText("Auto se nenašlo")).toBeVisible();
});
