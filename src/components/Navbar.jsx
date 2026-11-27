
import themeSun from '../images/theme-sun.svg';
import themeMoon from '../images/theme-moon.svg';

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

      {}
      <button
        type="button"
        className="theme-btn"
        onClick={onToggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <img className="theme-icon" src={isDark ? themeSun : themeMoon} alt="" />
      </button>
    </header>
  );
}


export function BrandName({ name }) {
  if (!name || !name.startsWith('CD')) return name;

  return (
    <>
      <span className="brand-mark" title="CD = Card Deck">CD</span>
      {name.slice(2)}
    </>
  );
}

export default Navbar;
