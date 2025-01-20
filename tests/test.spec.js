const { test, expect } = require("@playwright/test");
const { email, password, incorrectEmail, incorrectPassword } = require("../user.js");

test("Successfull authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  const actual = await page.locator('[/profile/9205351]');
  const expected = "Моё обучение";
  { timeout: 70000};
});

test("Unsuccessfull authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(incorrectEmail);
  await page.getByPlaceholder("Пароль").fill(incorrectPassword);
  await page.getByTestId("login-submit-btn").click();
  const actual = await page.locator('[data-testid="login-error-hint"]');
  const expected = "Вы ввели неправильно логин или пароль.";
  await expect(actual).toHaveText(expected);
});