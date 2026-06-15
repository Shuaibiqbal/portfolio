import { ICONS } from './icons.js';

export function initLightbox() {
  if (document.getElementById('certLightbox')) return;

  const el = document.createElement('div');
  el.id = 'certLightbox';
  el.className = 'lightbox';
  el.innerHTML = `
    <div class="lightbox-backdrop" id="lbBackdrop"></div>
    <div class="lightbox-content">
      <img class="lightbox-img" id="lightboxImg" src="" alt="">
      <p class="lightbox-caption" id="lightboxCaption"></p>
    </div>
    <button class="lightbox-close" id="lbClose" aria-label="Close">${ICONS.close}</button>`;
  document.body.appendChild(el);

  const lb    = el;
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCaption');

  function open(src, caption) {
    lbImg.src = src;
    lbImg.alt = caption || '';
    lbCap.textContent = caption || '';
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  window.openLightbox  = open;
  window.closeLightbox = close;

  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbBackdrop').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  document.addEventListener('click', e => {
    const trigger = e.target.closest('.lb-trigger');
    if (!trigger) return;
    const src = trigger.dataset.lbSrc;
    if (src) open(src, trigger.dataset.lbCaption || '');
  });

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-dl-src]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const src  = btn.dataset.dlSrc;
    const name = btn.dataset.dlName || src.split('/').pop();
    fetch(src)
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a   = document.createElement('a');
        a.href = url; a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      })
      .catch(() => window.open(src, '_blank'));
  });
}
