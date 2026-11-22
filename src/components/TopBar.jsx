// ============================================================
// VIDEO PART 3 - STRUCTURE: this is one small piece of the page.
// VIDEO PART 6 - REACT: this piece receives props and shows them.
// ============================================================
//
// TopBar = the strip at the very top of the page.
// It holds the logo, the three section links, and the theme button.
//
// PROPS are values that App.jsx gives to this component:
//   galleryName    -> the words "CDArt Gallery"
//   theme          -> "light" or "dark"
//   onToggleTheme  -> a function App gave us; clicking the button calls it
//
// PART 3 - HTML ELEMENTS USED HERE:
// <header> is the top strip. <nav> marks the main menu. <a> links
// to a section on the page. <button> runs a function.

function TopBar({ galleryName, theme, onToggleTheme }) {
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

      {/* PART 6 - STATE: clicking this button changes App's theme state,
          and React redraws the page with the new colours. */}
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

/* PART 3 - BRANDNAME HELPER
   ------------------------------------------------------------
   This tiny helper is kept here so we do not need an extra file.
   "CDArt Gallery" becomes a gold "CD" plus "Art Gallery".
   CD means Card Deck, so the first two letters get the accent
   colour. If the name does not start with "CD", it is printed as
   it is. */
export function BrandName({ name }) {
  if (!name || !name.startsWith('CD')) return name;

  return (
    <>
      <span className="brand-mark" title="CD = Card Deck">CD</span>
      {name.slice(2)}
    </>
  );
}

export default TopBar;
