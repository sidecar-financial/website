/**
 * One-time setup for the "consent" fields that record whether a lead clicked submit.
 * Safe to re-run: it only adds what is missing.
 *
 *   node --env-file=.env.local scripts/setup-consent-fields.mjs
 *
 * Notion:  adds a "Consent" select (Not submitted / Submitted) to the Website Leads database.
 *          (The "Partial" Status option is created automatically the first time one is saved.)
 * HubSpot: nothing. Consent is not tracked in HubSpot; the lead status already separates real
 *          submissions (NEW) from half-finished forms (no status).
 */

const { NOTION_API_KEY, NOTION_LEADS_DATABASE_ID } = process.env;

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

await notionStep();
