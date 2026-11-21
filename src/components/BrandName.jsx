// BrandName: prints the gallery name with "CD" in the accent colour,
// because CD stands for Card Deck (the word "card" in the brand).
// Used by the navbar logo and the hero heading.
function BrandName({ name }) {
  if (!name || !name.startsWith('CD')) return name;

  return (
    <>
      <span className="brand-mark" title="CD = Card Deck">CD</span>
      {name.slice(2)}
    </>
  );
}

export default BrandName;
