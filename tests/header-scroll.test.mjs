import assert from "node:assert/strict";
import { test } from "node:test";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)("playwright");

test("header border follows scrolling and reload returns to the top", async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [320, 390, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => {
        if (["error", "warning"].includes(message.type())) errors.push(message.text());
      });
      await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
      const checkTop = async () => {
        await page.waitForFunction(() => window.scrollY === 0 && document.querySelector(".site-header").dataset.scrolled === "false");
        assert.equal(await page.locator(".site-header").evaluate(el => getComputedStyle(el).borderBottomColor), "rgba(0, 0, 0, 0)");
      };
      await checkTop();
      const headerHeight = await page.locator(".site-header").evaluate(el => el.offsetHeight);
      await page.mouse.move(width / 2, 500);
      await page.mouse.wheel(0, 1);
      await page.waitForFunction(() => window.scrollY > 0 && document.querySelector(".site-header").dataset.scrolled === "true");
      assert.equal(await page.locator(".site-header").evaluate(el => getComputedStyle(el).borderBottomColor), "rgb(51, 51, 51)");
      assert.equal(await page.locator(".site-header").evaluate(el => el.offsetHeight), headerHeight);
      await page.mouse.wheel(0, 600);
      await page.waitForFunction(() => window.scrollY > 500);
      await page.reload({ waitUntil: "networkidle" });
      await checkTop();

      if (width < 768) await page.getByRole("button", { name: "Menu", exact: true }).click();
      await page.locator(width < 768 ? '#mobile-menu a[href="#about"]' : '.desktop-navigation a[href="#about"]').click();
      await page.waitForFunction(() => window.scrollY > 0);
      assert.equal(new URL(page.url()).hash, "#about");
      await page.reload({ waitUntil: "networkidle" });
      await checkTop();
      await page.mouse.wheel(0, 400);
      await page.waitForFunction(() => window.scrollY > 0);
      await page.keyboard.press("Control+Home");
      await checkTop();
      assert.deepEqual(errors, [], `${width}px: browser errors`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
