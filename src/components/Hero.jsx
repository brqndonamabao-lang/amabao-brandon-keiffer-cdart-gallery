import { BrandName } from './Navbar';

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
