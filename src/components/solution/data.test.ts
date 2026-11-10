import assert from "node:assert/strict";
import test from "node:test";
import { CUSTOMER_QUOTE, quoteFor, solutionPages } from "./data";

test("pages without a quote override use the shared customer quote", () => {
  const keys = Object.keys(solutionPages).filter((key) => key !== "co-invest");
  assert.ok(keys.length > 0);
  for (const key of keys) {
    const page = solutionPages[key as keyof typeof solutionPages];
    assert.equal(page.quote, undefined, key);
    assert.deepEqual(quoteFor(page), {
      quote: CUSTOMER_QUOTE.quote,
      attribution: [CUSTOMER_QUOTE.attribution],
    });
  }
});

test("employee co-invest shows the LaSalle quote verbatim", () => {
  assert.deepEqual(quoteFor(solutionPages["co-invest"]), {
    quote:
      "Navable has really helped us stay organized and efficient in administering the program. Just as importantly, it has dramatically improved the employee user experience by replacing a cumbersome manual process with a relatively simple digital process in an intuitive user interface…. We want to make it easy for them. That was really important",
    attribution: ["Tim Kessler", "President and COO, LaSalle Investment Management"],
  });
});
