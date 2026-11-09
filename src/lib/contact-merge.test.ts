import assert from "node:assert/strict";
import { test } from "node:test";
import { fillBlankProperties } from "./contact-merge";

test("fills only the properties the existing contact has no value for", () => {
  const result = fillBlankProperties(
    { firstname: "Ashlyn", lastname: "", company: null },
    { firstname: "Someone", lastname: "Else", company: "New Co" },
  );
  assert.deepEqual(result, { lastname: "Else", company: "New Co" });
});

test("never overwrites a value that is already set", () => {
  const result = fillBlankProperties(
    { firstname: "Ashlyn", lastname: "Baum", company: "Test Request" },
    { firstname: "X", lastname: "Y", company: "Z" },
  );
  assert.deepEqual(result, {});
});

test("treats whitespace-only existing values as blank", () => {
  const result = fillBlankProperties({ company: "   " }, { company: "Acme" });
  assert.deepEqual(result, { company: "Acme" });
});

test("treats properties missing from the existing contact as blank", () => {
  const result = fillBlankProperties({}, { firstname: "Pat" });
  assert.deepEqual(result, { firstname: "Pat" });
});

test("skips incoming values that are empty", () => {
  const result = fillBlankProperties({ company: "" }, { company: "", firstname: "Pat" });
  assert.deepEqual(result, { firstname: "Pat" });
});
