export async function renderFooter() {
  const container = document.getElementById('section-footer');
  if (!container) return;

  const d      = await fetch('data/footer.json').then(r => r.json());
  const social = window.LINKS?.social || {};

  const linksHtml = d.links.map(key => {
    const s = social[key];
    if (!s) return '';
    return `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`;
  }).join('');

  container.innerHTML = `
    <footer class="footer">
      <div class="container footer-inner">
        <p class="footer-copy">${d.copyright}</p>
        <div class="footer-links">${linksHtml}</div>
      </div>
    </footer>`;
}
