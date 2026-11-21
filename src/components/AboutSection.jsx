// AboutSection: explains the gallery, shows a data table and nested lists.
// Props: cards, categories
function AboutSection({ cards, categories }) {
  // Loop over the categories and total up each one with filter + reduce
  const rows = categories.map((name) => {
    const inCategory = cards.filter((card) => card.category === name);
    const hearts = inCategory.reduce((sum, card) => sum + card.likes, 0);
    return { name, count: inCategory.length, hearts };
  });

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <p className="eyebrow">About this place</p>
      <h2 id="about-title">A gallery built to grow fans</h2>

      <div className="about-grid">
        <div>
          <p>
            {'CDArt Gallery turns a portfolio into something small enough to hold: '}
            <b>one card</b>
            {', a miniature gallery of pictures and videos, with a name behind it. Visitors browse, react, and carry your links back to the places where you actually post. CD stands for '}
            <b>Card Deck</b>
            {' \u2014 a little stack of work that travels further than a single post.'}
          </p>
          <p>
            Please be kind in your reactions &mdash; <u>every artwork is someone&rsquo;s hard work</u>.
          </p>

          <hr />

          <h3>How to use the gallery</h3>
          <ol className="steps">
            <li>Wander the wall</li>
            <li>Leave a heart</li>
            <li>Add your own card and links &mdash; let the wall do the introducing</li>
          </ol>

          <h3>Community rules</h3>
          <ul>
            <li>Post only your own work</li>
            <li>
              Social links are required
              <ul>
                <li>Link accounts where you post this same artwork</li>
                <li>Fans can check it&rsquo;s yours and follow you</li>
              </ul>
            </li>
            <li>Use Report for copied, violent or nude cards</li>
          </ul>

          {/* <pre> keeps line breaks and spacing exactly as typed */}
          <pre className="poem">{`Brush, pixel, pencil, paper,
every drawing is a letter
sent to someone.`}</pre>
        </div>

        <div>
          <table className="stats-table">
            <caption>Gallery at a glance (updates live)</caption>
            <thead>
              <tr>
                <th colSpan="3" scope="colgroup">Cards by category</th>
              </tr>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Cards</th>
                <th scope="col">Hearts</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name}>
                  <th scope="row">{row.name}</th>
                  <td>{row.count}</td>
                  <td>{row.hearts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
