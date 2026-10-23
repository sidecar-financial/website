import { createHubSpotLead, isHubSpotConfigured } from "@/lib/hubspot";
import { parseLead, looksLikeSpam } from "@/lib/leads";
import { createNotionLead, isNotionConfigured } from "@/lib/notion";

/**
 * Lead capture for the demo and Waterfall waitlist forms.
 *
 * Each real lead goes to HubSpot (company + contact) and to the Notion "Website Leads"
 * database at the same time. The two are independent: if one fails the other still
 * runs, so a lead is only lost when both are down (and then the visitor sees an error).
 * Bots are recorded in Notion as Spam only and never reach HubSpot.
 */
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

  const tasks: Promise<unknown>[] = [];
  if (notionOn) tasks.push(createNotionLead(lead, spam).then(() => "notion"));
  if (hubspotOn && !spam) tasks.push(createHubSpotLead(lead).then(() => "hubspot"));

  const results = await Promise.allSettled(tasks);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("[leads] destination failed:", r.reason);
  });

  const succeeded = results.some((r) => r.status === "fulfilled");
  if (!succeeded) return Response.json({ error: "Could not record lead" }, { status: 502 });

  // Spam gets the same answer as a real lead so bots learn nothing.
  return Response.json({ ok: true });
}
