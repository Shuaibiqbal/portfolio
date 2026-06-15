import { initLightbox }      from './utils/lightbox.js';
import { initMobileCards }   from './utils/mobile.js';
import { initAiAssistant }   from './sections/ai-assistant.js';
import { initHireModal }     from './hire.js';
import { initFloatingChat }  from './floatingChat.js';
import { initFloatingNav, initWhatsAppButton } from './floatingButtons.js';

// "my-section" → "renderMySection"
function toRenderFn(id) {
  return 'render' + id.split('-')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join('');
}

async function boot() {
  const [config, sections, links] = await Promise.all([
    fetch('data/config.json').then(r => r.json()),
    fetch('data/sections.json').then(r => r.json()),
    fetch('data/links.json').then(r => r.json()),
  ]);

  window.AI_BACKEND_URL = config.aiBackendUrl;
  window.CONFIG         = config;
  window.LINKS          = links;

  const root = document.getElementById('portfolio-root');
  sections.forEach(({ id }) => {
    const div = document.createElement('div');
    div.id = `section-${id}`;
    root.appendChild(div);
  });

  const modules = await Promise.all(
    sections.map(({ id }) => import(`./sections/${id}.js`))
  );

  await Promise.all(
    modules.map((mod, i) => {
      const fn = toRenderFn(sections[i].id);
      return typeof mod[fn] === 'function' ? mod[fn]() : Promise.resolve();
    })
  );

  initReadMore();
  initLightbox();
  initMobileCards();
  initAiAssistant();
  initHireModal();
  initFloatingChat();
  initFloatingNav();
  initWhatsAppButton();
  initScrollAnimations();
}

boot().catch(err => console.error('[Portfolio] Boot error:', err));

/* ── READ MORE / READ LESS ───────────────────────────────────── */
function initReadMore() {
  document.querySelectorAll('.cert-desc').forEach(desc => {
    if (desc.scrollHeight <= desc.clientHeight) return;
    const btn = document.createElement('button');
    btn.className = 'cert-read-more';
    btn.textContent = 'Read more';
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const expanded = desc.classList.toggle('cert-desc-expanded');
      btn.textContent = expanded ? 'Read less' : 'Read more';
    });
    desc.insertAdjacentElement('afterend', btn);
  });
}

/* ── SCROLL ANIMATIONS ───────────────────────────────────────── */
function initScrollAnimations() {
  const els = document.querySelectorAll(
    '.cert-card-full, .card, .timeline-card, .skill-cat-card, .contact-card, .blog-card'
  );
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.animDelay || 0;
        setTimeout(() => el.classList.add('anim-visible'), Number(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.08 });

  els.forEach((el, i) => {
    el.classList.add('anim-fade-up');
    el.dataset.animDelay = Math.min(i % 4, 3) * 70;
    observer.observe(el);
  });
}
