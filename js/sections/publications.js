import { ICONS } from '../utils/icons.js';

function buildCard(item) {
  return `
    <div class="pub-card">
      <div class="pub-header">
        <span class="pub-badge">${item.badge}</span>
      </div>
      <h3 class="pub-title">${item.title}</h3>
      <p class="pub-desc">${item.desc}</p>
      <div class="pub-btn-row">
        <a href="${item.link}" class="pub-view-btn" target="_blank" rel="noopener noreferrer">
          Show publication ${ICONS.external}
        </a>
      </div>
    </div>`;
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
        <div class="pub-cards">
          ${d.items.map(buildCard).join('')}
        </div>
      </div>
    </section>`;
}
