// ─────────────────────────────────────────────────────────────
// NEW SECTION TEMPLATE
// How to use:
//   1. Copy this file  →  js/sections/your-section.js
//   2. Create          →  data/your-section.json
//   3. Add one line to →  data/sections.json
//   4. (Optional) add nav link in data/navbar.json
//   5. (Optional) create css/your-section.css + import in css/style.css
//
// Naming rule: file = "my-section.js" → export = "renderMySection"
// ─────────────────────────────────────────────────────────────

import { ICONS } from '../utils/icons.js';

export async function renderYourSection() {
  const container = document.getElementById('section-your-section');
  if (!container) return;

  const d = await fetch('data/your-section.json').then(r => r.json());

  container.innerHTML = `
    <section class="section" id="your-section">
      <div class="container">

        <h2 class="section-title">
          ${d.title} <span class="accent">${d.titleAccent}</span>
        </h2>
        <p class="section-desc">${d.subtitle}</p>

        <!-- Build your HTML here from JSON data -->
        <div class="cert-cards-detailed">
          ${d.items.map(item => `
            <div class="cert-card-full">
              <div class="cert-body">
                <div class="cert-badge-row">
                  <span class="cert-badge">${item.badge}</span>
                </div>
                <h3 class="cert-title">${item.title}</h3>
                <p class="cert-desc">${item.desc}</p>
              </div>
            </div>`).join('')}
        </div>

      </div>
    </section>`;
}
