import assert from "node:assert/strict";
import { test } from "node:test";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)("playwright");

test("hero caret follows typed text, year highlights after typing and cursor disappears", async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    const heading = page.getByRole("heading", { level: 1, name: "NUS SDS Datathon 2027", exact: true });
    const before = await heading.boundingBox();
    const year = heading.locator(".hero-year");
    const scale = () => year.evaluate(element => new DOMMatrix(getComputedStyle(element, "::after").transform).a);
    assert.equal(await scale(), 0, "highlight is hidden before typing finishes");
    await page.waitForFunction(() => document.querySelectorAll(".hero-typed-line")[1].textContent.length >= 3);
    const caret = await page.locator(".typing-cursor").evaluate(element => {
      const range = document.createRange();
      range.selectNodeContents(element.previousSibling);
      const text = range.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      return { x: rect.x, textEnd: text.right, height: rect.height, textHeight: text.height };
    });
    assert.ok(Math.abs(caret.x - caret.textEnd) < 1, "caret is immediately after the visible text");
    assert.ok(caret.height > 0 && caret.height < caret.textHeight, "caret matches the capital letter height");
    await page.waitForFunction(() => document.querySelector(".hero-year .hero-typed-line").textContent.length > 0);
    assert.equal(await scale(), 0, "year is typed before its highlight starts");
    await page.waitForFunction(() => document.querySelector(".hero-year").dataset.complete === "true");
    assert.deepEqual(await heading.locator(".hero-typed-line").allTextContents(), ["NUS SDS", "Datathon", "2027"]);
    assert.equal(await heading.textContent(), "NUS SDS Datathon 2027");
    await page.waitForFunction(() => {
      const scale = new DOMMatrix(getComputedStyle(document.querySelector(".hero-year"), "::after").transform).a;
      return scale > 0 && scale < 1;
    });
    assert.equal(await year.evaluate(element => getComputedStyle(element, "::after").transformOrigin.split(" ")[0]), "0px");
    await page.waitForFunction(() => new DOMMatrix(getComputedStyle(document.querySelector(".hero-year"), "::after").transform).a >= 0.999);
    await page.waitForFunction(() => !document.querySelector(".typing-cursor"));
    assert.deepEqual(await heading.boundingBox(), before, "typing reserves the title layout");
    assert.equal(await year.evaluate(element => getComputedStyle(element, "::after").backgroundColor), "rgb(40, 35, 13)");
    assert.ok((await page.locator(".hero-actions").boundingBox()).y - (before.y + before.height) >= 47.9);
    const facts = await page.locator(".hero-facts").boundingBox();
    assert.ok(facts.y + facts.height <= 844, "dates and people fit on the first screen");
    assert.ok((await page.locator("#about").boundingBox()).y >= 844, "the next section stays below the first screen");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload({ waitUntil: "domcontentloaded" });
    assert.equal(await year.evaluate(element => getComputedStyle(element, "::before").visibility), "visible");
    assert.equal(await year.locator(".hero-typed-line").evaluate(element => getComputedStyle(element).visibility), "hidden");
    assert.equal(await scale(), 1, "reduced motion reveals the complete highlight immediately");
  } finally {
    await browser.close();
  }
});
