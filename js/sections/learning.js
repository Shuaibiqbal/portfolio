import { ICONS } from '../utils/icons.js';

export async function renderLearning() {
  const container = document.getElementById('section-learning');
  if (!container) return;
  const d = await fetch('data/learning.json').then(r => r.json());

  const cardsHtml = d.items.map(item => `
    <div class="cert-card-full">
      <div class="cert-img-wrap cert-icon-wrap">
        <span class="cert-icon-emoji">${item.icon}</span>
      </div>
      <div class="cert-body">
        <div class="cert-badge-row">
          <span class="cert-badge">Active</span>
          <span class="cert-badge">${item.category}</span>
          <span class="cert-date">${item.progress}% complete</span>
        </div>
        <h3 class="cert-title">${item.title}</h3>
        <p class="cert-desc">${item.desc}</p>
        <div class="cert-skills-label">${item.topicsLabel}</div>
        <div class="cert-skill-tags">
          ${item.topics.map(t => `<span>${t}</span>`).join('')}
        </div>
        <div class="learning-progress">
          <div class="progress-label">Progress</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${item.progress}%"></div>
          </div>
        </div>
        <div class="cert-expand-row">
          <span class="cert-expand-label">Details</span>
          ${ICONS.expand}
        </div>
      </div>
    </div>`).join('');

  container.innerHTML = `
    <section class="section dark" id="learning">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <div class="cert-cards-detailed">${cardsHtml}</div>
      </div>
    </section>`;
}
