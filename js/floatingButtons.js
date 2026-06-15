/* ──────────────────────────────────────────────────────────────
   floatingButtons.js
   • Desktop: vertical floating nav sidebar in the right gutter
   • Mobile:  WhatsApp button bottom-left
   ────────────────────────────────────────────────────────────── */

/* ── INLINE SVG ICONS ────────────────────────────────────────── */
const ICONS = {
  home:    `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  about:   `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  exp:     `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
  projects:`<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  skills:  `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  education:`<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  certs:   `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  learning:`<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  blog:    `<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  ai:      `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  contact: `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  github:  `<svg viewBox="0 0 24 24" class="fn-fill"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  linkedin:`<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  email:   `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  whatsapp:`<svg viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
};

/* ── NAV ITEMS ───────────────────────────────────────────────── */
const NAV_ITEMS = [
  { icon: 'home',      label: 'Home',           href: '#home',           isInternal: true  },
  { icon: 'about',     label: 'About',          href: '#about',          isInternal: true  },
  { icon: 'exp',       label: 'Experience',     href: '#experience',     isInternal: true  },
  { icon: 'projects',  label: 'Projects',       href: '#projects',       isInternal: true  },
  { icon: 'skills',    label: 'Skills',         href: '#skills',         isInternal: true  },
  { icon: 'education', label: 'Education',      href: '#education',      isInternal: true  },
  { icon: 'certs',     label: 'Certifications', href: '#certifications', isInternal: true  },
  { icon: 'learning',  label: 'Learning',       href: '#learning',       isInternal: true  },
  { icon: 'blog',      label: 'Blog',           href: '#blog',           isInternal: true  },
  { icon: 'ai',        label: 'AI Assistant',   href: '#ai-assistant',   isInternal: true  },
  { icon: 'contact',   label: 'Contact',        href: '#contact',        isInternal: true  },
  null, // divider
  { icon: 'github',    label: 'GitHub',         href: null,              isInternal: false, linkKey: 'github'   },
  { icon: 'linkedin',  label: 'LinkedIn',       href: null,              isInternal: false, linkKey: 'linkedin' },
  { icon: 'email',     label: 'Email',          href: null,              isInternal: false, linkKey: 'email'    },
];

/* ── DESKTOP FLOATING SIDEBAR ────────────────────────────────── */
export function initFloatingNav() {
  const links = window.LINKS?.social || {};

  const bar = document.createElement('nav');
  bar.className = 'fn-bar';
  bar.setAttribute('aria-label', 'Quick navigation');

  NAV_ITEMS.forEach(item => {
    if (item === null) {
      const div = document.createElement('div');
      div.className = 'fn-divider';
      bar.appendChild(div);
      return;
    }

    const href = item.isInternal
      ? item.href
      : (links[item.linkKey]?.url || '#');

    const el = document.createElement('a');
    el.className   = 'fn-btn';
    el.href        = href;
    el.setAttribute('data-label', item.label);
    el.setAttribute('data-section', item.href?.replace('#', '') || '');
    el.setAttribute('aria-label', item.label);
    if (!item.isInternal) {
      el.target = '_blank';
      el.rel    = 'noopener noreferrer';
    }
    el.innerHTML = ICONS[item.icon] || '';
    bar.appendChild(el);
  });

  document.body.appendChild(bar);
  initScrollSpy(bar);
}

/* ── SCROLL SPY: highlight active section ────────────────────── */
function initScrollSpy(bar) {
  const sectionIds = NAV_ITEMS
    .filter(i => i && i.isInternal && i.href !== '#home')
    .map(i => i.href.replace('#', ''));

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const buttons = bar.querySelectorAll('.fn-btn[data-section]');

  function setActive(id) {
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === id);
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  // Default: home active on load
  setActive('home');
  window.addEventListener('scroll', () => {
    if (window.scrollY < 80) setActive('home');
  }, { passive: true });
}

/* ── MOBILE WHATSAPP BUTTON ──────────────────────────────────── */
export function initWhatsAppButton() {
  const links  = window.LINKS?.social || {};
  const waData = links.whatsapp_1;
  const href   = waData?.url || 'https://wa.me/923457134603';

  const btn = document.createElement('a');
  btn.className = 'wa-btn';
  btn.href      = href;
  btn.target    = '_blank';
  btn.rel       = 'noopener noreferrer';
  btn.setAttribute('aria-label', 'Chat on WhatsApp');
  btn.innerHTML = ICONS.whatsapp;

  document.body.appendChild(btn);
}
