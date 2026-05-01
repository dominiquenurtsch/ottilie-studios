// Partial loader + site scripts
(async () => {
  // Compute base prefix (sub-pages sit in /posts/, so need "../")
  const depth = location.pathname.replace(/\/$/, '').split('/').filter(Boolean).length;
  const isPostPage = location.pathname.includes('/posts/');
  const base = isPostPage ? '../' : './';

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
})();
