function init() {
  const button = document.querySelector('[data-search-toggle]');
  const panel = document.querySelector('[data-search-panel]');
  const input = document.querySelector('[data-search-input]');
  const results = document.querySelector('[data-search-results]');
  if (!button || !panel || !input || !results) return;

  let pagefind = null;
  let loaded = false;

  const base = document.documentElement.dataset.base || '/';

  async function ensureLoaded() {
    if (loaded) return;
    loaded = true;
    try {
      pagefind = await import(/* @vite-ignore */ `${base}pagefind/pagefind.js`);
      await pagefind.init();
    } catch {
      results.innerHTML = '<p>Search index unavailable.</p>';
    }
  }

  function close() {
    panel.setAttribute('data-open', 'false');
    button.setAttribute('aria-expanded', 'false');
  }
  async function open() {
    panel.setAttribute('data-open', 'true');
    button.setAttribute('aria-expanded', 'true');
    input.focus();
    await ensureLoaded();
  }

  button.addEventListener('click', () => {
    const isOpen = panel.getAttribute('data-open') === 'true';
    isOpen ? close() : open();
  });

  document.addEventListener('keydown', (event) => {
    const isMeta = event.metaKey || event.ctrlKey;
    if (isMeta && event.key === 'k') {
      event.preventDefault();
      open();
    }
    if (event.key === 'Escape' && panel.getAttribute('data-open') === 'true') {
      close();
      button.focus();
    }
  });

  let debounceHandle;
  input.addEventListener('input', () => {
    clearTimeout(debounceHandle);
    debounceHandle = setTimeout(async () => {
      const query = input.value.trim();
      if (!pagefind || query.length < 2) {
        results.innerHTML = '';
        return;
      }
      const search = await pagefind.search(query);
      const items = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
      results.innerHTML = items
        .map(
          (item) =>
            `<li><a href="${item.url}"><strong>${item.meta.title ?? item.url}</strong><span>${item.excerpt}</span></a></li>`
        )
        .join('');
    }, 150);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
