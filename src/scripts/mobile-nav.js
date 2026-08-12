function init() {
  const button = document.querySelector('[data-nav-toggle]');
  const sheet = document.querySelector('[data-nav-sheet]');
  if (!button || !sheet) return;

  const close = () => {
    sheet.setAttribute('data-open', 'false');
    button.setAttribute('aria-expanded', 'false');
  };
  const open = () => {
    sheet.setAttribute('data-open', 'true');
    button.setAttribute('aria-expanded', 'true');
    const firstLink = sheet.querySelector('a');
    if (firstLink instanceof HTMLElement) firstLink.focus();
  };

  button.addEventListener('click', () => {
    const isOpen = sheet.getAttribute('data-open') === 'true';
    isOpen ? close() : open();
  });

  sheet.addEventListener('click', (event) => {
    if (event.target === sheet) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sheet.getAttribute('data-open') === 'true') {
      close();
      button.focus();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
