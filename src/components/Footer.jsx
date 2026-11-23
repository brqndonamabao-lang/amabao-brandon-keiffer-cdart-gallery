// ============================================================
// VIDEO PART 3 - STRUCTURE: the bottom strip of the page.
// VIDEO PART 8 - the last region in the walkthrough.
// ============================================================
//
// Footer = the small print at the bottom of the page.
// It shows the copyright line and links to free art collections.
//
// PART 3 - HTML ELEMENTS USED HERE:
// <footer> marks the bottom of the page. <ul> and <li> make a
// list. <a> opens another website.

const CURRENT_YEAR = new Date().getFullYear();

function Footer({ galleryName }) {
  return (
    <footer className="site-footer">
      <p>
        &copy; {CURRENT_YEAR} {galleryName}. Every artwork belongs to its artist. Please
        don&rsquo;t copy or repost without permission.
        <br />
        Background: a painted reproduction of <i>The Starry Night</i> by Vincent van Gogh (1889, public domain).
        <br />
        Want to see more art? Visit these free collections:
      </p>
      <ul className="footer-links">
        <li>
          <a href="https://www.metmuseum.org/art/collection" target="_blank" rel="noopener noreferrer">
            The Met Collection
          </a>
        </li>
        <li>
          <a href="https://artsandculture.google.com/" target="_blank" rel="noopener noreferrer">
            Google Arts &amp; Culture
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
