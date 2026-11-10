import assert from "node:assert/strict";
import test from "node:test";
import { CUSTOMER_QUOTE, quoteFor, solutionPages, splitQuote } from "./data";

test("pages without a quote override use the shared customer quote", () => {
  const keys = Object.keys(solutionPages).filter((key) => key !== "co-invest");
  assert.ok(keys.length > 0);
  for (const key of keys) {
    const page = solutionPages[key as keyof typeof solutionPages];
    assert.equal(page.quote, undefined, key);
    assert.equal("featured" in quoteFor(page), false, key);
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
    featured: true,
    emphasis: ["dramatically improved the employee user experience", "We want to make it easy for them."],
  });
});

test("only the co-invest quote opts into the featured treatment", () => {
  const featured = Object.entries(solutionPages)
    .filter(([, page]) => quoteFor(page).featured)
    .map(([key]) => key);
  assert.deepEqual(featured, ["co-invest"]);
});

test("co-invest emphasis phrases all occur in the quote and splitting preserves the exact text", () => {
  const { quote, emphasis = [] } = quoteFor(solutionPages["co-invest"]);
  assert.equal(emphasis.length, 2);
  const segments = splitQuote(quote, emphasis);
  assert.equal(segments.map((s) => s.text).join(""), quote);
  assert.deepEqual(
    segments.filter((s) => s.emphasis).map((s) => s.text),
    emphasis,
  );
});

test("splitQuote keeps text intact for no, unknown, repeated and overlapping emphasis", () => {
  const text = "one two three two";
  assert.deepEqual(splitQuote(text), [{ text, emphasis: false }]);
  assert.deepEqual(splitQuote(text, ["missing", ""]), [{ text, emphasis: false }]);
  assert.deepEqual(splitQuote(text, ["three", "two"]), [
    { text: "one ", emphasis: false },
    { text: "two", emphasis: true },
    { text: " ", emphasis: false },
    { text: "three", emphasis: true },
    { text: " two", emphasis: false },
  ]);
  // an overlapping later phrase is dropped rather than duplicating text
  const joined = splitQuote(text, ["two three", "three two"]).map((s) => s.text).join("");
  assert.equal(joined, text);
  // phrases at the very start and end
  assert.deepEqual(splitQuote("ab cd", ["ab", "cd"]), [
    { text: "ab", emphasis: true },
    { text: " ", emphasis: false },
    { text: "cd", emphasis: true },
  ]);
});
