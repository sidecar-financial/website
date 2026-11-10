import assert from "node:assert/strict";
import { test } from "node:test";
import {
  DEFAULT_HUBSPOT_PORTAL_ID,
  hubspotContactUrl,
  hubspotLinkProperty,
  hubspotPortalId,
  isMissingLinkPropertyError,
  linkNotionRowToHubSpot,
} from "./hubspot-link";

test("builds the contact record URL with the default portal id", () => {
  assert.equal(DEFAULT_HUBSPOT_PORTAL_ID, "43584751");
  assert.equal(hubspotContactUrl("12345"), "https://app.hubspot.com/contacts/43584751/record/0-1/12345");
});

test("uses a configured portal id", () => {
  assert.equal(hubspotContactUrl("12345", "999"), "https://app.hubspot.com/contacts/999/record/0-1/12345");
});

test("portal id comes from env, trimmed, falling back to the default when unset or blank", () => {
  assert.equal(hubspotPortalId({ HUBSPOT_PORTAL_ID: " 111 " }), "111");
  assert.equal(hubspotPortalId({ HUBSPOT_PORTAL_ID: "  " }), "43584751");
  assert.equal(hubspotPortalId({}), "43584751");
});

test("rejects contact ids that are not plain numbers", () => {
  assert.equal(hubspotContactUrl(""), null);
  assert.equal(hubspotContactUrl("12/../3"), null);
  assert.equal(hubspotContactUrl("abc"), null);
});

test("rejects a malformed portal id rather than building a bad link", () => {
  assert.equal(hubspotContactUrl("1", "not-a-number"), null);
});

test("the Notion property payload is a url property named 'HubSpot contact'", () => {
  assert.deepEqual(hubspotLinkProperty("https://app.hubspot.com/contacts/1/record/0-1/2"), {
    "HubSpot contact": { url: "https://app.hubspot.com/contacts/1/record/0-1/2" },
  });
});

test("recognises Notion's missing-property validation error", () => {
  assert.equal(
    isMissingLinkPropertyError(new Error("Notion PATCH /pages/x -> 400 {\"message\":\"HubSpot contact is not a property that exists.\"}")),
    true,
  );
  assert.equal(isMissingLinkPropertyError(new Error("Notion PATCH /pages/x -> 500 boom")), false);
});

function recorder(fail?: Error) {
  const calls: { pageId: string; properties: unknown }[] = [];
  return {
    calls,
    write: async (pageId: string, properties: unknown) => {
      calls.push({ pageId, properties });
      if (fail) throw fail;
    },
  };
}

const base = { spam: false, contactId: "777", pageId: "page-1" };

test("writes the link when both the HubSpot contact id and the Notion page id are known", async () => {
  const r = recorder();
  const out = await linkNotionRowToHubSpot({ ...base, write: r.write });
  assert.deepEqual(out, { status: "linked", url: "https://app.hubspot.com/contacts/43584751/record/0-1/777" });
  assert.deepEqual(r.calls, [
    { pageId: "page-1", properties: { "HubSpot contact": { url: "https://app.hubspot.com/contacts/43584751/record/0-1/777" } } },
  ]);
});

test("uses the configured portal id", async () => {
  const r = recorder();
  const out = await linkNotionRowToHubSpot({ ...base, portalId: "42", write: r.write });
  assert.equal(out.status, "linked");
  assert.deepEqual(r.calls[0].properties, { "HubSpot contact": { url: "https://app.hubspot.com/contacts/42/record/0-1/777" } });
});

test("no link when the HubSpot contact id is missing (HubSpot failed or off)", async () => {
  const r = recorder();
  const out = await linkNotionRowToHubSpot({ ...base, contactId: undefined, write: r.write });
  assert.equal(out.status, "skipped");
  assert.equal(r.calls.length, 0);
});

test("no link when the Notion page id is missing (Notion failed or off)", async () => {
  const r = recorder();
  const out = await linkNotionRowToHubSpot({ ...base, pageId: undefined, write: r.write });
  assert.equal(out.status, "skipped");
  assert.equal(r.calls.length, 0);
});

test("no link for spam", async () => {
  const r = recorder();
  const out = await linkNotionRowToHubSpot({ ...base, spam: true, write: r.write });
  assert.equal(out.status, "skipped");
  assert.equal(r.calls.length, 0);
});

test("a Notion failure does not throw and is reported as failed", async () => {
  const r = recorder(new Error("Notion PATCH /pages/page-1 -> 502 bad gateway"));
  const out = await linkNotionRowToHubSpot({ ...base, write: r.write });
  assert.equal(out.status, "failed");
});

test("a missing 'HubSpot contact' column is reported as missing-property, not a failure, and does not throw", async () => {
  const r = recorder(new Error("Notion PATCH /pages/page-1 -> 400 HubSpot contact is not a property that exists."));
  const out = await linkNotionRowToHubSpot({ ...base, write: r.write });
  assert.equal(out.status, "missing-property");
});

test("an invalid contact id is skipped rather than written", async () => {
  const r = recorder();
  const out = await linkNotionRowToHubSpot({ ...base, contactId: "oops", write: r.write });
  assert.equal(out.status, "skipped");
  assert.equal(r.calls.length, 0);
});
