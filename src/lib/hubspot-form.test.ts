import assert from "node:assert/strict";
import { test } from "node:test";
import type { LeadPayload } from "./leads";
import {
  buildDemoFormSubmission,
  buildWaitlistFormSubmission,
  demoFormConfig,
  formTargetForLead,
  submitDemoForm,
  submitWaitlistForm,
  waitlistFormConfig,
  type DemoFormConfig,
} from "./hubspot-form";

const CONFIG: DemoFormConfig = { portalId: "43584751", formGuid: "39a9aac0-d014-4ad5-b74d-1ba7038c730d" };

function lead(overrides: Partial<LeadPayload> = {}): LeadPayload {
  return {
    source: "demo",
    stage: "submitted",
    fullName: "Pat Q Public",
    email: "pat@example.com",
    company: "Acme Capital",
    interest: "carry",
    pagePath: "/about",
    startedAt: 1,
    website: "",
    ...overrides,
  };
}

const SITE = "https://www.navable.com";

test("maps a demo lead to the form's email, firstname, lastname and company fields", () => {
  const out = buildDemoFormSubmission(lead(), { siteUrl: SITE });
  assert.ok(out.ok);
  assert.deepEqual(out.body.fields, [
    { name: "email", value: "pat@example.com" },
    { name: "firstname", value: "Pat" },
    { name: "lastname", value: "Q Public" },
    { name: "company", value: "Acme Capital" },
  ]);
});

test("does not send fields the form does not have (interest) or consent options", () => {
  const out = buildDemoFormSubmission(lead({ interest: "waterfall" }), { siteUrl: SITE });
  assert.ok(out.ok);
  assert.deepEqual(out.body.fields.map((f) => f.name), ["email", "firstname", "lastname", "company"]);
  assert.equal("legalConsentOptions" in out.body, false);
});

test("sets pageUri from the site URL and the lead's page path", () => {
  const out = buildDemoFormSubmission(lead({ pagePath: "/about" }), { siteUrl: SITE });
  assert.ok(out.ok);
  assert.deepEqual(out.body.context, { pageUri: "https://www.navable.com/about", pageName: "Request a demo" });
});

test("a missing page path falls back to the site root", () => {
  const out = buildDemoFormSubmission(lead({ pagePath: "" }), { siteUrl: SITE });
  assert.ok(out.ok);
  assert.equal(out.body.context.pageUri, "https://www.navable.com/");
});

test("a repeat submit from an existing contact never overwrites values already in HubSpot", () => {
  const out = buildDemoFormSubmission(lead(), {
    siteUrl: SITE,
    existing: { firstname: "Patricia", lastname: "Public", company: "Old Co" },
  });
  assert.ok(out.ok);
  assert.deepEqual(out.body.fields, [
    { name: "email", value: "pat@example.com" },
    { name: "firstname", value: "Patricia" },
    { name: "lastname", value: "Public" },
    { name: "company", value: "Old Co" },
  ]);
});

test("existing contact with blank values gets the typed ones", () => {
  const out = buildDemoFormSubmission(lead(), {
    siteUrl: SITE,
    existing: { firstname: "Patricia", lastname: "  ", company: null },
  });
  assert.ok(out.ok);
  assert.deepEqual(out.body.fields, [
    { name: "email", value: "pat@example.com" },
    { name: "firstname", value: "Patricia" },
    { name: "lastname", value: "Q Public" },
    { name: "company", value: "Acme Capital" },
  ]);
});

test("a one-word name is skipped: the form requires a last name and we will not invent one", () => {
  const out = buildDemoFormSubmission(lead({ fullName: "Madonna" }), { siteUrl: SITE });
  assert.equal(out.ok, false);
  assert.ok(!out.ok && /last name/i.test(out.reason));
});

test("a one-word name is fine when the existing contact already has a last name", () => {
  const out = buildDemoFormSubmission(lead({ fullName: "Madonna" }), {
    siteUrl: SITE,
    existing: { lastname: "Ciccone" },
  });
  assert.ok(out.ok);
  assert.deepEqual(out.body.fields.find((f) => f.name === "lastname"), { name: "lastname", value: "Ciccone" });
});

test("the demo form builder never takes a waitlist signup: it has no name or company, which the demo form requires", () => {
  const out = buildDemoFormSubmission(
    lead({ source: "waterfall-waitlist", fullName: "", company: "", interest: "waterfall" }),
    { siteUrl: SITE },
  );
  assert.equal(out.ok, false);
  assert.ok(!out.ok && /waitlist/i.test(out.reason));
});

test("partial (not yet submitted) leads are never sent to the form", () => {
  const out = buildDemoFormSubmission(lead({ stage: "partial", company: "" }), { siteUrl: SITE });
  assert.equal(out.ok, false);
  assert.ok(!out.ok && /partial/i.test(out.reason));
});

test("a demo lead with no company is skipped rather than sent half-empty", () => {
  const out = buildDemoFormSubmission(lead({ company: "" }), { siteUrl: SITE });
  assert.equal(out.ok, false);
});

test("config is null (no-op) when the form GUID is unset or blank", () => {
  assert.equal(demoFormConfig({}), null);
  assert.equal(demoFormConfig({ HUBSPOT_DEMO_FORM_GUID: "  " }), null);
});

test("config reads the GUID and portal from env, with the Navable portal as default", () => {
  assert.deepEqual(demoFormConfig({ HUBSPOT_DEMO_FORM_GUID: "abc" }), { portalId: "43584751", formGuid: "abc" });
  assert.deepEqual(demoFormConfig({ HUBSPOT_DEMO_FORM_GUID: "abc", HUBSPOT_PORTAL_ID: "999" }), {
    portalId: "999",
    formGuid: "abc",
  });
});

test("submitDemoForm POSTs the payload to the Forms API submit endpoint", async () => {
  const calls: { url: string; init: RequestInit }[] = [];
  const fetchStub = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify({ inlineMessage: "ok" }), { status: 200 });
  }) as unknown as typeof fetch;
  const result = await submitDemoForm(CONFIG, lead(), { siteUrl: SITE, fetchImpl: fetchStub });
  assert.deepEqual(result, { submitted: true });
  assert.equal(
    calls[0].url,
    "https://api.hsforms.com/submissions/v3/integration/submit/43584751/39a9aac0-d014-4ad5-b74d-1ba7038c730d",
  );
  assert.equal(calls[0].init.method, "POST");
  const sent = JSON.parse(calls[0].init.body as string);
  assert.equal(sent.fields[0].name, "email");
});

test("submitDemoForm does not call HubSpot for skipped leads", async () => {
  let called = false;
  const fetchStub = (async () => {
    called = true;
    return new Response("{}", { status: 200 });
  }) as unknown as typeof fetch;
  const result = await submitDemoForm(CONFIG, lead({ source: "waterfall-waitlist", fullName: "", company: "" }), {
    siteUrl: SITE,
    fetchImpl: fetchStub,
  });
  assert.equal(result.submitted, false);
  assert.equal(called, false);
});

test("submitDemoForm throws with the HubSpot status and message when the API rejects the submission", async () => {
  const fetchStub = (async () =>
    new Response(JSON.stringify({ message: "Invalid", errors: [{ errorType: "INVALID_EMAIL" }] }), {
      status: 400,
    })) as unknown as typeof fetch;
  await assert.rejects(
    submitDemoForm(CONFIG, lead(), { siteUrl: SITE, fetchImpl: fetchStub }),
    /400[\s\S]*INVALID_EMAIL/,
  );
});

// ---- Waterfall waitlist form ----

const WAITLIST_CONFIG: DemoFormConfig = { portalId: "43584751", formGuid: "698ed474-8143-4cb4-8b8b-184d18b30971" };

function waitlistLead(overrides: Partial<LeadPayload> = {}): LeadPayload {
  return lead({
    source: "waterfall-waitlist",
    fullName: "",
    company: "",
    interest: "waterfall",
    pagePath: "/waterfall",
    ...overrides,
  });
}

test("waitlist builder sends only the email field", () => {
  const out = buildWaitlistFormSubmission(waitlistLead(), { siteUrl: SITE });
  assert.ok(out.ok);
  assert.deepEqual(out.body.fields, [{ name: "email", value: "pat@example.com" }]);
  assert.equal("legalConsentOptions" in out.body, false);
});

test("waitlist builder ignores any name or company on the lead (never overwrites contact data)", () => {
  const out = buildWaitlistFormSubmission(waitlistLead({ fullName: "Pat Public", company: "Acme" }), {
    siteUrl: SITE,
  });
  assert.ok(out.ok);
  assert.deepEqual(out.body.fields, [{ name: "email", value: "pat@example.com" }]);
});

test("waitlist builder sets pageUri from the site URL and page path, with a Waterfall waitlist page name", () => {
  const out = buildWaitlistFormSubmission(waitlistLead({ pagePath: "/waterfall" }), { siteUrl: `${SITE}/` });
  assert.ok(out.ok);
  assert.deepEqual(out.body.context, { pageUri: "https://www.navable.com/waterfall", pageName: "Waterfall waitlist" });
  const bare = buildWaitlistFormSubmission(waitlistLead({ pagePath: "" }), { siteUrl: SITE });
  assert.ok(bare.ok);
  assert.equal(bare.body.context.pageUri, "https://www.navable.com/");
});

test("waitlist builder skips partial leads and demo leads", () => {
  const partial = buildWaitlistFormSubmission(waitlistLead({ stage: "partial" }), { siteUrl: SITE });
  assert.ok(!partial.ok && /partial/i.test(partial.reason));
  const demo = buildWaitlistFormSubmission(lead(), { siteUrl: SITE });
  assert.ok(!demo.ok && /not a waitlist/i.test(demo.reason));
});

test("a one-word name or missing company does not affect the waitlist submission", () => {
  const out = buildWaitlistFormSubmission(waitlistLead({ fullName: "Madonna", company: "" }), { siteUrl: SITE });
  assert.ok(out.ok);
  assert.deepEqual(out.body.fields, [{ name: "email", value: "pat@example.com" }]);
});

test("waitlist config is null (no-op) when HUBSPOT_WAITLIST_FORM_GUID is unset or blank, even if the demo one is set", () => {
  assert.equal(waitlistFormConfig({}), null);
  assert.equal(waitlistFormConfig({ HUBSPOT_WAITLIST_FORM_GUID: "  " }), null);
  assert.equal(waitlistFormConfig({ HUBSPOT_DEMO_FORM_GUID: "demo-guid" }), null);
});

test("waitlist config reads its own GUID, with the Navable portal as default and HUBSPOT_PORTAL_ID override", () => {
  assert.deepEqual(waitlistFormConfig({ HUBSPOT_WAITLIST_FORM_GUID: "wl" }), { portalId: "43584751", formGuid: "wl" });
  assert.deepEqual(waitlistFormConfig({ HUBSPOT_WAITLIST_FORM_GUID: "wl", HUBSPOT_PORTAL_ID: "999" }), {
    portalId: "999",
    formGuid: "wl",
  });
});

test("routing: waitlist leads go to the waitlist form, demo leads to the demo form", () => {
  const env = { HUBSPOT_DEMO_FORM_GUID: "demo-guid", HUBSPOT_WAITLIST_FORM_GUID: "wl-guid" };
  assert.deepEqual(formTargetForLead(waitlistLead(), env), {
    kind: "waitlist",
    config: { portalId: "43584751", formGuid: "wl-guid" },
  });
  assert.deepEqual(formTargetForLead(lead(), env), {
    kind: "demo",
    config: { portalId: "43584751", formGuid: "demo-guid" },
  });
});

test("routing: no target when the matching env var is unset (the other form's var does not count)", () => {
  assert.equal(formTargetForLead(waitlistLead(), { HUBSPOT_DEMO_FORM_GUID: "demo-guid" }), null);
  assert.equal(formTargetForLead(lead(), { HUBSPOT_WAITLIST_FORM_GUID: "wl-guid" }), null);
  assert.equal(formTargetForLead(lead(), {}), null);
});

test("routing: partial leads never get a form target", () => {
  const env = { HUBSPOT_DEMO_FORM_GUID: "demo-guid", HUBSPOT_WAITLIST_FORM_GUID: "wl-guid" };
  assert.equal(formTargetForLead(lead({ stage: "partial" }), env), null);
  assert.equal(formTargetForLead(waitlistLead({ stage: "partial" }), env), null);
});

test("submitWaitlistForm POSTs only the email to the waitlist form's submit endpoint", async () => {
  const calls: { url: string; init: RequestInit }[] = [];
  const fetchStub = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify({ inlineMessage: "ok" }), { status: 200 });
  }) as unknown as typeof fetch;
  const result = await submitWaitlistForm(WAITLIST_CONFIG, waitlistLead(), { siteUrl: SITE, fetchImpl: fetchStub });
  assert.deepEqual(result, { submitted: true });
  assert.equal(
    calls[0].url,
    "https://api.hsforms.com/submissions/v3/integration/submit/43584751/698ed474-8143-4cb4-8b8b-184d18b30971",
  );
  assert.equal(calls[0].init.method, "POST");
  assert.deepEqual(JSON.parse(calls[0].init.body as string).fields, [{ name: "email", value: "pat@example.com" }]);
});

test("submitWaitlistForm does not call HubSpot for partial or demo leads", async () => {
  let called = false;
  const fetchStub = (async () => {
    called = true;
    return new Response("{}", { status: 200 });
  }) as unknown as typeof fetch;
  const a = await submitWaitlistForm(WAITLIST_CONFIG, waitlistLead({ stage: "partial" }), {
    siteUrl: SITE,
    fetchImpl: fetchStub,
  });
  const b = await submitWaitlistForm(WAITLIST_CONFIG, lead(), { siteUrl: SITE, fetchImpl: fetchStub });
  assert.equal(a.submitted, false);
  assert.equal(b.submitted, false);
  assert.equal(called, false);
});

test("submitWaitlistForm throws with the HubSpot status and message when the API rejects the submission", async () => {
  const fetchStub = (async () =>
    new Response(JSON.stringify({ message: "Invalid", errors: [{ errorType: "INVALID_EMAIL" }] }), {
      status: 400,
    })) as unknown as typeof fetch;
  await assert.rejects(
    submitWaitlistForm(WAITLIST_CONFIG, waitlistLead(), { siteUrl: SITE, fetchImpl: fetchStub }),
    /400[\s\S]*INVALID_EMAIL/,
  );
});
