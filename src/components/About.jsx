function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <p className="eyebrow">About this place</p>
      <h2 id="about-title">A gallery built to grow fans</h2>

      <div className="about-grid">
        <div>
          <p>
            {'CDArt Gallery gives every artist '}
            <b>one card</b>
            {': a small gallery of their pictures or videos with their name and social links. Visitors browse the cards, leave a heart, and follow the artist where they actually post. CD stands for '}
            <b>Card Deck</b>
            {' which means a small stack of work in one place.'}
          </p>
          <pre className="poem">{`Brush, pixel, pencil, paper,
every drawing is a letter
sent to someone.`}</pre>
        </div>

        <div>
          <h3>How to use the gallery</h3>

          <ol className="steps">
            <li>Wander the wall</li>
            <li>Leave a heart and follow the artist&rsquo;s socials</li>
            <li>Post your own card and links</li>
          </ol>

          <h3>Community rules</h3>

          <ul>
            <li>Only artists can post here, not fan pages or repost accounts</li>
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
        </div>
      </div>
    </section>
  );
}

export default About;
