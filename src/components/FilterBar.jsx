// FilterBar: category buttons + search box. It owns no state; the parent (App)
// keeps the values and this component just reports changes through props.
// Props: categories, activeCategory, onCategoryChange, searchText, onSearchChange, resultCount
function FilterBar({
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

export default FilterBar;
