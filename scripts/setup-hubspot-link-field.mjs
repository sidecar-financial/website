/**
 * One-time setup: adds a "HubSpot contact" URL property to the Notion Website Leads database, so each
 * lead row can link straight to that person's HubSpot contact record (and its associated company).
 * Safe to re-run: it only adds the property if it is missing and never touches other properties.
 *
 *   node --env-file=.env.local scripts/setup-hubspot-link-field.mjs
 *
 * If the integration is not allowed to edit the schema, add a "URL" property named exactly
 * "HubSpot contact" in Notion by hand instead. The site tolerates the column being absent.
 */

const { NOTION_API_KEY, NOTION_LEADS_DATABASE_ID } = process.env;

if (!NOTION_API_KEY || !NOTION_LEADS_DATABASE_ID) {
  console.log("Notion: skipped (not configured)");
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${NOTION_API_KEY}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};
const url = `https://api.notion.com/v1/databases/${NOTION_LEADS_DATABASE_ID}`;

const db = await (await fetch(url, { headers })).json();
if (db.object === "error") {
  console.log(`Notion: FAILED to read database: ${db.message}`);
  process.exit(1);
}
const existing = db.properties?.["HubSpot contact"];
if (existing) {
  console.log(`Notion: 'HubSpot contact' already exists (type ${existing.type})`);
  process.exit(existing.type === "url" ? 0 : 1);
}

const res = await fetch(url, {
  method: "PATCH",
  headers,
  body: JSON.stringify({ properties: { "HubSpot contact": { url: {} } } }),
});
const out = await res.json();
console.log(res.ok ? "Notion: added 'HubSpot contact' (URL)" : `Notion: FAILED to add 'HubSpot contact': ${out.code} ${out.message}`);
process.exit(res.ok ? 0 : 1);
