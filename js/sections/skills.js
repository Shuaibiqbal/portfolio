import { ICONS } from '../utils/icons.js';

export async function renderSkills() {
  const container = document.getElementById('section-skills');
  if (!container) return;
  const d = await fetch('data/skills.json').then(r => r.json());

  const cardsHtml = d.categories.map(cat => `
    <div class="cert-card-full">
      <div class="cert-img-wrap cert-icon-wrap">
        <span class="cert-icon-emoji">${cat.icon}</span>
      </div>
      <div class="cert-body">
        <div class="cert-badge-row">
          <span class="cert-badge">${cat.badge}</span>
        </div>
        <h3 class="cert-title">${cat.title}</h3>
        <p class="cert-desc">${cat.desc}</p>
        <div class="cert-skills-label">${cat.skillsLabel}</div>
        <div class="cert-skill-tags">
          ${cat.skills.map(s => `<span>${s}</span>`).join('')}
        </div>
        <div class="cert-expand-row">
          <span class="cert-expand-label">Details</span>
          ${ICONS.expand}
        </div>
      </div>
    </div>`).join('');

  container.innerHTML = `
    <section class="section" id="skills">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <div class="cert-cards-detailed">${cardsHtml}</div>
      </div>
    </section>`;
}
