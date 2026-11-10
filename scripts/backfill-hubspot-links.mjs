/**
 * One-off backfill: fills the "HubSpot contact" link on existing Notion Website Leads rows that have an
 * email but no link yet, by looking the contact up in HubSpot by email.
 *
 *   node --env-file=.env.local scripts/backfill-hubspot-links.mjs            # dry run (default): prints counts only
 *   node --env-file=.env.local scripts/backfill-hubspot-links.mjs --apply    # writes the links
 *
 * Only ever writes the "HubSpot contact" property on Notion rows. Reads HubSpot (contact search by
 * email); never creates, updates or deletes anything in HubSpot. Rows whose email has no HubSpot
 * contact are skipped, as are Spam rows (spam is never sent to HubSpot) and clearly labelled test
 * emails (example.com/.org/.net, navable-local, leadtest, link-debug) unless --include-test is given.
 * Run scripts/setup-hubspot-link-field.mjs first so the Notion column exists.
 */

const { NOTION_API_KEY, NOTION_LEADS_DATABASE_ID, HUBSPOT_PRIVATE_APP_TOKEN } = process.env;
const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID?.trim() || "43584751";
const apply = process.argv.includes("--apply");
const includeTest = process.argv.includes("--include-test");

if (!NOTION_API_KEY || !NOTION_LEADS_DATABASE_ID || !HUBSPOT_PRIVATE_APP_TOKEN) {
  console.error("Needs NOTION_API_KEY, NOTION_LEADS_DATABASE_ID and HUBSPOT_PRIVATE_APP_TOKEN in the environment.");
  process.exit(1);
}

const TEST_EMAIL = /@example\.(com|org|net)$|navable-local|leadtest|link-debug/i;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const notionHeaders = {
  Authorization: `Bearer ${NOTION_API_KEY}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

async function call(url, init, label) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { ...init, signal: AbortSignal.timeout(15_000) });
    if (res.status === 429 || res.status >= 500) {
      await sleep(1000 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error(`${label} -> ${res.status} ${(await res.text()).slice(0, 200)}`);
    return res.json();
  }
  throw new Error(`${label} -> gave up after retries`);
}

async function allRows() {
  const rows = [];
  let cursor;
  do {
    const page = await call(
      `https://api.notion.com/v1/databases/${NOTION_LEADS_DATABASE_ID}/query`,
      { method: "POST", headers: notionHeaders, body: JSON.stringify({ page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }) },
      "Notion query",
    );
    rows.push(...page.results);
    cursor = page.has_more ? page.next_cursor : undefined;
  } while (cursor);
  return rows;
}

const contactIdByEmail = new Map();
async function findContactId(email) {
  const key = email.toLowerCase();
  if (contactIdByEmail.has(key)) return contactIdByEmail.get(key);
  const found = await call(
    "https://api.hubapi.com/crm/v3/objects/contacts/search",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${HUBSPOT_PRIVATE_APP_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }], limit: 1 }),
    },
    "HubSpot contact search",
  );
  await sleep(250); // stay well under HubSpot's search rate limit
  const id = found.results[0]?.id ?? null;
  contactIdByEmail.set(key, id);
  return id;
}

const rows = await allRows();
if (rows.length && !("HubSpot contact" in rows[0].properties)) {
  console.error("The Notion database has no 'HubSpot contact' property; run scripts/setup-hubspot-link-field.mjs first.");
  process.exit(1);
}

const counts = { rows: rows.length, alreadyLinked: 0, noEmail: 0, spam: 0, testEmail: 0, noContact: 0, toLink: 0, updated: 0, failed: 0 };
for (const row of rows) {
  const props = row.properties;
  if (props["HubSpot contact"]?.url) { counts.alreadyLinked++; continue; }
  const email = props.Email?.email?.trim();
  if (!email) { counts.noEmail++; continue; }
  if (props.Status?.select?.name === "Spam") { counts.spam++; continue; }
  if (!includeTest && TEST_EMAIL.test(email)) { counts.testEmail++; continue; }

  const contactId = await findContactId(email);
  if (!contactId) { counts.noContact++; continue; }
  counts.toLink++;
  if (!apply) continue;

  const url = `https://app.hubspot.com/contacts/${PORTAL_ID}/record/0-1/${contactId}`;
  try {
    await call(
      `https://api.notion.com/v1/pages/${row.id}`,
      { method: "PATCH", headers: notionHeaders, body: JSON.stringify({ properties: { "HubSpot contact": { url } } }) },
      "Notion update",
    );
    counts.updated++;
  } catch (error) {
    counts.failed++;
    console.error(`row ${row.id}: ${error.message}`);
  }
}

console.log(apply ? "APPLIED" : "DRY RUN (no changes written; pass --apply to write)", JSON.stringify(counts));
