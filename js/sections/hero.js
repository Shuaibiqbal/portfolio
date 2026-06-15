import { ICONS } from '../utils/icons.js';

export async function renderHero() {
  const container = document.getElementById('section-hero');
  if (!container) return;

  const d     = await fetch('data/hero.json').then(r => r.json());
  const links = window.LINKS?.social || {};

  const btnsHtml = d.buttons.map(b => {
    const idAttr = b.id ? ` id="${b.id}"` : '';
    if (b.type === 'ai') {
      return `<a href="${b.href}" class="btn btn-ai"${idAttr}>
        <svg class="btn-ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        </svg>
        Ask AI About Me
      </a>`;
    }
    return `<a href="${b.href}" class="btn btn-${b.type}"${idAttr}>${b.label}</a>`;
  }).join('');

  const socialsHtml = d.socials.map(key => {
    const s = links[key];
    if (!s) return '';
    const isEmail = key === 'email';
    return `<a href="${s.url}" class="social-icon" aria-label="${s.label}"${isEmail ? '' : ' target="_blank" rel="noopener"'}>
      ${ICONS[s.icon] || ICONS.external}
    </a>`;
  }).join('');

  const sublines = d.subheading.split('\n');

  const bgStyle = d.image ? ` style="background-image:url('${d.image}')"` : '';

  container.innerHTML = `
    <section class="hero" id="home">
      <div class="hero-bg"${bgStyle}></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-tag">${d.tagline}</span>
        <h1 class="hero-heading">${d.heading}<br>${d.name}</h1>
        <h2 class="hero-sub">${sublines.join('<br>')}</h2>
        <p class="hero-desc">${d.description}</p>
        <div class="hero-buttons">${btnsHtml}</div>
        <div class="hero-socials">${socialsHtml}</div>
      </div>
    </section>`;
}
