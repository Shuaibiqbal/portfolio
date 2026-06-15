import { ICONS } from '../utils/icons.js';

function buildBtn(btn) {
  if (btn.type === 'download') {
    return btn.href && btn.href !== '#'
      ? `<a href="#" class="cert-dl-btn"
              data-dl-src="${btn.href}"
              data-dl-name="${btn.href.split('/').pop()}">
          ${ICONS.download} ${btn.label}
         </a>`
      : `<a href="#" class="cert-dl-btn" style="opacity:0.4;pointer-events:none">
          ${ICONS.download} ${btn.label}
         </a>`;
  }
  return btn.href && btn.href !== '#'
    ? `<a href="${btn.href}" class="cert-view-btn" target="_blank" rel="noopener">
        ${ICONS.external} ${btn.label}
       </a>`
    : `<a href="#" class="cert-view-btn" style="opacity:0.4;pointer-events:none">
        ${ICONS.external} ${btn.label}
       </a>`;
}

function buildCard(item) {
  const imgWrap = item.image
    ? `<div class="cert-img-wrap lb-trigger"
            data-lb-src="${item.image}"
            data-lb-caption="${item.degree} — ${item.school}">
        <img src="${item.image}" alt="${item.degree}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="cert-img-placeholder" style="display:none">${item.placeholder}</div>
        <div class="lb-zoom-icon">${ICONS.zoom}</div>
       </div>`
    : `<div class="cert-img-wrap cert-icon-wrap">
        <span class="cert-icon-emoji">${item.placeholder}</span>
       </div>`;

  return `
    <div class="cert-card-full" data-cert-id="${item.id}">
      ${imgWrap}
      <div class="cert-body">
        <div class="cert-badge-row">
          <span class="cert-badge">${item.school}</span>
          <span class="cert-badge">${item.gpa}</span>
          <span class="cert-date">${item.year}</span>
        </div>
        <h3 class="cert-title">${item.degree}</h3>
        <p class="cert-desc">${item.desc}</p>
        <div class="cert-skills-label">${item.focusLabel}</div>
        <div class="cert-skill-tags">
          ${item.focus.map(f => `<span>${f}</span>`).join('')}
        </div>
        <div class="cert-btn-row">
          ${item.buttons.map(buildBtn).join('')}
        </div>
        <div class="cert-expand-row">
          <span class="cert-expand-label">Details</span>
          ${ICONS.expand}
        </div>
      </div>
    </div>`;
}

export async function renderEducation() {
  const container = document.getElementById('section-education');
  if (!container) return;
  const d = await fetch('data/education.json').then(r => r.json());

  container.innerHTML = `
    <section class="section dark" id="education">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <div class="cert-cards-detailed">
          ${d.items.map(buildCard).join('')}
        </div>
      </div>
    </section>`;
}
