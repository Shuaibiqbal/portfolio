import { ICONS } from '../utils/icons.js';

export async function renderAbout() {
  const container = document.getElementById('section-about');
  if (!container) return;
  const d = await fetch('data/about.json').then(r => r.json());

  const cardsHtml = d.cards.map(c => `
    <div class="cert-card-full">
      <div class="cert-img-wrap cert-icon-wrap">
        <span class="cert-icon-emoji">${c.icon}</span>
      </div>
      <div class="cert-body">
        <h3 class="cert-title">${c.title}</h3>
        <p class="cert-desc">${c.desc}</p>
        <div class="cert-expand-row">
          <span class="cert-expand-label">Details</span>
          ${ICONS.expand}
        </div>
      </div>
    </div>`).join('');

  const m = d.modal;

  const achievementsHtml = m.achievements.map(a => `<li>${a}</li>`).join('');
  const expertiseHtml    = m.expertise.map(e =>
    `<li><strong>${e.label}:</strong> ${e.skills}</li>`
  ).join('');
  const expHtml = m.experience.map(e =>
    `<li><strong>${e.role}</strong> — ${e.company}, ${e.location} (${e.period})</li>`
  ).join('');
  const eduHtml = m.education.map(e =>
    `<li><strong>${e.degree}</strong> — ${e.school} (${e.year})</li>`
  ).join('');

  container.innerHTML = `
    <section class="section dark" id="about">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.summary}</p>
        <button class="btn-outline about-more-btn" id="aboutMoreBtn">View Full Profile</button>
        <div class="cert-cards-detailed">${cardsHtml}</div>
      </div>
    </section>

    <div class="about-modal-overlay" id="aboutModal">
      <div class="about-modal">
        <button class="about-modal-close" id="aboutModalClose">✕</button>
        <h2 class="about-modal-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="about-modal-summary">${m.fullSummary}</p>
        <div class="about-modal-grid">
          <div class="about-modal-block">
            <h4>🚀 Key Achievements</h4>
            <ul>${achievementsHtml}</ul>
          </div>
          <div class="about-modal-block">
            <h4>🛠️ Technical Expertise</h4>
            <ul>${expertiseHtml}</ul>
          </div>
          <div class="about-modal-block">
            <h4>💼 Experience</h4>
            <ul>${expHtml}</ul>
          </div>
          <div class="about-modal-block">
            <h4>🎓 Education</h4>
            <ul>${eduHtml}</ul>
          </div>
        </div>
      </div>
    </div>`;

  const modal = document.getElementById('aboutModal');

  window.openAboutModal = () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeAboutModal = (e) => {
    if (e && e.target !== modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.getElementById('aboutMoreBtn').addEventListener('click', window.openAboutModal);
  document.getElementById('aboutModalClose').addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  });
  modal.addEventListener('click', window.closeAboutModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.closeAboutModal();
  });
}
