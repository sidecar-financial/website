# Website feedback TODO

Source: Loom "Homepage Content and Compensation Page Review" (https://www.loom.com/share/8d05733b3be24a7282f06b60263f4cfc), plus the Navable 2026 Branding Doc and Carry GTM doc.

Update the checkboxes as work lands. Add the date and commit when an item is done.

Brand voice reminders: lead with outcomes, active voice, no "seamless" or "effortless", no hype words, no claims without evidence.

## Open questions (blocking some items)

- [ ] Is "sign-up flow" only the Phase 1 items, or is there more feedback coming?
- [ ] Sign in button: point to `investors.hellosidecar.com` or remove? (`src/lib/site.ts` defines a customer app URL.)
- [ ] Spelling: code says "Sterling Group", the Loom says "Starling Group". Which is right?
- [ ] OK to take down How it works with a redirect to `/`?
- [ ] Pilot call to action destination: `/demo` or something else?

## Waiting on materials from Ashlyn

- [ ] Value prop doc (for homepage, About and team copy)
- [ ] Co-invest white paper (for the "Get free white paper" link)
- [ ] LinkedIn URLs for Anna, Ronnie and Leonard
- [ ] Co-invest video or screenshots (for the animation and images)
- [ ] Real UI screenshots for the carried interest page

## Phase 1: Sign-up and call-to-action flow

- [ ] Pilot section (`src/components/home/Validation.tsx`): replace the "Typical setup takes under three weeks…" sentence with "Try us out with your actual fund data" and add a call-to-action button
- [ ] Remove "14-day guided trial" wording in `Features.tsx`, `Header.tsx` and `src/components/solution/data.ts` so it matches the pilot
- [ ] Header Sign in button (two copies in `Header.tsx`): point to the investor portal or remove
- [ ] `/why-navable` "Explore Platform" button: remove or repoint to `/demo`
- [ ] Employee co-invest page: remove the "14-day free trial" and "share a workbook" block
- [ ] Employee co-invest page: point "Get free white paper" at the co-invest white paper
- [ ] Verify end to end on production: submit a test lead and confirm it appears in HubSpot and in the Notion Website Leads database (keys and redeploy done 2026-10-29, not yet tested)
- [ ] Rotate the HubSpot and Notion keys that were pasted in chat, then update `.env.local` and Vercel
- [x] Copy `NOTION_LEADS_DATABASE_ID` into `.env.local` (already set in Vercel)
- [ ] HubSpot: create the contact property `website_form_consent` (dropdown: Not submitted = `not_submitted`, Submitted = `submitted`). Either add the `crm.schemas.contacts.write` scope to the private app and run `node --env-file=.env.local scripts/setup-consent-fields.mjs`, or create it by hand in Settings > Properties. Until then leads still save, just without the consent value.
- [ ] Legal/marketing: review the new demo-form notice and the privacy policy paragraph about saving name and email before submit; add a Consent Mode banner (see `TrackingScripts.tsx`)
- [ ] Verify on production: type a name and email without submitting (expect a Partial row in Notion, no Slack message), then submit (expect a New row, Slack message, Partial row archived)

## Phase 2: Homepage

- [ ] Hero tour data (`src/components/home/heroTourModel.ts` and related images): Alex Morgan = Fund Manager, total comp about $5M, lower carry
- [ ] Taylor Smith = Chief Financial Officer (replace "Risk Management Team")
- [ ] Jamie Chen = Analyst, Fund Controller / Fund Accounting; total comp and carry in the hundreds of thousands
- [ ] Make all numbers reconcile: carry + salary + bonus + co-invest = total comp; carry by fund sums to the total; Alex's left and right panels match
- [ ] Apply the same names and numbers in every image across the site
- [ ] Vesting visual: bar chart of percent vested over a longer timeline
- [ ] "With Navable" list: broaden beyond carry; point four = "Participants can access their own compensation information directly"
- [ ] Weave compensation management, compensation planning and co-invest reporting into more of the homepage
- [ ] Features headline: "Start with carry management and extend the same system to compensation and GP commit / employee co-investment as your firm evolves"
- [ ] Treat GP commit and employee co-invest as the same thing in copy
- [ ] Social proof: make the Sterling Group quote the hero quote, move the anonymous quote down
- [ ] Social proof: make the section more prominent (color, emphasis) and move it higher on the page
- [ ] FAQ: delete the subscription-eligibility question
- [ ] FAQ: delete the multi-entity / multi-currency question
- [ ] FAQ: rewrite the participant-access answer (admin portal and employee portal for every client, role-based permissions, checks and balances)
- [ ] Strengthen value props using the value prop doc

## Phase 3: Navigation and pages

- [ ] Solutions dropdown order: Carried Interest Software, Compensation Management, Employee Co-Invest, Waterfall, GP Operations
- [ ] Carried interest page: fix numbers in all pictures (participants especially)
- [ ] Carried interest page: replace shared screenshots with real UI (later)
- [ ] Employee co-invest: value prop = "consistent, scalable, fully digital solution"; remove "LPs can trust"
- [ ] Employee co-invest: replace the hero animation
- [ ] Employee co-invest: replace the "One place to manage with confidence" images
- [ ] Employee co-invest: change "Built for firms and GPs" to "Built for firms scaling offerings across their organizations and funds…"
- [ ] Who we serve: add Fund Administrators section (carried interest management, Waterfall; decide on LP onboarding); reuse `/fund-admins`
- [ ] Who we serve: write distinct content for private equity / private credit, venture capital and real estate
- [ ] Blog: add spacing between tiles
- [ ] Take down How it works (nav, sitemap, redirect)
- [ ] About: heading "About Navable: empowering the private fund ecosystem"
- [ ] About: update the intro line to "Navable provides cutting-edge tools and services for finance, HR and operations teams to keep up with evolving needs"
- [ ] About: delete the "We are passionate about…" paragraph (outdated)
- [ ] About: rework the team section (too much text); add LinkedIn links for Anna, Ronnie and Leonard
- [ ] About: fix team photos that did not load on first visit
- [ ] Why Navable: retitle to "The modern way to manage private fund compensation"
- [ ] Why Navable: calculation accuracy 99.9% to 100%
- [ ] Why Navable: "built for" line = private equity, private credit, venture capital and real estate fund operations

## Done

- [x] 2026-10-29: Added HubSpot and Notion keys to `.env.local` and Vercel (Production and Preview); redeployed production
