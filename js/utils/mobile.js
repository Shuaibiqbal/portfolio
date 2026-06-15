export function initMobileCards() {
  document.addEventListener('click', e => {
    if (window.innerWidth > 600) return;
    const row = e.target.closest('.cert-expand-row');
    if (!row) return;
    e.stopPropagation();
    row.closest('.cert-card-full')?.classList.toggle('expanded');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 600) {
      document.querySelectorAll('.cert-card-full.expanded')
        .forEach(c => c.classList.remove('expanded'));
    }
  });
}
