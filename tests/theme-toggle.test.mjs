import assert from "node:assert/strict";
import { test } from "node:test";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)("playwright");

test("header theme switch restores both palettes and remembers the choice before hydration", async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      if (["error", "warning"].includes(message.type())) errors.push(message.text());
    });
    const checkPalette = async theme => {
      const actual = await page.evaluate(() => {
        const color = (selector, property, pseudo) => getComputedStyle(document.querySelector(selector), pseudo)[property];
        return [color("body", "backgroundColor"), color("body", "color"), color(".hero-year", "backgroundColor", "::after"), color(".prizes-inner", "backgroundColor")];
      });
      assert.deepEqual(actual, theme === "dark"
        ? ["rgb(10, 13, 20)", "rgb(255, 255, 255)", "rgb(40, 35, 13)", "rgb(40, 35, 13)"]
        : ["rgb(255, 255, 255)", "rgb(17, 17, 17)", "rgb(255, 223, 87)", "rgb(255, 223, 87)"]);
    };
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
      await checkPalette("dark");
      const lightSwitch = page.getByRole("button", { name: "Switch to light theme", exact: true });
      await lightSwitch.waitFor({ state: "visible", timeout: 1500 });
      assert.ok((await lightSwitch.boundingBox()).width >= 44);
      await lightSwitch.focus();
      await page.keyboard.press("Enter");
      await checkPalette("light");
      assert.equal(await page.getByRole("button", { name: "Switch to dark theme", exact: true }).count(), 1);
      await page.route("**/*.js", route => route.fulfill({ contentType: "application/javascript", body: "" }));
      await page.reload({ waitUntil: "domcontentloaded" });
      await checkPalette("light");
      await page.unroute("**/*.js");
      await page.reload({ waitUntil: "networkidle" });
      await checkPalette("light");
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}px: no horizontal overflow`);
      if (width < 768) {
        await page.getByRole("button", { name: "Menu", exact: true }).click();
        assert.equal(await page.locator("#mobile-menu").evaluate(el => getComputedStyle(el).backgroundColor), "rgb(255, 255, 255)");
        await page.keyboard.press("Escape");
      }
      await page.getByRole("button", { name: "Switch to dark theme", exact: true }).click();
      await checkPalette("dark");
      await page.reload({ waitUntil: "networkidle" });
      await checkPalette("dark");
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});

test("theme switch works when browser storage is unavailable", async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage blocked", "SecurityError"); } });
    });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Switch to light theme", exact: true }).click({ timeout: 1500 });
    assert.equal(await page.locator("body").evaluate(el => getComputedStyle(el).backgroundColor), "rgb(255, 255, 255)");
    await page.getByRole("button", { name: "Switch to dark theme", exact: true }).click();
    assert.equal(await page.locator("body").evaluate(el => getComputedStyle(el).backgroundColor), "rgb(10, 13, 20)");
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
