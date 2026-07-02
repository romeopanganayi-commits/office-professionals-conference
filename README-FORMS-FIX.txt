Office Professionals Conference - All Forms Fix

Issue:
The forms are redirecting to /thank-you.html, but that page is missing on the live site.
That is why registration, brochure request and enquiry show a 404 page after submission.

Upload these files to the ROOT of your GitHub repository:
  thank-you.html
  netlify-forms.html
  _redirects
  register.html
  brochure.html
  enquire.html

Important:
Do not upload the folder itself.
Open the zip, then upload the files inside it directly into the main/root level of the repo.

After committing:
1. Wait for Netlify to deploy.
2. Test this URL:
   https://officeprofessionalsconference.co.za/thank-you.html
3. Test each form again:
   - Registration
   - Request Brochure
   - Enquire
4. In Netlify, go to Forms and confirm these active forms:
   - registration
   - brochure-request
   - enquiry

Then add email notifications:
Netlify > Site configuration > Notifications > Form submission notifications > Add notification > Email notification > New verified form submission.
Use training@za-icl.com or your preferred receiving address.
