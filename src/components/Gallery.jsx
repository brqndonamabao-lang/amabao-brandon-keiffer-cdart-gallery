import ArtworkCard from './ArtworkCard';

// ============================================================
// VIDEO PART 3 - STRUCTURE: the gallery section and its controls.
// VIDEO PART 6 - REACT: this component has no state of its own.
// App keeps the values and passes them down. This component only
// reports clicks and typing back up to App.
// ============================================================
//
// Gallery = the wall of artwork cards, plus the category buttons
// and the search box that narrow the wall down.
//
// A "chip" is just a small rounded button. The active chip is the
// one with a different colour.
//
// PROPS (the values App passes in):
//   visibleCards     -> the cards that match right now
//   categories       -> ["Digital Art", "Traditional", "Animation"]
//   activeCategory   -> the chip currently selected
//   onCategoryChange -> function App gave us
//   searchText       -> what the visitor typed
//   onSearchChange   -> function App gave us
//   onOpen           -> function to open ArtworkDetails
//   onLike           -> function to add or remove a heart
//   onReport         -> function to open the report pop-up
//   sectionRef       -> a handle to this section so App can scroll here
//
// PART 3 - HTML ELEMENTS USED HERE:
// <section> groups the gallery. <p> and <h2> introduce it.
// <button> is used for anything clickable. <input> takes the
// search text.
//
// PART 3 - ACCESSIBILITY: screen readers are software that read
// the page out loud. `role="group"` tells them the chips belong
// together. `aria-live="polite"` tells them to read the result
// count when it changes, without interrupting.

function Gallery({
  visibleCards,
  categories,
  activeCategory,
  onCategoryChange,
  searchText,
  onSearchChange,
  onOpen,
  onLike,
  onReport,
  sectionRef,
}) {
  const allCategories = ['All', ...categories];

  return (
    <section className="section" id="gallery" ref={sectionRef} aria-labelledby="gallery-title">
      <p className="eyebrow">Explore Artwork</p>
      <h2 id="gallery-title">Discover Artists</h2>
      <p className="section-intro">
        Take a look at artwork shared by creative people. Click on an artwork to
        see it in more detail and discover the artist behind it.
      </p>

      {/* PART 3 - The filter bar: category chips and a search box. */}
      <div className="filter-bar">

        <div className="chips" role="group" aria-label="Filter by category">
          {allCategories.map((name) => (
            <button
              key={name}
              type="button"
              className={name === activeCategory ? 'chip chip-active' : 'chip'}
              aria-pressed={name === activeCategory}
              onClick={() => onCategoryChange(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="search-wrap">
          <label htmlFor="search-input" className="visually-hidden">Search artworks</label>
          <input
            id="search-input"
            type="search"
            placeholder="Search cards, artists or links..."
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
          />

          <span className="result-count" aria-live="polite">
            {visibleCards.length} {visibleCards.length === 1 ? 'card' : 'cards'}
          </span>
        </div>
      </div>

      {visibleCards.length > 0 ? (
        <div className="card-grid">
          {visibleCards.map((card) => (
            <ArtworkCard
              key={card.id}
              card={card}
              onOpen={onOpen}
              onLike={onLike}
              onReport={onReport}
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          No cards match that search. Try another word or pick &ldquo;All&rdquo;.
        </p>
      )}
    </section>
  );
}

export default Gallery;
