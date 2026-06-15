import { ICONS } from '../utils/icons.js';

function buildLink(l) {
  const icon = l.type === 'linkedin' ? ICONS.linkedin : ICONS.external;
  return `<a href="${l.href}" class="cert-view-btn" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
    ${icon} ${l.label}
  </a>`;
}

function buildCard(item) {
  const badges = `
    <span class="cert-badge">${item.company}</span>
    <span class="cert-badge">${item.location}</span>
    <span class="cert-date">${item.period}</span>`;

  const imgWrap = item.image
    ? `<div class="cert-img-wrap lb-trigger"
            data-lb-src="${item.image}"
            data-lb-caption="${item.company}">
        <img src="${item.image}" alt="${item.company}" loading="lazy"
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
        <div class="cert-badge-row">${badges}</div>
        <h3 class="cert-title">${item.role}</h3>
        <p class="cert-desc">${item.desc}</p>
        <div class="cert-skills-label">${item.stackLabel}</div>
        <div class="cert-skill-tags">
          ${item.stack.map(s => `<span>${s}</span>`).join('')}
        </div>
        <div class="cert-btn-row">
          ${item.links.map(buildLink).join('')}
        </div>
        <div class="cert-expand-row">
          <span class="cert-expand-label">Details</span>
          ${ICONS.expand}
        </div>
      </div>
    </div>`;
}

export async function renderExperience() {
  const container = document.getElementById('section-experience');
  if (!container) return;
  const d = await fetch('data/experience.json').then(r => r.json());

  container.innerHTML = `
    <section class="section" id="experience">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <div class="cert-cards-detailed">
          ${d.items.map(buildCard).join('')}
        </div>
      </div>
    </section>`;
}
