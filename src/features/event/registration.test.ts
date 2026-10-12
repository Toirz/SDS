import assert from "node:assert/strict";
import { test } from "node:test";
import { getRegistrationState } from "./registration.ts";
import { event, formatEventDate } from "./config.ts";

test("unavailable registration never links, even with a URL", () => {
  for (const registrationUrl of [null, "https://example.com/register"]) {
    assert.deepEqual(getRegistrationState({ registrationStatus: "unavailable", registrationUrl }), {
      label: "Registration unavailable", href: null,
    });
  }
});

test("closed status takes priority over a missing or valid URL", () => {
  for (const registrationUrl of [null, "https://example.com/register"]) {
    assert.deepEqual(getRegistrationState({ registrationStatus: "closed", registrationUrl }), {
      label: "Registration closed", href: null,
    });
  }
});

test("open registration accepts absolute HTTP(S) destinations", () => {
  for (const registrationUrl of ["https://example.com/register?event=sds", "http://example.com/register"]) {
    assert.deepEqual(getRegistrationState({ registrationStatus: "open", registrationUrl }), {
      label: "Register now", href: registrationUrl,
    });
  }
});

test("open registration fails safely for missing, malformed or unsafe destinations", () => {
  for (const registrationUrl of [null, "", " ", "#", "/register", "//example.com", "not a URL", "https://", "https:example.com", "javascript:alert(1)", "data:text/html,hello", "ftp://example.com"]) {
    assert.deepEqual(getRegistrationState({ registrationStatus: "open", registrationUrl }), {
      label: "Registration unavailable", href: null,
    });
  }
});

test("date-only event values retain the supplied dates across server timezones", () => {
  const originalTimezone = process.env.TZ;
  try {
    for (const timezone of ["Pacific/Honolulu", "Asia/Singapore", "Pacific/Kiritimati"]) {
      process.env.TZ = timezone;
      assert.equal(formatEventDate(event.dates.start), "17 January 2026");
      assert.equal(formatEventDate(event.dates.end), "7 February 2026");
      assert.equal(formatEventDate(event.dates.registrationDeadline), "14 January 2026");
    }
  } finally {
    if (originalTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = originalTimezone;
  }
});
