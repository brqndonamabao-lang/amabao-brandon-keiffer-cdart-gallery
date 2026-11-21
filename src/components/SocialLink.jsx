import { getPlatformName } from '../utils/links';

// SocialLink: a row of "follow" buttons under an artwork (one per social account).
// Props: urls (array of links), artist
function SocialLink({ urls, artist }) {
  if (!urls || urls.length === 0) return null;

  return (
    <div className="social-block">
      <span className="social-label">Follow {artist}:</span>
      <ul className="social-list">
        {urls.map((url) => {
          const platform = getPlatformName(url);
          return (
            <li key={url}>
              <a
                className="social-link"
                href={url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                title={url}
                aria-label={`Follow ${artist} on ${platform} (opens in a new tab)`}
              >
                {platform}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SocialLink;
