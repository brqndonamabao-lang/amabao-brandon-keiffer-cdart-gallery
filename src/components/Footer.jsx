// Footer: credits and two working external links.
// Props: galleryName
function Footer({ galleryName }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>
        &copy; {year} {galleryName}. Every artwork belongs to its artist. Please
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
