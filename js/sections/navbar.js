export async function renderNavbar() {
  const container = document.getElementById('section-navbar');
  if (!container) return;
  const d = await fetch('data/navbar.json').then(r => r.json());

  const AI_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;display:inline;vertical-align:middle;margin-right:4px;"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`;

  const links = d.links.map((l, i) => l.isAi
    ? `<a href="${l.href}" class="nav-ai-link">${AI_SVG}${l.label}</a>`
    : `<a href="${l.href}"${i === 0 ? ' class="active"' : ''}>${l.label}</a>`
  ).join('');

  container.innerHTML = `
    <header class="navbar">
      <div class="container nav-wrapper">
        <a href="#home" class="logo">${d.logo}<span class="dot">.</span></a>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <nav id="navMenu">${links}</nav>
      </div>
    </header>`;

  initNavbar();
}

export function initNavbar() {
  const btn  = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}
