import assert from "node:assert/strict";
import { test } from "node:test";
import { pairPoints } from "./prize-particles.ts";

test("every source point gets a target, in reading order, and every target is used", () => {
  const sources = Array.from({ length: 10 }, (_, i) => [i, 0] as [number, number]);
  const targets: [number, number][] = [[0, 0], [0, 1], [0, 2]];
  const pairs = pairPoints(sources, targets);
  assert.equal(pairs.length, 10);
  assert.deepEqual(pairs[0][1], [0, 0]);
  assert.deepEqual(pairs[9][1], [0, 2]);
  assert.deepEqual(new Set(pairs.map(([, t]) => t[1])), new Set([0, 1, 2]));
  // Indices never decrease, so the top of the total lands on the top award.
  assert.ok(pairs.every(([, t], i) => i === 0 || t[1] >= pairs[i - 1][1][1]));
});

test("no targets means no particles", () => {
  assert.deepEqual(pairPoints([[1, 1]], []), []);
});
