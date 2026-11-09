import { createHubSpotLead, isHubSpotConfigured } from "@/lib/hubspot";
import { isFastSubmit, looksLikeSpam, parseLead, partialCaptureAllowed } from "@/lib/leads";
import { createNotionLead, isNotionConfigured } from "@/lib/notion";

/**
 * Lead capture for the demo and Waterfall waitlist forms.
 *
 * Each real lead goes to HubSpot (company + contact) and to the Notion "Website Leads"
 * database at the same time. The two are independent: if one fails the other still
 * runs, so a lead is only lost when both are down (and then the visitor sees an error).
 * Bots are recorded in Notion as Spam only and never reach HubSpot.
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

  const tasks: Array<{ name: string; run: Promise<unknown> }> = [];
  if (notionOn) tasks.push({ name: "notion", run: createNotionLead(lead, spam, fast) });
  if (hubspotOn && !spam) tasks.push({ name: "hubspot", run: createHubSpotLead(lead) });

  const results = await Promise.allSettled(tasks.map((t) => t.run));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[leads] ${tasks[i].name} failed (${lead.stage}):`, r.reason);
  });

  const succeeded = results.some((r) => r.status === "fulfilled");
  if (!succeeded) return Response.json({ error: "Could not record lead" }, { status: 502 });

  // Spam gets the same answer as a real lead so bots learn nothing.
  return Response.json({ ok: true });
}
