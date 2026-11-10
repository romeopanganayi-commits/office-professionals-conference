/* ICL Office Professionals Conference – Google Ads + LinkedIn conversion tracking */
(function () {
  var AW = 'AW-630519409';
  var ADS = {
    registration: AW + '/5gk6CLqgirUdEPHs06wC',
    lead: AW + '/jydNCL2girUdEPHs06wC',
    brochure: AW + '/Vzq9CLihirUdEPHs06wC'
  };
  var LI = { registration: 32773265, lead: 32773273, brochure: 32773281 };

  // Google tag (reuses the page's gtag if already loaded)
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () { window.dataLayer.push(arguments); };
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + AW;
    document.head.appendChild(s);
    window.gtag('js', new Date());
  }
  window.gtag('config', AW);

  // LinkedIn Insight Tag
  window._linkedin_partner_id = '6980089';
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
  if (!window.lintrk) {
    window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); };
    window.lintrk.q = [];
  }
  var l = document.createElement('script');
  l.async = true;
  l.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
  document.head.appendChild(l);

  // Direct brochure downloads (no form)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-track="brochure"]');
    if (!a) return;
    window.gtag('event', 'conversion', { send_to: ADS.brochure, form_name: 'brochure-download' });
    window.lintrk('track', { conversion_id: LI.brochure });
  });

  // Conversions on thank-you pages
  var path = location.pathname;
  var form = new URLSearchParams(location.search).get('form');
  var kind = null;
  if (/^\/thank-you/.test(path)) {
    if (form === 'registration') kind = 'registration';
    else if (form === 'enquiry' || form === 'inhouse-proposal') kind = 'lead';
    else if (form === 'brochure') kind = 'brochure';
  }
  if (!kind) return;
  window.gtag('event', 'conversion', { send_to: ADS[kind], form_name: form || kind });
  window.lintrk('track', { conversion_id: LI[kind] });
})();
