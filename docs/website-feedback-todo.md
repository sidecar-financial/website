# Website feedback TODO

Source: Loom "Homepage Content and Compensation Page Review" (https://www.loom.com/share/8d05733b3be24a7282f06b60263f4cfc), plus the Navable 2026 Branding Doc and Carry GTM doc.

Update the checkboxes as work lands. Add the date and commit when an item is done.

Brand voice reminders: lead with outcomes, active voice, no "seamless" or "effortless", no hype words, no claims without evidence.

## Open questions (blocking some items)

- [x] Is "sign-up flow" only the Phase 1 items, or is there more feedback coming?
- [x] Sign in button: point to `investors.hellosidecar.com` or remove? (`src/lib/site.ts` defines a customer app URL.) (2026-11-09: decided to remove; Sign in links and `SIGN_IN_URL` deleted)
- [x] Spelling: code says "Sterling Group", the Loom says "Starling Group". Which is right? (2026-11-09: resolved, keep "Sterling Group". The Loom's auto-transcript likely misheard it, and the spelling was never called out.)
- [x] OK to take down How it works with a redirect to `/`? (2026-11-09: yes, taken down)
- [x] Pilot call to action destination: `/demo` or something else? (2026-11-09: keep `/demo`)

## Waiting on materials from Ashlyn

- [ ] Value prop doc (for homepage, About and team copy)
- [x] Co-invest white paper (for the "Get free white paper" link) (2026-11-09: none exists; dropped)
- [x] LinkedIn URLs for Anna, Ronnie and Leonard (2026-11-09: found by web search, each profile matched against the About page bio, and added to `src/app/about/page.tsx`. Anna's profile lists her as Chief Product Officer while the site says COO.)
- [ ] Co-invest video or screenshots (for the animation and images)
- [x] Real UI screenshots for the carried interest page (2026-11-09: dropped; generated visuals stay)

## Phase 1: Sign-up and call-to-action flow

- [x] Pilot section (`src/components/home/Validation.tsx`): replace the "Typical setup takes under three weeks…" sentence with "Try us out with your actual fund data" and add a call-to-action button (2026-11-09, 08ac391; button goes to `/demo`)
- [x] Remove "14-day guided trial" wording in `Features.tsx`, `Header.tsx` and `src/components/solution/data.ts` so it matches the pilot (2026-11-09, 08ac391; also the "Free 14-Day Trial" block on solution pages)
- [x] Header Sign in button (two copies in `Header.tsx`): point to the investor portal or remove (2026-11-09: removed both copies)
- [x] `/why-navable` "Explore Platform" button: remove or repoint to `/demo` (2026-11-09, 08ac391; removed, "Book a Free Demo" stays)
- [x] Employee co-invest page: remove the "14-day free trial" and "share a workbook" block (2026-11-09, 08ac391)
- [x] Employee co-invest page: point "Get free white paper" at the co-invest white paper (2026-11-09: no white paper, so the button is hidden on the co-invest page only via `whitePaper: false`; other solution pages still link to the Resource Hub)
- [x] Verify end to end on production: submit a test lead and confirm it appears in HubSpot and in the Notion Website Leads database (keys and redeploy done 2026-10-29, not yet tested) (2026-11-09: tested against navable-website.vercel.app with a labelled test lead; Notion row created as New / Submitted and HubSpot contact + company created. Slack not checked from here; see the next item)
- [ ] Rotate the HubSpot and Notion keys that were pasted in chat, then update `.env.local` and Vercel
- [x] Copy `NOTION_LEADS_DATABASE_ID` into `.env.local` (already set in Vercel)
- [ ] HubSpot: create the contact property `website_form_consent` (dropdown: Not submitted = `not_submitted`, Submitted = `submitted`). Either add the `crm.schemas.contacts.write` scope to the private app and run `node --env-file=.env.local scripts/setup-consent-fields.mjs`, or create it by hand in Settings > Properties. Until then leads still save, just without the consent value.
- [ ] Legal/marketing: review the new demo-form notice and the privacy policy paragraph about saving name and email before submit; add a Consent Mode banner (see `TrackingScripts.tsx`)
- [ ] Verify on production: type a name and email without submitting (expect a Partial row in Notion, no Slack message), then submit (expect a New row, Slack message, Partial row archived) (2026-11-09: Notion side passed: Partial row with consent "Not submitted" on partial, then one New / Submitted row and the Partial row archived. STILL OPEN: someone must confirm in Slack that nothing posted on the partial and exactly one message posted on the submit. Test records to delete: Notion/HubSpot contact `navable-leadtest-1794249932@example.com`, company "TEST Co (delete me)")

## Phase 2: Homepage

- [x] Hero tour data (`src/components/home/heroTourModel.ts` and related images): Alex Morgan = Fund Manager, total comp about $5M, lower carry (2026-11-09: hero is now `hero-tour.html` with Alex Morgan Fund Manager $5.0M comp; the unused `HeroTour.tsx` and `heroTourModel.ts` were deleted in ecc1efd)
- [x] Taylor Smith = Chief Financial Officer (replace "Risk Management Team") (2026-11-09: already in the hero tour and card images)
- [x] Jamie Chen = Analyst, Fund Controller / Fund Accounting; total comp and carry in the hundreds of thousands (2026-11-09: already in the hero tour and card images)
- [x] Make all numbers reconcile: carry + salary + bonus + co-invest = total comp; carry by fund sums to the total; Alex's left and right panels match (2026-11-09: checked Alex: 400K + 500K + 3.6M carry + 500K co-invest = 5.0M; carry by fund 720K + 1.08M + 1.8M = 3.6M; firm 2026 carry 3.6M + 900K + 85K = 4.585M; comp statements 5.0M + 1.7M + 300K = 7.0M)
- [x] Apply the same names and numbers in every image across the site (2026-11-09: all product images use Alex, Taylor and Jamie)
- [x] Vesting visual: bar chart of percent vested over a longer timeline (2026-11-09: `02-hero-b-vesting.png` is a bar chart of cumulative percent vested, 2023 to 2032, and its numbers reconcile)
- [x] "With Navable" list: broaden beyond carry; point four = "Participants can access their own compensation information directly" (2026-11-09, ecc1efd)
- [x] Weave compensation management, compensation planning and co-invest reporting into more of the homepage (2026-11-09, ecc1efd; Problem, Outcomes, Why Navable, Features)
- [x] Features headline: "Start with carry management and extend the same system to compensation and GP commit / employee co-investment as your firm evolves" (2026-11-09, ecc1efd)
- [x] Treat GP commit and employee co-invest as the same thing in copy (2026-11-09, ecc1efd; the Features tile, Why Navable, FAQ, demo page and co-invest page now say "GP commit / employee co-investment")
- [x] Social proof: make the Sterling Group quote the hero quote, move the anonymous quote down (2026-11-09, ecc1efd)
- [x] Social proof: make the section more prominent (color, emphasis) and move it higher on the page (2026-11-09, ecc1efd; dark featured quote, section now follows Problem)
- [x] FAQ: delete the subscription-eligibility question (2026-11-09, ecc1efd)
- [x] FAQ: delete the multi-entity / multi-currency question (2026-11-09, ecc1efd)
- [x] FAQ: rewrite the participant-access answer (admin portal and employee portal for every client, role-based permissions, checks and balances) (2026-11-09, ecc1efd; product team should confirm the role-based permissions and checks-and-balances claims)
- [ ] Strengthen value props using the value prop doc (blocked on the doc)

## Phase 3: Navigation and pages

- [x] Solutions dropdown order: Carried Interest Software, Compensation Management, Employee Co-Invest, Waterfall, GP Operations (2026-11-09, 0c4c334; the four existing items are in order. "GP Operations" has no page or nav item, so it was not added)
- [x] Carried interest page: fix numbers in all pictures (participants especially) (2026-11-09: the new card visuals use the same Alex, Taylor and Jamie numbers)
- [x] Carried interest page: replace shared screenshots with real UI (2026-11-09: dropped; generated visuals stay)
- [x] Employee co-invest: value prop = "consistent, scalable, fully digital solution"; remove "LPs can trust" (2026-11-09, 08ac391)
- [x] Employee co-invest: replace the hero animation (2026-11-09: `coinvestStoryboard` animation from the graphics work)
- [x] Employee co-invest: replace the "One place to manage with confidence" images (2026-11-09: new co-invest card visuals)
- [x] Employee co-invest: change "Built for firms and GPs" to "Built for firms scaling offerings across their organizations and funds…" (2026-11-09, 08ac391)
- [x] Who we serve: add Fund Administrators section (carried interest management, Waterfall; decide on LP onboarding); reuse `/fund-admins` (2026-11-09: Fund Administrators is in the Who we serve menu and footer and links to `/fund-admins`; the LP onboarding decision is still open)
- [ ] Who we serve: write distinct content for private equity / private credit, venture capital and real estate (the lists and tags already differ per page; deeper vertical content needs your input)
- [x] Blog: add spacing between tiles (2026-11-09, 0c4c334)
- [x] Take down How it works (nav, sitemap, redirect) (2026-11-09: page deleted, nav and sitemap entries removed, 308 redirect `/how-it-works` to `/` in `next.config.ts`)
- [x] About: heading "About Navable: empowering the private fund ecosystem" (2026-11-09, 0c4c334)
- [x] About: update the intro line to "Navable provides cutting-edge tools and services for finance, HR and operations teams to keep up with evolving needs" (2026-11-09, 0c4c334)
- [x] About: delete the "We are passionate about…" paragraph (outdated) (2026-11-09, 0c4c334)
- [x] About: rework the team section (too much text); add LinkedIn links for Anna, Ronnie and Leonard (2026-11-09, 0c4c334; shorter bios and one short team paragraph; LinkedIn links for Anna, Ronnie and Leonard still need their URLs)
- [x] About: fix team photos that did not load on first visit (2026-11-09, 0c4c334; photos now skip the image optimizer like the investor logos. I could not reproduce the failure, so check the first visit on production)
- [x] Why Navable: retitle to "The modern way to manage private fund compensation" (2026-11-09, 08ac391)
- [x] Why Navable: calculation accuracy 99.9% to 100% (2026-11-09, 08ac391; note the "no claims without evidence" brand rule)
- [x] Why Navable: removed the "under three weeks" onboarding claim from the White-Glove Onboarding card, since she said it is not accurate for the pilot (2026-11-09; the same claim is still in blog and resource hub articles)
- [x] Why Navable: "built for" line = private equity, private credit, venture capital and real estate fund operations (2026-11-09, 08ac391)

## Done

- [x] 2026-10-29: Added HubSpot and Notion keys to `.env.local` and Vercel (Production and Preview); redeployed production
