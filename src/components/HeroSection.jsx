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
        Every artist gets one card holding 1 to 5 works. Open a card, browse the
        deck, leave a heart, and follow the artist&rsquo;s links. New cards go on
        top so everyone gets seen. No account, no noise.
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
