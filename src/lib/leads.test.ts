import assert from "node:assert/strict";
import { test } from "node:test";
import { isFastSubmit, looksLikeSpam, MIN_FILL_MS, type LeadPayload } from "./leads";

const NOW = 1_000_000_000_000;

function lead(overrides: Partial<LeadPayload> = {}): LeadPayload {
  return {
    source: "demo",
    stage: "submitted",
    fullName: "Pat Example",
    email: "pat@example.com",
    company: "Example Co",
    interest: "carry",
    pagePath: "/demo",
    startedAt: NOW - 20_000,
    website: "",
    ...overrides,
  };
}

test("a normal submission is neither spam nor fast", () => {
  assert.equal(looksLikeSpam(lead()), false);
  assert.equal(isFastSubmit(lead(), NOW), false);
});

test("a filled honeypot is spam", () => {
  assert.equal(looksLikeSpam(lead({ website: "http://spam.example" })), true);
});

test("a missing start time (not our form) is spam", () => {
  assert.equal(looksLikeSpam(lead({ startedAt: 0 })), true);
});

test("a very fast submit is kept as a real lead, not spam", () => {
  const fast = lead({ startedAt: NOW - (MIN_FILL_MS - 500) });
  assert.equal(looksLikeSpam(fast), false);
});

test("a very fast submit is flagged for review", () => {
  const fast = lead({ startedAt: NOW - (MIN_FILL_MS - 500) });
  assert.equal(isFastSubmit(fast, NOW), true);
});

test("a visitor clock ahead of the server is not treated as spam or fast", () => {
  const skewed = lead({ startedAt: NOW + 5_000 });
  assert.equal(looksLikeSpam(skewed), false);
  assert.equal(isFastSubmit(skewed, NOW), false);
});
