// HeroSection: landing area with a short intro and two working buttons.
// Props: galleryName, cardCount, workCount, totalLikes, onSurprise
import BrandName from './BrandName';

function HeroSection({ galleryName, cardCount, workCount, totalLikes, onSurprise }) {
  return (
    <section className="hero" id="top">
      <p className="eyebrow">A card gallery for artists</p>
      <h1>
        Welcome to <BrandName name={galleryName} />.<br />
        Come look around.
      </h1>
      <p className="hero-text">
        One artist, one card, a whole world folded into a square. Open a deck
        and you might find a single bold piece or a small series that belongs
        together. Wander until something stops you, leave a heart, then follow
        the maker somewhere new. Artists: add your own card to the wall and let
        new eyes find you. No account, no noise.
      </p>

      <div className="hero-actions">
        <a className="btn btn-primary" href="#gallery">Browse cards</a>
        <button type="button" className="btn btn-ghost" onClick={onSurprise}>
          Surprise me
        </button>
      </div>

      <dl className="hero-stats">
        <div>
          <dt>Cards</dt>
          <dd>{cardCount}</dd>
        </div>
        <div>
          <dt>Works</dt>
          <dd>{workCount}</dd>
        </div>
        <div>
          <dt>Hearts</dt>
          <dd>{totalLikes}</dd>
        </div>
      </dl>
    </section>
  );
}

export default HeroSection;
