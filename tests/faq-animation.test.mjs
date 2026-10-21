import assert from "node:assert/strict";
import { test } from "node:test";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)("playwright");

test("FAQ answers animate in both directions and remain independently keyboard accessible", async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [320, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
      const items = page.locator(".faq-list > *");
      const first = items.first();
      const trigger = first.locator("summary, button");
      const sampleHeights = () => first.evaluate(async element => {
        const animations = element.getAnimations({ subtree: true });
        const heights = [element.getBoundingClientRect().height];
        let finished = false;
        Promise.all(animations.map(animation => animation.finished.catch(() => {}))).then(() => { finished = true; });
        do {
          await new Promise(requestAnimationFrame);
          heights.push(element.getBoundingClientRect().height);
        } while (!finished);
        return { count: animations.length, heights };
      });
      const closedHeight = await first.evaluate(element => element.getBoundingClientRect().height);
      await trigger.click();
      const opening = await sampleHeights();
      assert.ok(opening.count > 0, "opening runs a transition");
      const openHeight = opening.heights.at(-1);
      assert.ok(opening.heights.some(height => height > closedHeight && height < openHeight), "opening passes through intermediate heights");
      await items.nth(1).locator("summary, button").click();
      assert.equal(await trigger.getAttribute("aria-expanded"), "true", "opening another answer keeps the first open");
      await trigger.focus();
      await page.keyboard.press("Space");
      const closing = await sampleHeights();
      assert.ok(closing.count > 0, "closing runs a transition");
      assert.ok(closing.heights.some(height => height > closedHeight && height < openHeight), "closing passes through intermediate heights");
      assert.equal(closing.heights.at(-1), closedHeight);
      assert.equal(await trigger.getAttribute("aria-expanded"), "false");
      assert.equal(await first.locator(".faq-content").evaluate(element => element.inert), true);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.keyboard.press("Enter");
      assert.equal(await trigger.getAttribute("aria-expanded"), "true");
      assert.equal(await first.evaluate(element => element.getAnimations({ subtree: true }).length), 0);
      await page.keyboard.press("Enter");
      assert.equal(await first.evaluate(element => element.getBoundingClientRect().height), closedHeight);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      assert.deepEqual(errors, []);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
