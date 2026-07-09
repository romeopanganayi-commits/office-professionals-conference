# ICL Office Professionals & Secretaries Day Conference

Static website for officeprofessionalsconference.co.za.

## GitHub repository
Recommended repo name: `office-professionals-conference`

## Netlify deployment settings
- Build command: leave blank
- Publish directory: `.`
- Base directory: leave blank

## Custom domain
Add this domain in Netlify:
`officeprofessionalsconference.co.za`

## Forms
This website uses native Netlify Forms. After first deployment, go to Netlify > Forms and confirm these active forms:
- `registration`
- `brochure-request`
- `enquiry`

Then add email notifications to `training@za-icl.com`.

## Notes
- Speaker profiles are not included.
- Activity costs are not shown separately; selected activities are included in the delegate package.
- Accommodation and airport shuttle packages are quote-based add-ons.
- Google Tag code is not installed yet; add the new tag for this domain once ready.


Pricing update:
- Conference + selected activity package: R22,499 excl. VAT per delegate.
- 3-star accommodation: R2,500 per night, per delegate, including breakfast.
- Airport shuttle: R700 one-way or R1,400 return per delegate.
- Complete package guide: R31,399 excl. VAT per delegate.
- Bookings are subject to availability.
- Accommodation, shuttle and activity/excursion arrangements require upfront payment before reservations can be confirmed.
- Last-minute cancellations or changes may incur supplier penalties.


Update: Added group/team discount packages: 3-5 delegates receive 10% off, 6-9 delegates receive 15% off, and 10+ delegates receive a custom quote option.


GA4 update: Added Google Analytics 4 measurement ID G-GZ9Q6YWM25 to all HTML pages.


## GA4 lead conversion tracking
Successful Netlify Form submissions redirect to the thank-you page with a form type in the URL. The thank-you page fires `generate_lead` and a form-specific GA4 event. Use `generate_lead` as the primary Google Ads conversion, and use the form-specific events for reporting by enquiry type.
