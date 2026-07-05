# ICL ESG Masterclass Website - Green Theme Option 2

This version uses a softer ESG-led visual direction rather than a blue-first ICL corporate theme.

## Colour direction
- Forest green for main structure, footer, executive panels and chatbot
- Light mint and sage green for hero sections and soft backgrounds
- Leaf green for primary buttons, navigation highlights and pricing emphasis
- Teal accents for ESG highlights
- Warm cream/gold accents kept subtle for premium feel

## Included
- Static HTML/CSS/JS pages
- Correct ICL logo
- ESG Masterclass brochure download
- Facilitator profiles
- Bank details
- Floating course assistant chatbot
- Mailto-linked forms addressed to training@za-icl.com

## Go live
Upload the contents of this folder to your web host. Ensure `index.html` is at the root of the live website.

## Latest update: multiple delegate registration
The Register page now includes a dynamic attendee/delegate repeater. Visitors can click “Add another delegate” to capture each attendee’s full name, job title, email address, phone number, attendance format, dietary requirements, and accessibility notes. The booking summary automatically updates the delegate count and estimated training fee excl. VAT based on the selected session.

The static form still uses a mailto workflow addressed to training@za-icl.com. For production-grade lead capture and guaranteed submissions, connect the form to Netlify Forms, Formspree, Zoho, HubSpot, or your hosting provider’s form endpoint.


Update: Facilitator cards now use a consistent 4:3 image aspect ratio with object-fit cropping so Lindiwe and Deon's profile photos display at the same size across desktop and mobile layouts.

Final refinement update:
- Added homepage trust strip and higher target-audience section.
- Added public course vs live online vs in-house pricing comparison.
- Added VAT wording across key pricing and registration areas.
- Added request quotation CTAs.
- Added brochure approval CTA after the programme agenda.
- Added faculty positioning section.
- Added POPIA-style privacy wording to forms.
- Updated chatbot to "ESG Masterclass Assistant" with quotation prompt.
- Updated SEO page titles and descriptions.
- Removed technical CRM/email-app wording from the registration page.


Update: Facilitator photos have been changed to a cleaner compact corner layout. Homepage facilitator preview cards and the full Facilitators page now use smaller profile images positioned in the card corner on desktop, with responsive stacked layout on mobile.

Brochure gate update:
- Added a dedicated brochure.html page.
- All public "Download Brochure" buttons now route to the brochure request form first.
- The brochure download link only appears after the visitor completes the form.
- The brochure request form captures name, organisation, email, phone, job title, area of interest and estimated delegates.
- The chatbot brochure response now directs visitors to the brochure request page.
- Note: because this is a static website, the PDF file still exists in the assets folder; true access control requires a backend or form platform with protected file delivery.

Payment and FAQ update:
- Added secure Paystack payment link: https://paystack.shop/pay/vt_n5nzr40j
- Added Pay Online / Pay by Card buttons on Dates & Pricing, Register, Enquire, footer and Thank You pages.
- Added chatbot quick reply for card payment.
- Removed the FAQ question about specific 2026 course dates because dates change regularly.
- Updated the Thank You page wording to remove backend/email-link language.

Netlify Forms update:
- Converted brochure, registration, enquiry, in-house proposal and subscription forms to Netlify Forms.
- Removed mailto form handling and client-side brochure unlock submission.
- Added brochure-download.html as the custom success/download page for the brochure request form.
- Added netlify-forms.html with hidden static form definitions to help Netlify detect all forms during deployment.
- Forms submit to:
  - brochure-request -> /brochure-download.html
  - registration -> /thank-you.html
  - enquiry -> /thank-you.html
  - inhouse-proposal -> /thank-you.html
  - subscription -> /thank-you.html
- After deployment, submit each form once and configure Netlify Forms email notifications to training@za-icl.com.

Netlify Forms 404 fix:
- Added AJAX submission for all Netlify Forms.
- Forms now POST to Netlify at "/" with the hidden form-name field, then redirect to the form action page.
- This prevents direct POST requests to /brochure-download.html from producing a Netlify 404.
- Added _redirects for brochure-download and thank-you routes.
- After redeploying, submit the brochure form again and confirm Netlify Forms shows a "brochure-request" submission.

Robust Netlify Forms fix:
- AJAX submission now tries the current page route first, then "/" and /netlify-forms.html.
- Added static Netlify form blueprints directly into index.html as an extra detection safety net.
- Added both data-netlify="true" and the boolean netlify attribute.
- Added data-netlify-honeypot and netlify-honeypot attributes.
- Updated hidden honeypot CSS to visually hide fields without using display:none.
- If submissions still fail after this deploy, check Netlify > Forms > Usage and configuration > Form detection and enable it, then redeploy.

Inline form handling update:
- Forms no longer redirect to /thank-you.html or /brochure-download.html after submission.
- Registration, enquiry, in-house and subscribe forms now show an inline thank-you message on the same page.
- Brochure request form now reveals the brochure download button on the same page after the form is completed.
- Forms still attempt to submit to Netlify Forms in the background.
- This avoids broken 404 pages while Netlify Forms detection/configuration is being finalised.
- Added /thank-you/index.html and /brochure-download/index.html as backup routes.

Registration form simplification:
- Removed the separate Delivery Format dropdown from the registration form.
- Preferred Session now automatically captures delivery format, venue/platform and unit fee via hidden fields.
- Removed per-delegate Attendance Format dropdowns.
- Delegate forms now capture only delegate details, dietary requirements and accessibility notes.
- Booking summary now shows selected session, automatically detected delivery/venue, delegate count and estimated fee.

Final UX fixes:
- Form actions changed to "#" so forms do not redirect to home if JavaScript is delayed.
- Added delegated submit handling so Netlify Forms are caught reliably.
- Registration now replaces the form with a prominent "Registration received" success card.
- Brochure form still reveals the brochure download button on the same page.
- Fixed hero trust badges so text is dark and visible on the light green hero background.
- Fixed the Course at a Glance price rows so R20 999 and R15 500 remain on one line.

Navigation separator update:
- Added visible vertical separators between desktop navigation items such as Home, About, Programme Agenda and Facilitators.
- Added subtle hover background for each navigation column to make the menu structure clearer.
- Mobile navigation remains unchanged.

Mobile menu fix:
- Fixed a JavaScript syntax error that prevented all site JavaScript from running on mobile.
- Strengthened the hamburger menu toggle so it opens/closes the mobile navigation reliably.
- Added close-on-menu-link-click and Escape-key close support.
- Added mobile dropdown styles so the navigation appears clearly below the header.

CPD and group discounts update:
- Added CPD messaging: “Earn CPD Points – Approved by the Institute of Directors South Africa (IoDSA).”
- Added group booking packages:
  - 3–5 delegates: 10% discount
  - 6–9 delegates: 15% discount
  - 10+ delegates: custom group quotation or in-house proposal
- Added group discount package section to Home and Dates & Pricing pages.
- Added group discount mini card to the Register page.
- Registration booking summary now automatically calculates group discounts for 3–9 delegates and recommends a custom quote for 10+ delegates.
- Added hidden Netlify form fields for discount package, rate and discount amount.
- Added FAQ and chatbot responses for CPD and group discounts.

Decap CMS update:
- Added `/admin/` for browser-based content editing.
- Added `admin/config.yml` configured for Netlify Identity + Git Gateway.
- Added `assets/data/course-settings.json` as the single editable content source for dates, prices, discounts, CPD wording, Paystack link, brochure path and contact details.
- The website now loads `assets/data/course-settings.json` and dynamically updates:
  - Dates & Pricing session cards
  - Registration session dropdown
  - Public Course and Live Online prices
  - Group discount cards
  - CPD wording
  - Paystack payment link
  - Brochure PDF link

Admin setup after deployment:
1. Push the site folder to GitHub.
2. Connect the GitHub repository to Netlify.
3. In Netlify, enable Identity.
4. In Netlify Identity settings, enable Git Gateway.
5. Invite the editor user under Netlify Identity.
6. Visit `/admin/` on the live site to edit course settings.
7. After publishing changes in Decap CMS, Netlify redeploys the site automatically.

Decap CMS invite/login fix:
- Public pages no longer try to complete Netlify Identity signup directly.
- If an invite, confirmation or recovery token lands on the homepage, the site redirects it to `/admin/`.
- `/admin/` now handles the Netlify Identity widget and Decap CMS login flow.
- This avoids the homepage popup error during invite acceptance.

Decap CMS token redirect fix:
- Moved the Netlify Identity token redirect script into the `<head>` of every public page so it runs immediately.
- Password-reset links that land on `/#recovery_token=...` now redirect to `/admin/#recovery_token=...`.
- Invite links that land on `/#invite_token=...` now redirect to `/admin/#invite_token=...`.
- `/admin/` now opens the correct Identity flow depending on whether the token is invite, recovery or confirmation.

GitHub backend CMS update:
- Changed Decap CMS backend from `git-gateway` to direct GitHub backend.
- Removed Netlify Identity widget from `/admin/`.
- Removed public-page Netlify Identity token redirects.
- This avoids Netlify Identity/Git Gateway login issues.
- Editors must log in with GitHub and need write/push access to the GitHub repository.
- Netlify OAuth provider must be installed under Project configuration > Access & security > OAuth.

WhatsApp update:
- Updated WhatsApp chat links to https://wa.me/27731759758
- WhatsApp display number changed to +27 73 175 9758
- Office telephone number remains unchanged where used as a normal phone contact.

Google Tag Manager update:
- Added GTM container GTM-M6DVM8RG to all public pages.
- Added dataLayer conversion/click events for ads tracking.


Google Ads tag update:
- Added Google Ads Google tag GT-P8QTCP7T to all public pages.
- Existing GTM tracking remains installed.
