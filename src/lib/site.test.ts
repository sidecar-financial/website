import assert from "node:assert/strict";
import { test } from "node:test";
import { SITE_URL, resolveMetadataBase } from "./site";

test("falls back to the canonical origin when no Vercel production URL is known", () => {
  assert.equal(resolveMetadataBase(undefined), SITE_URL);
  assert.equal(resolveMetadataBase(""), SITE_URL);
});

test("uses the canonical www origin once a navable.com domain is the production URL", () => {
  assert.equal(resolveMetadataBase("navable.com"), SITE_URL);
  assert.equal(resolveMetadataBase("www.navable.com"), SITE_URL);
});

test("uses the vercel.app production URL until the custom domain is live", () => {
  assert.equal(
    resolveMetadataBase("navable-website.vercel.app"),
    "https://navable-website.vercel.app",
  );
});

test("does not treat look-alike domains as navable.com", () => {
  assert.equal(
    resolveMetadataBase("notnavable.com"),
    "https://notnavable.com",
  );
});
