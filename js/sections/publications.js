export async function renderMySection() {
  const container = document.getElementById('section-my-section');
  if (!container) return;
  const d = await fetch('data/my-section.json').then(r => r.json());

  container.innerHTML = `
    <section class="section" id="my-section">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <!-- your HTML here -->
      </div>
    </section>`;
}
