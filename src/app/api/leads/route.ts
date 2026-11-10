import {
  createHubSpotLead,
  isHubSpotConfigured,
  submitHubSpotDemoForm,
  submitHubSpotWaitlistForm,
} from "@/lib/hubspot";
import { formTargetForLead } from "@/lib/hubspot-form";
import { hubspotPortalId, linkNotionRowToHubSpot } from "@/lib/hubspot-link";
import { isFastSubmit, looksLikeSpam, parseLead, partialCaptureAllowed } from "@/lib/leads";
import { createNotionLead, isNotionConfigured, updateNotionRowProperties } from "@/lib/notion";

/**
 * Lead capture for the demo and Waterfall waitlist forms.
 *
 * Each real lead goes to HubSpot (company + contact) and to the Notion "Website Leads"
 * database at the same time. The two are independent: if one fails the other still
 * runs, so a lead is only lost when both are down (and then the visitor sees an error).
 * Bots are recorded in Notion as Spam only and never reach HubSpot.
 *
 * Once both have settled, the Notion row gets a "HubSpot contact" link to the contact record, as a
 * separate best-effort write (only when both the row and the contact are known). It never blocks or
 * fails either sink and is never shown to the visitor.
 *
 * A request with stage "partial" is a visitor who entered a name and email but has not clicked
 * submit yet; it is saved with consent "Not submitted" (see lib/leads.ts for the region rule).
 */
/** Each HubSpot/Notion call is bounded at 15s, and a submit makes a few in a row; leave room for them. */
export const maxDuration = 60;

export async function POST(request: Request) {
  // Browsers always send Origin on cross-site POSTs; reject anything not from our own site.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = parseLead(body);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });
  const { lead } = parsed;
  const spam = looksLikeSpam(lead);

  // Not-yet-submitted leads: skip bots entirely (nothing is recorded) and skip visitors from
  // regions where saving before submit needs opt-in consent. The visitor sees the same answer
  // either way, and the real submit later records them normally.
  if (lead.stage === "partial") {
    const country = request.headers.get("x-vercel-ip-country");
    const allowedHere = process.env.NODE_ENV !== "production" || partialCaptureAllowed(country);
    if (spam || !allowedHere) return Response.json({ ok: true });
  }

  const hubspotOn = isHubSpotConfigured();
  const notionOn = isNotionConfigured();

  if (!hubspotOn && !notionOn) {
    if (process.env.NODE_ENV === "production") {
      console.error("[leads] HubSpot and Notion are both unconfigured; lead NOT recorded");
      return Response.json({ error: "Unavailable" }, { status: 503 });
    }
    // Local dev without credentials: let the form's success path be exercised.
    console.info("[leads] (dev, nothing configured)", { ...lead, email: "<redacted>" }, { spam });
    return Response.json({ ok: true });
  }

  // Fast fills are real people far more often than bots (autofill), so keep them and flag them.
  const fast = !spam && isFastSubmit(lead);

  const notionRun = notionOn ? createNotionLead(lead, spam, fast) : undefined;
  const hubspotRun = hubspotOn && !spam ? createHubSpotLead(lead) : undefined;
  const tasks: Array<{ name: string; run: Promise<unknown> }> = [];
  if (notionRun) tasks.push({ name: "notion", run: notionRun });
  if (hubspotRun) tasks.push({ name: "hubspot", run: hubspotRun });

  // Also record a real submission of the matching HubSpot form so its form-triggered workflows
  // fire: demo leads to the demo form, Waterfall waitlist signups to the waitlist form (see
  // formTargetForLead). Submitted leads only (never partial drafts, never spam), run after the CRM
  // write so the contact exists first. Fully independent: a failure is logged and never reaches the
  // visitor or affects whether the lead counts as saved.
  const formTarget = spam ? null : formTargetForLead(lead);
  const formRun = formTarget
    ? (hubspotRun ? hubspotRun.catch(() => undefined) : Promise.resolve())
        .then(() => (formTarget.kind === "waitlist" ? submitHubSpotWaitlistForm(lead) : submitHubSpotDemoForm(lead)))
        .then((r) => {
          if (!r.submitted) console.info(`[leads] hubspot-form skipped (${formTarget.kind}, ${lead.stage}): ${r.reason}`);
        })
        .catch((err) => console.error(`[leads] hubspot-form failed (${formTarget.kind}, ${lead.stage}):`, err))
    : undefined;

  // Link the Notion row to the HubSpot contact once both have settled. Each side's failure just means
  // "no link"; this step has its own bounded Notion call, never throws and is only ever logged.
  const linkRun = Promise.allSettled([notionRun, hubspotRun]).then(async ([notionResult, hubspotResult]) => {
    const link = await linkNotionRowToHubSpot({
      spam,
      pageId: notionResult.status === "fulfilled" ? notionResult.value : undefined,
      contactId: hubspotResult.status === "fulfilled" ? hubspotResult.value : undefined,
      portalId: hubspotPortalId(),
      write: updateNotionRowProperties,
    });
    if (link.status === "failed") console.error(`[leads] notion link failed (${lead.stage}):`, link.error);
    if (link.status === "missing-property") {
      console.warn("[leads] notion link skipped: the 'HubSpot contact' URL property is missing; run scripts/setup-hubspot-link-field.mjs");
    }
  }).catch((err) => console.error(`[leads] notion link failed (${lead.stage}):`, err));

  const [results] = await Promise.all([Promise.allSettled(tasks.map((t) => t.run)), formRun, linkRun]);
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[leads] ${tasks[i].name} failed (${lead.stage}):`, r.reason);
  });

  const succeeded = results.some((r) => r.status === "fulfilled");
  if (!succeeded) return Response.json({ error: "Could not record lead" }, { status: 502 });

  // Spam gets the same answer as a real lead so bots learn nothing.
  return Response.json({ ok: true });
}
