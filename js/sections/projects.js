import { ICONS } from '../utils/icons.js';

function buildCard(item) {
  const badges = item.tags.map(t => `<span class="cert-badge">${t}</span>`).join('');

  const imgWrap = item.image
    ? `<div class="cert-img-wrap lb-trigger"
            data-lb-src="${item.image}"
            data-lb-caption="${item.title}">
        <img src="${item.image}" alt="${item.title}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="cert-img-placeholder" style="display:none">${item.placeholder}</div>
        <div class="lb-zoom-icon">${ICONS.zoom}</div>
       </div>`
    : `<div class="cert-img-wrap cert-icon-wrap">
        <span class="cert-icon-emoji">${item.placeholder}</span>
       </div>`;

  const viewBtn = item.demo
    ? `<a href="${item.demo}" class="cert-view-btn" target="_blank" rel="noopener">
        ${ICONS.external} View Project
       </a>`
    : `<a href="#" class="cert-view-btn" style="opacity:0.4;pointer-events:none">
        ${ICONS.external} View Project
       </a>`;

  const ghBtn = item.github
    ? `<a href="${item.github}" class="cert-dl-btn" target="_blank" rel="noopener">
        ${ICONS.code} GitHub
       </a>`
    : `<a href="#" class="cert-dl-btn" style="opacity:0.4;pointer-events:none">
        ${ICONS.code} GitHub
       </a>`;

  return `
    <div class="cert-card-full" data-cert-id="${item.id}">
      ${imgWrap}
      <div class="cert-body">
        <div class="cert-badge-row">${badges}</div>
        <h3 class="cert-title">${item.title}</h3>
        <p class="cert-desc">${item.desc}</p>
        <div class="cert-skills-label">${item.stackLabel}</div>
        <div class="cert-skill-tags">
          ${item.stack.map(s => `<span>${s}</span>`).join('')}
        </div>
        <div class="cert-btn-row">${viewBtn}${ghBtn}</div>
        <div class="cert-expand-row">
          <span class="cert-expand-label">Details</span>
          ${ICONS.expand}
        </div>
      </div>
    </div>`;
}

export async function renderProjects() {
  const container = document.getElementById('section-projects');
  if (!container) return;
  const d = await fetch('data/projects.json').then(r => r.json());

  container.innerHTML = `
    <section class="section dark" id="projects">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <div class="cert-cards-detailed">
          ${d.items.map(buildCard).join('')}
        </div>
      </div>
    </section>`;
}
