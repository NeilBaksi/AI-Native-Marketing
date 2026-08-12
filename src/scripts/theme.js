const STORAGE_KEY = 'theme';
const STATES = ['system', 'light', 'dark'];

function apply(state) {
  const root = document.documentElement;
  if (state === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', state);
  }
  const button = document.querySelector('[data-theme-toggle]');
  if (button) {
    button.setAttribute('data-theme-state', state);
    button.setAttribute('aria-label', `Theme: ${state}. Click to change.`);
  }
}

function current() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return STATES.includes(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

function init() {
  apply(current());
  const button = document.querySelector('[data-theme-toggle]');
  if (!button) return;
  button.addEventListener('click', () => {
    const next = STATES[(STATES.indexOf(current()) + 1) % STATES.length];
    try {
      if (next === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this page view */
    }
    apply(next);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
