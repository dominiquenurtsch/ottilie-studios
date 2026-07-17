// Partial loader + site scripts
(async () => {
  // Compute base prefix. Sub-pages live in /posts/ and /products/, so they
  // need "../" to reach the site root. Add any new subfolder here.
  const isNested = /\/(posts|products)\//.test(location.pathname);
  const base = isNested ? '../' : './';

  const hosts = document.querySelectorAll('[data-include]');
  await Promise.all([...hosts].map(async (el) => {
    const href = el.dataset.include;
    const res = await fetch(href);
    let html = await res.text();
    html = html.replaceAll('{BASE}', base);
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    el.replaceWith(tpl.content);
  }));

  // Mark active nav link
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(`[data-nav="${page}"]`).forEach(a => a.classList.add('is-active'));
  }

  // Footer year
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Journal tab filtering
  const tabs = document.getElementById('journal-tabs');
  const cards = document.getElementById('journal-cards');
  const searchInput = document.getElementById('journal-search');

  if (tabs && cards) {
    tabs.addEventListener('click', e => {
      const pill = e.target.closest('[data-filter]');
      if (!pill) return;
      e.preventDefault();
      tabs.querySelectorAll('.pill').forEach(p => p.classList.remove('pill--on'));
      pill.classList.add('pill--on');
      const filter = pill.dataset.filter;
      cards.querySelectorAll('.card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  }

  if (searchInput && cards) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      cards.querySelectorAll('.card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }
})();
