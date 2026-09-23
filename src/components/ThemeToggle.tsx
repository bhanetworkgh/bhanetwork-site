import { nav } from '../content/site';
import { Icon } from './Icon';

/**
 * The sun/moon toggle.
 *
 * The device setting decides by default. A click overrides it: the choice is
 * stamped on <html data-theme> and remembered in localStorage under
 * THEME_KEY, which the inline script in index.html reads before first paint
 * so there is never a flash of the wrong theme.
 *
 * Both icons are always rendered and CSS shows the right one, so the server
 * and the browser render identical markup whatever the theme.
 */
export const THEME_KEY = 'bha.theme';

function currentTheme(): 'light' | 'dark' {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle() {
  function toggle() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* Private mode or blocked storage: the choice lasts for this page only. */
    }
  }

  return (
    <button type="button" className="icon-btn theme-toggle" onClick={toggle}>
      <span className="theme-icon-sun">
        <Icon name="sun" size={18} />
        <span className="sr-only">{nav.themeToLight}</span>
      </span>
      <span className="theme-icon-moon">
        <Icon name="moon" size={18} />
        <span className="sr-only">{nav.themeToDark}</span>
      </span>
    </button>
  );
}
