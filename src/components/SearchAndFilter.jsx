// ============================================================
// VIDEO PART 3 - STRUCTURE: a small control bar above the gallery.
// VIDEO PART 6 - REACT: this component has no state of its own.
// App keeps the values and passes them down. This component only
// reports clicks and typing back up to App.
// ============================================================
//
// PROPS:
//   categories        -> ["Digital", "Traditional", ...]
//   activeCategory    -> the chip currently selected
//   onCategoryChange  -> function App gave us
//   searchText        -> what the visitor typed
//   onSearchChange    -> function App gave us
//   resultCount       -> how many cards match right now
//
// PART 3 - ACCESSIBILITY: `role="group"` groups the chip buttons
// for screen readers. `aria-live="polite"` makes the result count
// announced when it changes.

function SearchAndFilter({
  categories,
  activeCategory,
  onCategoryChange,
  searchText,
  onSearchChange,
  resultCount,
}) {
  const allOptions = ['All', ...categories];

  return (
    <div className="filter-bar">

      <div className="chips" role="group" aria-label="Filter by category">
        {allOptions.map((name) => (
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
          {resultCount} {resultCount === 1 ? 'card' : 'cards'}
        </span>
      </div>
    </div>
  );
}

export default SearchAndFilter;
