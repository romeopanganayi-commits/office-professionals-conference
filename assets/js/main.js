document.addEventListener('DOMContentLoaded', () => {
  const whatsappNumber = '27731759758';
  const whatsappDisplay = '+27 73 175 9758';
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const body = document.body;
  if (toggle && nav) {
    const setMenuState = (isOpen) => {
      nav.classList.toggle('open', isOpen);
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (body) body.classList.toggle('nav-open', isOpen);
    };

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMenuState(!nav.classList.contains('open'));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuState(false);
    });
  }

  document.querySelectorAll('[data-tabs]').forEach(tabWrap => {
    tabWrap.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
      const id = btn.dataset.tab;
      tabWrap.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.toggle('active', panel.id === id));
    }));
  });

  document.querySelectorAll('.faq-item button').forEach(btn => btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open')));

  document.querySelectorAll('.date-chip').forEach(chip => chip.addEventListener('click', () => {
    const select = document.querySelector('select[name="session"]');
    if (!select) return;
    const value = chip.dataset.session || '';
    [...select.options].forEach(o => { if (o.text.includes(value.split(' - ')[0])) select.value = o.value; });
    select.dispatchEvent(new Event('change', { bubbles: true }));
    select.scrollIntoView({behavior:'smooth', block:'center'});
  }));


  // Smooth-scroll directly to form sections when CTA links include a form anchor.
  // This makes Request Brochure, Register Now, Enquire, Subscribe and In-House Proposal links land on the form instead of the page top.
  const scrollToFormAnchor = (targetId, focusFirstField = true) => {
    if (!targetId) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (focusFirstField) {
        const firstField = target.querySelector('input:not([type=\"hidden\"]):not([name=\"bot-field\"]), select, textarea, button[type=\"submit\"]');
        if (firstField) firstField.focus({ preventScroll: true });
      }
    }, 120);
  };

  const formAnchors = new Set(['#brochure-form', '#registration-form', '#enquiry-form', '#inhouse-form', '#subscription-form']);
  if (formAnchors.has(window.location.hash)) {
    scrollToFormAnchor(window.location.hash);
  }

  document.addEventListener('click', (event) => {
    const link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;
    const url = new URL(link.getAttribute('href'), window.location.href);
    if (url.origin === window.location.origin && url.pathname === window.location.pathname && formAnchors.has(url.hash)) {
      event.preventDefault();
      history.pushState(null, '', url.hash);
      scrollToFormAnchor(url.hash);
    }
  });


  // Google Tag Manager event tracking.
  window.dataLayer = window.dataLayer || [];

  const pushTrackingEvent = (eventName, details = {}) => {
    window.dataLayer.push({ event: eventName, ...details });
  };

  const getFormConversionEvent = (formName) => {
    const events = {
      registration: 'registration_submit',
      enquiry: 'enquiry_submit',
      'inhouse-proposal': 'inhouse_proposal_request',
      subscription: 'subscription_submit',
      'brochure-request': 'brochure_request'
    };
    return events[formName] || 'form_submit';
  };

  document.addEventListener('submit', (event) => {
    const form = event.target && event.target.closest ? event.target.closest('form[data-netlify="true"]') : null;
    if (!form) return;
    const formNameInput = form.querySelector('input[name="form-name"]');
    const formName = formNameInput ? formNameInput.value : (form.getAttribute('name') || 'form');
    pushTrackingEvent('netlify_form_submit_attempt', { form_name: formName, conversion_event: getFormConversionEvent(formName) });
  }, true);

  const conversionParams = new URLSearchParams(window.location.search);
  const submittedForm = conversionParams.get('form');
  if (submittedForm) {
    pushTrackingEvent(getFormConversionEvent(submittedForm), { form_name: submittedForm, page_path: window.location.pathname });
  }

  document.addEventListener('click', (event) => {
    const link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const absoluteHref = link.href || href;
    const linkText = (link.textContent || '').trim();

    if (href.includes('wa.me') || href.toLowerCase().includes('whatsapp')) {
      pushTrackingEvent('whatsapp_click', { link_url: absoluteHref, link_text: linkText });
    } else if (href.includes('paystack.shop')) {
      pushTrackingEvent('pay_online_click', { link_url: absoluteHref, link_text: linkText });
    } else if (href.startsWith('tel:')) {
      pushTrackingEvent('phone_click', { link_url: href, link_text: linkText });
    } else if (href.startsWith('mailto:')) {
      pushTrackingEvent('email_click', { link_url: href, link_text: linkText });
    } else if (href.includes('esg-masterclass-brochure.pdf')) {
      pushTrackingEvent('brochure_download_click', { link_url: absoluteHref, link_text: linkText });
    } else if (href.includes('register.html')) {
      pushTrackingEvent('register_cta_click', { link_url: absoluteHref, link_text: linkText });
    } else if (href.includes('enquire.html')) {
      pushTrackingEvent('enquiry_cta_click', { link_url: absoluteHref, link_text: linkText });
    }
  }, true);


  // Native Netlify Forms are used for submissions. Netlify handles POST capture and redirects.

  // Delegate repeater for the registration page.
  const delegateContainer = document.querySelector('[data-delegate-container]');
  const addDelegateBtn = document.getElementById('addDelegateBtn');
  const bookingSummary = document.getElementById('bookingSummary');
  const registrationForm = document.querySelector('form[data-form-type="registration"]');
  const sessionSelect = registrationForm ? registrationForm.querySelector('select[name="session"]') : null;
  const delegateCountInput = registrationForm ? registrationForm.querySelector('input[name="delegate_count"]') : null;
  const estimatedTotalInput = registrationForm ? registrationForm.querySelector('input[name="estimated_training_fee_excl_vat"]') : null;
  const deliveryInput = registrationForm ? registrationForm.querySelector('input[name="delivery"]') : null;
  const venueInput = registrationForm ? registrationForm.querySelector('input[name="venue_or_platform"]') : null;
  const unitFeeInput = registrationForm ? registrationForm.querySelector('input[name="unit_fee_excl_vat"]') : null;
  const groupDiscountPackageInput = registrationForm ? registrationForm.querySelector('input[name="group_discount_package"]') : null;
  const groupDiscountRateInput = registrationForm ? registrationForm.querySelector('input[name="group_discount_rate"]') : null;
  const groupDiscountAmountInput = registrationForm ? registrationForm.querySelector('input[name="group_discount_amount_excl_vat"]') : null;

  const moneyFormat = (amount) => `R${Number(amount).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const createDelegateEntry = (index) => {
    const entry = document.createElement('div');
    entry.className = 'delegate-entry';
    entry.dataset.delegateIndex = index;
    entry.innerHTML = `
      <div class="delegate-entry-head">
        <div>
          <h4>Delegate ${index}</h4>
          <span>Additional attendee</span>
        </div>
        <button type="button" class="remove-delegate" aria-label="Remove delegate ${index}">Remove</button>
      </div>
      <div class="two-col">
        <label>Full name *<input required data-field="full_name" name="delegate_${index}_full_name" placeholder="Full name"></label>
        <label>Job title *<input required data-field="job_title" name="delegate_${index}_job_title" placeholder="Director / Executive / Manager"></label>
      </div>
      <div class="two-col">
        <label>Email address *<input required type="email" data-field="email" name="delegate_${index}_email" placeholder="name@company.co.za"></label>
        <label>Mobile / phone<input data-field="phone" name="delegate_${index}_phone" placeholder="+27"></label>
      </div>
      <label>Dietary requirements<input data-field="dietary" name="delegate_${index}_dietary" placeholder="For face-to-face delegates"></label>
      <label>Accessibility requirements / notes<textarea data-field="accessibility_notes" name="delegate_${index}_accessibility_notes" placeholder="Accessibility needs, special requirements, or notes for this delegate"></textarea></label>
    `;
    return entry;
  };

  const updateDelegateNames = () => {
    if (!delegateContainer) return;
    const entries = [...delegateContainer.querySelectorAll('.delegate-entry')];
    entries.forEach((entry, position) => {
      const index = position + 1;
      entry.dataset.delegateIndex = index;
      const title = entry.querySelector('h4');
      const subtitle = entry.querySelector('.delegate-entry-head span');
      const removeBtn = entry.querySelector('.remove-delegate');
      if (title) title.textContent = `Delegate ${index}`;
      if (subtitle) subtitle.textContent = index === 1 ? 'Primary attendee' : 'Additional attendee';
      if (removeBtn) {
        removeBtn.setAttribute('aria-label', `Remove delegate ${index}`);
        removeBtn.hidden = index === 1;
      }
      entry.querySelectorAll('[data-field]').forEach(field => {
        field.name = `delegate_${index}_${field.dataset.field}`;
      });
    });
    updateBookingSummary();
  };

  const updateBookingSummary = () => {
    if (!delegateContainer || !bookingSummary) return;
    const count = delegateContainer.querySelectorAll('.delegate-entry').length;
    const selectedOption = sessionSelect ? sessionSelect.selectedOptions[0] : null;
    const price = selectedOption && selectedOption.dataset.price ? Number(selectedOption.dataset.price) : 0;
    const delivery = selectedOption && selectedOption.dataset.delivery ? selectedOption.dataset.delivery : '';
    const location = selectedOption && selectedOption.dataset.location ? selectedOption.dataset.location : '';
    let feeText = 'Select a priced session';
    let hiddenValue = 'To be confirmed';
    let unitFeeText = price > 0 ? moneyFormat(price) : 'To be confirmed';
    let discountRate = 0;
    let discountPackage = 'No group discount';
    let discountAmount = 0;
    let discountText = 'No group discount';

    if (count >= 10) {
      discountPackage = '10+ delegates - custom group quotation recommended';
      discountText = 'Custom group quotation recommended for 10+ delegates';
    } else if (count >= 6) {
      discountRate = 0.15;
      discountPackage = '6-9 delegates - 15% Executive Team Package';
      discountText = '15% Executive Team Package applied';
    } else if (count >= 3) {
      discountRate = 0.10;
      discountPackage = '3-5 delegates - 10% Team Package';
      discountText = '10% Team Package applied';
    }

    if (selectedOption && selectedOption.value && price > 0) {
      const baseTotal = price * count;
      discountAmount = count >= 10 ? 0 : baseTotal * discountRate;
      const total = baseTotal - discountAmount;

      if (count >= 10) {
        feeText = `${moneyFormat(baseTotal)} excl. VAT before custom group quotation`;
        hiddenValue = `${feeText} | ${discountPackage}`;
      } else if (discountRate > 0) {
        feeText = `${moneyFormat(total)} excl. VAT after ${Math.round(discountRate * 100)}% discount (${count} delegates × ${moneyFormat(price)} less ${moneyFormat(discountAmount)})`;
        hiddenValue = feeText;
      } else {
        feeText = `${moneyFormat(total)} excl. VAT (${count} delegate${count === 1 ? '' : 's'} × ${moneyFormat(price)})`;
        hiddenValue = feeText;
      }
    } else if (selectedOption && selectedOption.value && price === 0) {
      feeText = 'Quoted separately for in-house delivery';
      hiddenValue = feeText;
      unitFeeText = 'Quoted separately';
      discountPackage = 'Custom in-house quotation';
      discountText = 'Custom in-house quotation';
    }

    if (delegateCountInput) delegateCountInput.value = String(count);
    if (estimatedTotalInput) estimatedTotalInput.value = hiddenValue;
    if (deliveryInput) deliveryInput.value = delivery;
    if (venueInput) venueInput.value = location;
    if (unitFeeInput) unitFeeInput.value = unitFeeText;
    if (groupDiscountPackageInput) groupDiscountPackageInput.value = discountPackage;
    if (groupDiscountRateInput) groupDiscountRateInput.value = discountRate ? `${Math.round(discountRate * 100)}%` : (count >= 10 ? 'Custom' : '0%');
    if (groupDiscountAmountInput) groupDiscountAmountInput.value = discountAmount ? moneyFormat(discountAmount) : 'R0.00';

    const sessionText = selectedOption && selectedOption.value ? selectedOption.value : 'Select a session';
    const deliveryText = delivery ? `${delivery}${location ? ' | ' + location : ''}` : 'Automatically captured from selected session';

    bookingSummary.innerHTML = `<strong>Booking summary</strong><span>Session: ${sessionText}</span><span>Delivery: ${deliveryText}</span><span>Delegates: ${count}</span><span>Group discount: ${discountText}</span><span>Estimated training fee excl. VAT: ${feeText}</span>`;
  };

  if (delegateContainer && addDelegateBtn) {
    addDelegateBtn.addEventListener('click', () => {
      const nextIndex = delegateContainer.querySelectorAll('.delegate-entry').length + 1;
      const entry = createDelegateEntry(nextIndex);
      delegateContainer.appendChild(entry);
      updateDelegateNames();
      entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = entry.querySelector('input');
      if (firstInput) firstInput.focus({ preventScroll: true });
    });

    delegateContainer.addEventListener('click', event => {
      const removeBtn = event.target.closest('.remove-delegate');
      if (!removeBtn) return;
      const entry = removeBtn.closest('.delegate-entry');
      if (entry) entry.remove();
      updateDelegateNames();
    });

    if (sessionSelect) sessionSelect.addEventListener('change', updateBookingSummary);
    updateDelegateNames();
  }

  // Native Netlify Forms handle submissions. Delegate repeater and chatbot remain active.

  // Simple front-end chatbot with preset course answers.
  const bot = document.querySelector('[data-chatbot]');
  if (bot) {
    const panel = bot.querySelector('.chatbot-panel');
    const toggleBtn = bot.querySelector('.chatbot-toggle');
    const closeBtn = bot.querySelector('.chatbot-close');
    const answer = bot.querySelector('.chatbot-answer');
    const setOpen = (open) => {
      panel.hidden = !open;
      toggleBtn.setAttribute('aria-expanded', String(open));
    };
    toggleBtn.addEventListener('click', () => setOpen(panel.hidden));
    closeBtn.addEventListener('click', () => setOpen(false));

    const responses = {
      dates: `<strong>Dates & pricing</strong><br>19 - 21 August 2026: Johannesburg or Live Online.<br>16 - 18 September 2026: Cape Town or Live Online.<br><br>Public Course: <strong>R20 999.00 excl. VAT</strong><br>Live Online: <strong>R15 500.00 excl. VAT</strong><br><a href="register.html#registration-form">Register now</a>`,
      quote: `<strong>Quotation request</strong><br>Yes. Complete the enquiry form or email <a href="mailto:training@za-icl.com">training@za-icl.com</a> and ICL will prepare a quotation or invoice for your selected session.<br><a href="enquire.html#enquiry-form">Request a quotation</a>`,
      bank: `<strong>ICL Banking Details</strong><br>Bank: First National Bank<br>Account No: 62695650450<br>Branch: RANDBURG<br>Branch Code: 254005<br>Swift Code: FIRNZAJJ<br>Account Type: COMMERCIAL SUITE<br><br>Please use your organisation name or invoice number as payment reference once invoiced.`,
      payment: `<strong>Secure online payment</strong><br>You can pay online using ICL’s secure Paystack link for card, Apple Pay and supported EFT options.<br><a href="https://paystack.shop/pay/vt_n5nzr40j" target="_blank" rel="noopener">Pay securely online</a>`,
      discounts: `<strong>Group booking packages</strong><br>3–5 delegates: 10% discount.<br>6–9 delegates: 15% discount.<br>10+ delegates: custom quotation or in-house proposal.<br><a href="register.html#registration-form">Register a team</a>`,
      cpd: `<strong>CPD points</strong><br>Delegates can earn CPD Points. The programme is approved by the Institute of Directors South Africa (IoDSA).`,
      brochure: `<strong>Brochure</strong><br>Please complete the short brochure request form first. Once submitted, the download button will appear.<br><a href="brochure.html#brochure-form">Request brochure</a>`,
      inhouse: `<strong>In-house delivery</strong><br>ICL can customise this ESG Masterclass for boards, EXCO teams, committees and senior management groups.<br><a href="inhouse.html#inhouse-form">Request an in-house proposal</a>`,
      contact: `<strong>Contact ICL</strong><br>Email: <a href="mailto:training@za-icl.com">training@za-icl.com</a><br>Tel: <a href="tel:+27110576895">+27 11 057 6895</a><br>WhatsApp: <a href="https://wa.me/27731759758" target="_blank" rel="noopener">+27 73 175 9758</a><br><a href="enquire.html#enquiry-form">Send an enquiry</a>`
    };

    bot.querySelectorAll('[data-reply]').forEach(btn => btn.addEventListener('click', () => {
      answer.innerHTML = `<div class="bot-message bot-message-answer">${responses[btn.dataset.reply] || responses.contact}</div>`;
    }));
  }

  // Decap CMS data-driven course settings.
  const courseSettingsUrl = 'assets/data/course-settings.json';

  const formatCurrencyShort = (value) => {
    const amount = Number(value || 0);
    return `R${amount.toLocaleString('en-ZA', { maximumFractionDigits: 0 }).replace(/,/g, ' ')}`;
  };

  const formatCurrencyLong = (value) => {
    const amount = Number(value || 0);
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ' ')}`;
  };

  const groupSessionsForCards = (sessions = []) => {
    const publicSessions = sessions.filter(s => s && s.delivery !== 'In-House / Customised');
    const grouped = {};
    publicSessions.forEach(session => {
      const key = session.date || session.monthLabel || session.displayLabel;
      if (!grouped[key]) {
        grouped[key] = {
          date: session.date || '',
          monthLabel: session.monthLabel || '',
          locations: [],
          publicPrice: null,
          livePrice: null
        };
      }
      if (session.delivery === 'Face-to-Face') {
        grouped[key].locations.push(session.location || 'Face-to-Face');
        grouped[key].publicPrice = session.price || grouped[key].publicPrice;
      } else if (session.delivery === 'Live Online') {
        grouped[key].locations.push('Live Online');
        grouped[key].livePrice = session.price || grouped[key].livePrice;
      }
    });
    return Object.values(grouped);
  };

  const renderSessionsGridFromSettings = (settings) => {
    const grid = document.querySelector('[data-sessions-grid]');
    if (!grid || !Array.isArray(settings.sessions)) return;

    const cards = groupSessionsForCards(settings.sessions);
    grid.innerHTML = cards.map(card => {
      const locations = [...new Set(card.locations)].join(' / ');
      return `<article class="session-card">
        <span class="session-month">${card.monthLabel || ''}</span>
        <h3>${card.date || ''}</h3>
        <p>${locations}</p>
        ${card.publicPrice ? `<strong data-course-public-price-long>${formatCurrencyLong(card.publicPrice)}</strong><small>Public Course • excl. VAT</small>` : ''}
        ${card.livePrice ? `<strong class="online-price" data-course-live-price-long>${formatCurrencyLong(card.livePrice)}</strong><small>Live Online • excl. VAT</small>` : ''}
        <ul><li>${settings.courseDurationDays || 3}-day ESG Masterclass</li><li>ICL Certificate of Completion</li><li>Course materials included</li></ul>
        <a class="btn btn-green full" href="register.html#registration-form">Register Now →</a>
      </article>`;
    }).join('');
  };

  const renderDiscountsFromSettings = (settings) => {
    const grids = document.querySelectorAll('[data-discount-grid]');
    if (!grids.length || !Array.isArray(settings.discounts)) return;

    grids.forEach(grid => {
      grid.innerHTML = settings.discounts.map((discount, index) => {
        const isFeatured = index === 1 ? ' featured' : '';
        const discountLabel = discount.customQuote ? 'Custom package' : `${discount.discountPercent || 0}% discount`;
        return `<article class="discount-card${isFeatured}">
          <small>${discount.label || 'Group Package'}</small>
          <h3>${discount.delegateRange || ''}</h3>
          <strong>${discountLabel}</strong>
          <p>${discount.description || ''}</p>
        </article>`;
      }).join('');
    });
  };

  const renderRegistrationSessionsFromSettings = (settings) => {
    if (!sessionSelect || !Array.isArray(settings.sessions)) return;
    const currentValue = sessionSelect.value;
    sessionSelect.innerHTML = '<option value="">Select a session</option>' + settings.sessions.map(session => {
      const price = Number(session.price || 0);
      const priceText = session.customQuote || price === 0 ? 'Quoted separately' : formatCurrencyLong(price);
      const faceLabel = session.delivery === 'Face-to-Face' ? ` (${session.delivery})` : '';
      const label = `${session.displayLabel || session.date || 'Session'}${faceLabel} - ${priceText}`;
      return `<option value="${session.displayLabel || label}" data-price="${price}" data-delivery="${session.delivery || ''}" data-location="${session.location || ''}">${label}</option>`;
    }).join('');

    if (currentValue) {
      const matching = [...sessionSelect.options].find(option => option.value === currentValue || option.textContent.includes(currentValue));
      if (matching) sessionSelect.value = matching.value;
    }
    sessionSelect.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const applyCourseSettings = (settings) => {
    if (!settings) return;
    window.ICL_COURSE_SETTINGS = settings;

    document.querySelectorAll('[data-course-public-price]').forEach(el => { el.textContent = formatCurrencyShort(settings.publicCoursePrice); });
    document.querySelectorAll('[data-course-public-price-long]').forEach(el => { el.textContent = formatCurrencyLong(settings.publicCoursePrice); });
    document.querySelectorAll('[data-course-live-price]').forEach(el => { el.textContent = formatCurrencyShort(settings.liveOnlinePrice); });
    document.querySelectorAll('[data-course-live-price-long]').forEach(el => { el.textContent = formatCurrencyLong(settings.liveOnlinePrice); });
    document.querySelectorAll('[data-course-cpd-text]').forEach(el => { el.textContent = settings.cpdText || el.textContent; });
    document.querySelectorAll('[data-course-cpd-short]').forEach(el => { el.textContent = settings.cpdShortText || el.textContent; });
    document.querySelectorAll('[data-course-payment-link]').forEach(el => { if (settings.paystackPaymentUrl) el.href = settings.paystackPaymentUrl; });
    document.querySelectorAll('[data-course-brochure-link]').forEach(el => { if (settings.brochurePath) el.href = settings.brochurePath; });

    renderSessionsGridFromSettings(settings);
    renderDiscountsFromSettings(settings);
    renderRegistrationSessionsFromSettings(settings);

    if (typeof updateBookingSummary === 'function') updateBookingSummary();
  };

  fetch(courseSettingsUrl, { cache: 'no-store' })
    .then(response => response.ok ? response.json() : null)
    .then(settings => applyCourseSettings(settings))
    .catch(() => {
      // Keep hard-coded fallback content if the JSON file cannot be loaded.
    });

});
