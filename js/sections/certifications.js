import { ICONS } from '../utils/icons.js';

function buildCard(cert) {
  const viewBtn = cert.link
    ? `<a href="${cert.link}" class="cert-view-btn" target="_blank" rel="noopener noreferrer">
        ${ICONS.external} View Certificate
       </a>`
    : `<a href="#" class="cert-view-btn" style="opacity:0.4;pointer-events:none">
        ${ICONS.external} View Certificate
       </a>`;

  const dlBtn = cert.image
    ? `<a href="#" class="cert-dl-btn"
            data-dl-src="${cert.image}"
            data-dl-name="${cert.id}.${cert.image.split('.').pop()}">
        ${ICONS.download} Download
       </a>`
    : `<a href="#" class="cert-dl-btn" style="opacity:0.4;pointer-events:none">
        ${ICONS.download} Download
       </a>`;

  const badges = [
    cert.issuer  ? `<span class="cert-badge">${cert.issuer}</span>`   : '',
    cert.provider && cert.provider !== cert.issuer
                 ? `<span class="cert-badge">${cert.provider}</span>` : '',
    `<span class="cert-date">${cert.date}</span>`,
  ].join('');

  const imgWrap = cert.image
    ? `<div class="cert-img-wrap lb-trigger"
            data-lb-src="${cert.image}"
            data-lb-caption="${cert.title} — ${cert.issuer}">
        <img src="${cert.image}" alt="${cert.title}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="cert-img-placeholder" style="display:none">${cert.placeholder || '📜'}</div>
        <div class="lb-zoom-icon">${ICONS.zoom}</div>
       </div>`
    : `<div class="cert-img-wrap cert-icon-wrap">
        <span class="cert-icon-emoji">${cert.placeholder || '📜'}</span>
       </div>`;

  return `
    <div class="cert-card-full" data-cert-id="${cert.id}">
      ${imgWrap}
      <div class="cert-body">
        <div class="cert-badge-row">${badges}</div>
        <h3 class="cert-title">${cert.title}</h3>
        <p class="cert-desc">${cert.desc}</p>
        <div class="cert-skills-label">${cert.skillsLabel}</div>
        <div class="cert-skill-tags">
          ${cert.skills.map(s => `<span>${s}</span>`).join('')}
        </div>
        <div class="cert-btn-row">${viewBtn}${dlBtn}</div>
        <div class="cert-expand-row">
          <span class="cert-expand-label">Details</span>
          ${ICONS.expand}
        </div>
      </div>
    </div>`;
}

export async function renderCertifications() {
  const container = document.getElementById('section-certifications');
  if (!container) return;
  const d = await fetch('data/certifications.json').then(r => r.json());

  container.innerHTML = `
    <section class="section" id="certifications">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <div class="cert-cards-detailed">
          ${d.items.map(buildCard).join('')}
        </div>
      </div>
    </section>`;
}
