import { ICONS } from '../utils/icons.js';

function buildCard(item, idx) {
  const imgWrap = item.image
    ? `<div class="cert-img-wrap lb-trigger"
            data-lb-src="${item.image}"
            data-lb-caption="${item.title}">
        <img src="${item.image}" alt="${item.title}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="cert-img-placeholder" style="display:none">📄</div>
        <div class="lb-zoom-icon">${ICONS.zoom}</div>
       </div>`
    : `<div class="cert-img-wrap cert-icon-wrap">
        <span class="cert-icon-emoji">📄</span>
       </div>`;

  return `
    <div class="cert-card-full" data-cert-id="pub-${idx}">
      ${imgWrap}
      <div class="cert-body">
        <div class="cert-badge-row">
          <span class="cert-badge">${item.badge}</span>
        </div>
        <h3 class="cert-title">${item.title}</h3>
        <p class="cert-desc">${item.desc}</p>
        <div class="cert-btn-row">
          <a href="${item.link}" class="cert-view-btn" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
            ${ICONS.external} Show publication
          </a>
        </div>
        <div class="cert-expand-row">
          <span class="cert-expand-label">Details</span>
          ${ICONS.expand}
        </div>
      </div>
    </div>`;
}

function attachExpandToggle(container) {
  container.querySelectorAll('.cert-expand-row').forEach(row => {
    row.addEventListener('click', () => {
      const card = row.closest('.cert-card-full');
      if (card) card.classList.toggle('expanded');
    });
  });
}

export async function renderPublications() {
  const container = document.getElementById('section-publications');
  if (!container) return;
  const d = await fetch('data/publications.json').then(r => r.json());

  container.innerHTML = `
    <section class="section" id="publications">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <div class="cert-cards-detailed">
          ${d.items.map(buildCard).join('')}
        </div>
      </div>
    </section>`;

  attachExpandToggle(container);
}
