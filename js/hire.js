/* ──────────────────────────────────────────────────────────────
   hire.js  —  Hire Me modal  •  EmailJS + mailto fallback
   ────────────────────────────────────────────────────────────── */

let hireData = null;

export async function initHireModal() {
  try {
    hireData = await fetch('data/hire.json').then(r => r.json());
  } catch (e) {
    console.warn('[HireModal] Could not load hire.json');
    return;
  }
  injectModal();
  wireEvents();
}

/* ── OPEN / CLOSE ────────────────────────────────────────────── */

function open() {
  document.getElementById('hireOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function close() {
  document.getElementById('hireOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function switchTab(tabId) {
  document.querySelectorAll('.hire-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tabId)
  );
  document.querySelectorAll('.hire-panel').forEach(p =>
    p.classList.toggle('active', p.id === `hire-panel-${tabId}`)
  );
}

/* ── BUILD MODAL HTML ────────────────────────────────────────── */

function injectModal() {
  const d = hireData;

  const tabsHTML = d.types.map((t, i) =>
    `<button class="hire-tab${i === 0 ? ' active' : ''}" data-tab="${t.id}" type="button">${t.label}</button>`
  ).join('');

  const panelsHTML = d.types.map((t, i) => {
    const cfg = d[t.id];
    return `
      <div id="hire-panel-${t.id}" class="hire-panel${i === 0 ? ' active' : ''}">
        <form id="hire-form-${t.id}" novalidate>${buildFieldsHTML(cfg.fields)}</form>
        <div class="hire-error" id="hire-err-${t.id}"></div>
        <button type="button" class="hire-submit" id="hire-btn-${t.id}">${cfg.submitLabel}</button>
        <div class="hire-success" id="hire-ok-${t.id}" style="display:none">
          <div class="hire-success-icon" id="hire-ok-icon-${t.id}">✅</div>
          <h3 id="hire-ok-title-${t.id}">Request Sent!</h3>
          <p id="hire-ok-msg-${t.id}">Thank you for reaching out.<br>I'll review and reply within <strong>24 hours</strong>.</p>
        </div>
      </div>`;
  }).join('');

  const overlay = document.createElement('div');
  overlay.id        = 'hireOverlay';
  overlay.className = 'hire-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="hire-modal">
      <button class="hire-close" id="hireClose" type="button" aria-label="Close">✕</button>
      <h2 class="hire-modal-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
      <p class="hire-modal-subtitle">${d.subtitle}</p>
      <div class="hire-tabs">${tabsHTML}</div>
      ${panelsHTML}
    </div>`;
  document.body.appendChild(overlay);
}

/* ── FIELD BUILDERS ──────────────────────────────────────────── */

function buildFieldsHTML(fields) {
  let html = '';
  let i = 0;
  while (i < fields.length) {
    const cur  = fields[i];
    const next = fields[i + 1];
    if (cur.half && next?.half) {
      html += `<div class="hire-row">${fieldHTML(cur)}${fieldHTML(next)}</div>`;
      i += 2;
    } else {
      html += fieldHTML(cur);
      i++;
    }
  }
  return html;
}

function fieldHTML(f) {
  const req     = f.required ? '<span class="req">*</span>' : '';
  const phAttr  = f.placeholder ? ` placeholder="${f.placeholder}"` : '';
  const reqAttr = f.required ? ' required' : '';

  let input;

  if (f.type === 'currency') {
    const opts = (hireData.currencies || []).map(c =>
      `<option value="${c.code}">${c.label}</option>`
    ).join('');
    input = `<select id="hf-${f.id}" name="${f.id}" class="hire-select"${reqAttr}>
      <option value="">Select…</option>${opts}
    </select>`;

  } else if (f.type === 'select') {
    const opts = (f.options || []).map(o =>
      `<option value="${o}">${o}</option>`
    ).join('');
    input = `<select id="hf-${f.id}" name="${f.id}" class="hire-select"${reqAttr}>
      <option value="">Select…</option>${opts}
    </select>`;

  } else if (f.type === 'textarea') {
    input = `<textarea id="hf-${f.id}" name="${f.id}" class="hire-textarea"${phAttr}${reqAttr}></textarea>`;

  } else {
    input = `<input type="${f.type}" id="hf-${f.id}" name="${f.id}" class="hire-input"${phAttr}${reqAttr}>`;
  }

  const hintHtml = f.hint ? `<p class="hire-hint">${f.hint}</p>` : '';

  return `
    <div class="hire-field">
      <label class="hire-label" for="hf-${f.id}">${f.label}${req}</label>
      ${input}
      ${hintHtml}
    </div>`;
}

/* ── EVENT WIRING ────────────────────────────────────────────── */

function wireEvents() {
  document.getElementById('hireClose').addEventListener('click', close);

  document.getElementById('hireOverlay').addEventListener('click', e => {
    if (e.target.id === 'hireOverlay') close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('hireOverlay')?.classList.contains('open')) close();
  });

  document.querySelectorAll('.hire-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  hireData.types.forEach(({ id }) => {
    document.getElementById(`hire-btn-${id}`)?.addEventListener('click', () => submit(id));
  });

  // Open modal from hero Hire Me button
  document.addEventListener('click', e => {
    if (e.target.closest('#heroHireBtn')) { e.preventDefault(); open(); }
  });
}

/* ── SUBMIT ──────────────────────────────────────────────────── */

async function submit(type) {
  const form  = document.getElementById(`hire-form-${type}`);
  const errEl = document.getElementById(`hire-err-${type}`);
  const btn   = document.getElementById(`hire-btn-${type}`);
  const okEl  = document.getElementById(`hire-ok-${type}`);

  errEl.classList.remove('show');
  form.querySelectorAll('.hire-input,.hire-textarea,.hire-select').forEach(el => (el.style.borderColor = ''));

  if (!form.checkValidity()) {
    form.querySelectorAll(':invalid').forEach(el => (el.style.borderColor = '#f87171'));
    showErr(errEl, 'Please fill in all required fields.');
    return;
  }

  const data  = Object.fromEntries(new FormData(form).entries());
  const cfg   = window.CONFIG?.emailjs || {};
  const owner = window.LINKS?.contact?.email || 'shuaibiqbaldgk@gmail.com';

  // Use EmailJS only when properly configured (not placeholder values)
  const emailjsReady = cfg.publicKey
    && !cfg.publicKey.startsWith('YOUR_')
    && cfg.serviceId
    && !cfg.serviceId.startsWith('YOUR_')
    && cfg.ownerTemplateId;

  btn.disabled    = true;
  btn.textContent = 'Sending…';

  try {
    if (emailjsReady) {
      await sendEmailJS(data, type, cfg, owner);
      // EmailJS success — email actually sent
      form.style.display = 'none';
      btn.style.display  = 'none';
      okEl.style.display = 'block';
    } else {
      // mailto fallback — show instructions, then open email client
      form.style.display = 'none';
      btn.style.display  = 'none';
      document.getElementById(`hire-ok-icon-${type}`).textContent  = '📧';
      document.getElementById(`hire-ok-title-${type}`).textContent = 'Email Client Opening…';
      document.getElementById(`hire-ok-msg-${type}`).innerHTML     =
        'Your details are pre-filled in your email client.<br><strong>Please press Send</strong> to complete your enquiry.';
      okEl.style.display = 'block';
      setTimeout(() => sendMailto(data, type, owner), 400);
    }
  } catch (err) {
    console.error('[HireModal]', err);
    showErr(errEl, 'Could not send — opening your email client instead.');
    sendMailto(data, type, owner);
    btn.disabled    = false;
    btn.textContent = hireData[type].submitLabel;
  }
}

function showErr(el, msg) { el.textContent = msg; el.classList.add('show'); }

/* ── EMAILJS ─────────────────────────────────────────────────── */

async function loadEmailJS(publicKey) {
  if (window.emailjs) return;
  await new Promise((resolve, reject) => {
    const s  = document.createElement('script');
    s.src    = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = () => { window.emailjs.init({ publicKey }); resolve(); };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function sendEmailJS(data, type, cfg, ownerEmail) {
  await loadEmailJS(cfg.publicKey);
  const label = hireData.types.find(t => t.id === type)?.label || type;

  await window.emailjs.send(cfg.serviceId, cfg.ownerTemplateId, {
    to_email:   ownerEmail,
    from_name:  data.name,
    from_email: data.email,
    hire_type:  label,
    message:    Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n'),
    ...data,
  });

  if (cfg.hirerTemplateId) {
    await window.emailjs.send(cfg.serviceId, cfg.hirerTemplateId, {
      to_email:  data.email,
      to_name:   data.name,
      hire_type: label,
    });
  }
}

/* ── MAILTO FALLBACK ─────────────────────────────────────────── */

function sendMailto(data, type, ownerEmail) {
  const label   = hireData.types.find(t => t.id === type)?.label || type;
  const subject = `Hire Request: ${label} — ${data.name || ''}`;
  const lines   = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => k === 'docLink'
      ? `Requirements Document: ${v} (please ensure link is publicly accessible)`
      : `${k}: ${v}`
    );
  window.open(`mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n\n'))}`);
}
