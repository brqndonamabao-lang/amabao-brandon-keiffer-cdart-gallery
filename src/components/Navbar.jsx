// Navbar: brand + section links + theme switch.
// Props (read-only): galleryName, theme, onToggleTheme
import BrandName from './BrandName';

function Navbar({ galleryName, theme, onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header className="navbar">
      <a className="brand" href="#top">
        <BrandName name={galleryName} />
      </a>

      <nav aria-label="Main navigation">
        <ul className="nav-links">
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#upload">Post card</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      <button
        type="button"
        className="theme-btn"
        onClick={onToggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? '☀ Light' : '☾ Dark'}
      </button>
    </header>
  );
}

export default Navbar;
