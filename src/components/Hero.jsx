import { BrandName } from './Navbar';

// ============================================================
// VIDEO PART 3 - STRUCTURE: the first big section of the page.
// VIDEO PART 8 - WALKTHROUGH: this is the first thing a visitor sees.
// ============================================================
//
// Hero = the welcome area. "Hero" is a web design word for the
// big first block at the top of a page, usually with a title and
// a button.
//
// It explains the site in one line and gives two buttons.
//
// PROPS: galleryName, onSurprise
//
// PART 3 - HTML ELEMENTS USED HERE:
// <h1> is the biggest heading, and a page should have only one.
// <a> jumps to another part of the page. <button> runs a function.

function Hero({ galleryName, onSurprise }) {
  return (
    <section className="hero" id="top">
      <p className="eyebrow">A card gallery for artists</p>


      <h1>
        Welcome to <BrandName name={galleryName} />.<br />
        Come look around.
      </h1>

      <p className="hero-text">
        Discover creative works from artists, explore their collections, and find
        inspiration from different styles.
      </p>

      <div className="hero-actions">

        <a className="btn btn-primary" href="#gallery">Explore Artwork</a>
        <button type="button" className="btn btn-ghost" onClick={onSurprise}>
          Surprise me
        </button>
      </div>
    </section>
  );
}

export default Hero;
