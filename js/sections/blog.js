import { ICONS } from '../utils/icons.js';

function buildCard(post) {
  const tags = post.tags.map(t => `<span class="cert-badge">${t}</span>`).join('');

  const imgWrap = post.image
    ? `<div class="cert-img-wrap lb-trigger"
            data-lb-src="${post.image}"
            data-lb-caption="${post.title}">
        <img src="${post.image}" alt="${post.title}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="cert-img-placeholder" style="display:none">✍️</div>
        <div class="lb-zoom-icon">${ICONS.zoom}</div>
       </div>`
    : `<div class="cert-img-wrap cert-icon-wrap">
        <span class="cert-icon-emoji">✍️</span>
       </div>`;

  const readBtn = post.link
    ? `<a href="${post.link}" class="cert-view-btn" target="_blank" rel="noopener noreferrer">
        ${ICONS.external} Read Article
       </a>`
    : `<a href="#" class="cert-view-btn" style="opacity:0.4;pointer-events:none">
        ${ICONS.external} Coming Soon
       </a>`;

  return `
    <div class="cert-card-full" data-cert-id="${post.id}">
      ${imgWrap}
      <div class="cert-body">
        <div class="cert-badge-row">
          ${tags}
          <span class="cert-date">${post.date}</span>
        </div>
        <h3 class="cert-title">${post.title}</h3>
        <p class="cert-desc">${post.excerpt}</p>
        <div class="cert-skills-label">Platform &amp; Read Time</div>
        <div class="cert-skill-tags">
          <span>${post.platform}</span>
          <span>${post.readTime}</span>
        </div>
        <div class="cert-btn-row">${readBtn}</div>
        <div class="cert-expand-row">
          <span class="cert-expand-label">Details</span>
          ${ICONS.expand}
        </div>
      </div>
    </div>`;
}

export async function renderBlog() {
  const container = document.getElementById('section-blog');
  if (!container) return;
  const d = await fetch('data/blog.json').then(r => r.json());

  container.innerHTML = `
    <section class="section dark" id="blog">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <div class="cert-cards-detailed">
          ${d.items.map(buildCard).join('')}
        </div>
      </div>
    </section>`;
}
