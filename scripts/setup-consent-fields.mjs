/**
 * One-time setup for the "consent" fields that record whether a lead clicked submit.
 * Safe to re-run: it only adds what is missing.
 *
 *   node --env-file=.env.local scripts/setup-consent-fields.mjs
 *
 * Notion:  adds a "Consent" select (Not submitted / Submitted) to the Website Leads database.
 *          (The "Partial" Status option is created automatically the first time one is saved.)
 * HubSpot: adds a "Website form consent" contact property (needs scope crm.schemas.contacts.write).
 */

const { NOTION_API_KEY, NOTION_LEADS_DATABASE_ID, HUBSPOT_PRIVATE_APP_TOKEN } = process.env;

async function notionStep() {
  if (!NOTION_API_KEY || !NOTION_LEADS_DATABASE_ID) return console.log("Notion: skipped (not configured)");
  const headers = {
    Authorization: `Bearer ${NOTION_API_KEY}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  };
  const url = `https://api.notion.com/v1/databases/${NOTION_LEADS_DATABASE_ID}`;
  const db = await (await fetch(url, { headers })).json();
  if (db.object === "error") return console.log(`Notion: FAILED to read database: ${db.message}`);
  if (db.properties?.Consent) return console.log("Notion: 'Consent' already exists");

  const res = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        Consent: { select: { options: [{ name: "Not submitted", color: "gray" }, { name: "Submitted", color: "green" }] } },
      },
    }),
  });
  const out = await res.json();
  console.log(res.ok ? "Notion: added 'Consent'" : `Notion: FAILED to add 'Consent': ${out.message}`);
}

async function hubspotStep() {
  if (!HUBSPOT_PRIVATE_APP_TOKEN) return console.log("HubSpot: skipped (not configured)");
  const res = await fetch("https://api.hubapi.com/crm/v3/properties/contacts", {
    method: "POST",
    headers: { Authorization: `Bearer ${HUBSPOT_PRIVATE_APP_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "website_form_consent",
      label: "Website form consent",
      description: "Whether the contact clicked submit on the website demo form, or was saved from a half-finished form.",
      groupName: "contactinformation",
      type: "enumeration",
      fieldType: "select",
      options: [
        { label: "Not submitted", value: "not_submitted", displayOrder: 0, hidden: false },
        { label: "Submitted", value: "submitted", displayOrder: 1, hidden: false },
      ],
    }),
  });
  const out = await res.json().catch(() => ({}));
  if (res.ok) return console.log("HubSpot: added 'website_form_consent'");
  if (res.status === 409) return console.log("HubSpot: 'website_form_consent' already exists");
  console.log(`HubSpot: FAILED (${res.status}): ${out.message ?? "unknown error"}`);
}

await notionStep();
await hubspotStep();
