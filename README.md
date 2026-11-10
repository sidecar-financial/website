This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Lead capture setup

The demo and Waterfall waitlist forms POST to `/api/leads` (`src/app/api/leads/route.ts`), which writes each lead to HubSpot and Notion independently (one failing doesn't block the other). Set these in Vercel (Production and Preview):

| Variable | What |
| --- | --- |
| `HUBSPOT_PRIVATE_APP_TOKEN` | Private-app token with `crm.objects.contacts.read/write` and `crm.objects.companies.read/write` |
| `HUBSPOT_DEMO_FORM_GUID` | GUID of the existing HubSpot "Request a demo" form (`39a9aac0-d014-4ad5-b74d-1ba7038c730d`). Each submitted demo lead is also posted to this form so its form-triggered workflows fire. Unset = no form submission (CRM contact only). |
| `HUBSPOT_WAITLIST_FORM_GUID` | GUID of the HubSpot "Waterfall waitlist" form (`698ed474-8143-4cb4-8b8b-184d18b30971`, decoded from its share link). Each Waterfall waitlist signup is also posted to this form (email only) so its form-triggered workflows fire. Unset = no form submission (CRM contact only). Demo leads never go to this form. |
| `HUBSPOT_PORTAL_ID` | Optional. HubSpot portal ID for the form submissions (demo and waitlist); defaults to `43584751` |
| `NOTION_API_KEY` | Notion internal integration token (the integration must be shared with the database) |
| `NOTION_LEADS_DATABASE_ID` | ID of the "Website Leads" database |

The Notion database needs these properties (names must match exactly): `Name` (title), `Email` (email), `Company` (text), `Interest` (select), `Source page` (text), `Status` (select: New / Contacted / Spam). The row time is the built-in Created time column.

Slack alerts are a Notion automation on that database (trigger: page added, filter: `Status` is `New`, so bot submissions marked `Spam` don't alert). They are not site code.

The form submission (`src/lib/hubspot-form.ts`) uses HubSpot's public Forms API, so it needs no token scope. It sends email, first name, last name and company (the form's four required fields), and only for submitted demo leads: never partial drafts, spam or the Waterfall waitlist (no name or company). It runs after the CRM write, is independent of it, and a failure is logged as `[leads] hubspot-form failed (...)` without affecting the visitor.

In production with neither destination configured the endpoint returns 503; locally it just logs the lead.

## Tracking

GTM (`GTM-PJQBDPVX`) and the HubSpot tracking script are loaded from `src/components/analytics/TrackingScripts.tsx` in production builds only. Successful form submissions push a `generate_lead` event to `dataLayer` for GTM triggers.
