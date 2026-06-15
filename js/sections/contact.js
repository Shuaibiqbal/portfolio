import { ICONS } from '../utils/icons.js';

export async function renderContact() {
  const container = document.getElementById('section-contact');
  if (!container) return;

  const d      = await fetch('data/contact.json').then(r => r.json());
  const links  = window.LINKS || {};
  const info   = links.contact || {};
  const social = links.social  || {};
  const resume = links.resume  || '';

  const directHtml = `
    <div class="contact-item">
      <span class="contact-label">Email</span>
      <a href="mailto:${info.email}" class="contact-value">${info.email}</a>
    </div>
    <div class="contact-item">
      <span class="contact-label">Phone</span>
      <a href="${info.phone_1?.href || ''}" class="contact-value">${info.phone_1?.display || ''}</a>
      <a href="${info.phone_2?.href || ''}" class="contact-value">${info.phone_2?.display || ''}</a>
    </div>
    <div class="contact-item">
      <span class="contact-label">Location</span>
      <span class="contact-value">${info.location}</span>
    </div>`;

  const socialHtml = (d.social || []).map(key => {
    const s = social[key];
    if (!s) return '';
    return `<div class="contact-item">
      <span class="contact-label">${s.label}</span>
      <a href="${s.url}" class="contact-value" target="_blank" rel="noopener">${s.display}</a>
    </div>`;
  }).join('');

  const whatsappHtml = (d.whatsapp || []).length ? `
    <div class="contact-wa-group">
      <span class="contact-wa-label">WhatsApp</span>
      ${(d.whatsapp || []).map(key => {
        const s = social[key];
        if (!s) return '';
        return `<a href="${s.url}" class="contact-wa-btn" target="_blank" rel="noopener noreferrer">
          ${ICONS.whatsapp}
          <span>Chat on WhatsApp</span>
          <span class="contact-wa-num">${s.display}</span>
        </a>`;
      }).join('')}
    </div>` : '';

  container.innerHTML = `
    <section class="section dark" id="contact">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <div class="contact-grid">
          <div class="contact-col">
            ${directHtml}
          </div>
          <div class="contact-col">
            ${socialHtml}
            ${whatsappHtml}
            <div class="contact-resume">
              <a href="${resume}" class="btn btn-primary" target="_blank" rel="noopener">View Resume</a>
              <a href="${resume}" class="btn btn-outline" download>Download CV</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}
