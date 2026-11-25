// ============================================================
// VIDEO PART 3 - STRUCTURE: this is one small piece of the page.
// VIDEO PART 6 - REACT: this piece receives props and shows them.
// ============================================================
//
// Navbar = the strip at the very top of the page.
// It holds the logo, the three section links, and the theme button.
//
// PROPS are values that App.jsx gives to this component. Think of
// props like ingredients passed into a recipe:
//   galleryName   -> the words "CDArt Gallery"
//   theme         -> "light" or "dark"
//   onToggleTheme -> a function App gave us; clicking calls it
//
// "Semantic HTML" means using a tag that says what the thing is.
// <header> says "this is the top of the page". <nav> says "this
// is a menu". We could use a plain <div> for both, but then the
// browser and screen readers would not know what they mean.
//
// PART 3 - HTML ELEMENTS USED HERE:
// <header> is the top strip. <nav> marks the main menu. <ul> and
// <li> make a list. <a> links to a section on the page. <button>
// runs a function.

// PART 6 - These two small pictures are the theme icons. `import`
// brings each file in so we can use it like a value.
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

      {/* PART 6 - STATE: clicking this button changes App's theme
          state, and React re-draws the page with the new colours.
          The icon shows the mode you will switch TO: a sun means
          "go light", a moon means "go dark".
          aria-label is the name a screen reader reads out loud,
          because this button has a picture but no visible text. */}
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

export default Navbar;
