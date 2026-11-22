import { useCallback, useEffect, useRef, useState } from 'react';
import { WorkMedia } from './ArtworkCard';
import { getPlatformName } from '../utils/links';

// ============================================================
// VIDEO PART 5 - JAVASCRIPT: effects, timers, keyboard events.
// VIDEO PART 6 - REACT: useState + useEffect + props.
// VIDEO PART 8 - WALKTHROUGH: open a card and show this screen.
// ============================================================
//
// ArtworkViewer = the full-screen view of ONE card.
// LEFT:  the artwork (scroll sideways, click an image to zoom).
// RIGHT: title, artist, caption, follow links, heart, copy link.
//
// PROPS: card, onLike, onReport, onEdit, onClose
//
// PART 6 - STATE: `index` remembers which work is showing,
// `zoomIndex` remembers which image is zoomed, and `copied`
// remembers whether the "Copied!" message is visible.
//
// PART 5 - EFFECTS: the effects handle the keyboard, the mouse
// wheel, and the page scroll lock. `FollowLinks` is a small helper
// that shows one follow button per social link.

function ArtworkViewer({ card, onLike, onReport, onEdit, onClose }) {
  const { id, title, author, category, caption, socials, works, likes, liked, isMine } = card;
  const stageRef = useRef(null);
  const wheelLock = useRef(0);
  const copiedTimer = useRef(null);

  // PART 6 - STATE: which work is showing, which one is zoomed, and
  // whether the "Copied!" message is visible.
  const [index, setIndex] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(null);
  const [copied, setCopied] = useState(false);

  const lastIndex = works.length - 1;
  const current = works[index];
  const zoomed = zoomIndex === index;

  const goTo = useCallback((number) => {
    const stage = stageRef.current;
    const next = Math.max(0, Math.min(lastIndex, number));
    setIndex(next);
    if (stage) {
      stage.scrollTo({ left: next * stage.clientWidth, behavior: 'smooth' });
    }
  }, [lastIndex]);

  // PART 5 - useEffect: stop the page behind the viewer from scrolling.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // PART 5 - Mouse wheel: turn vertical wheel clicks into sideways movement.
  // Touch screens keep their natural swipe, and a trackpad's horizontal
  // gesture is left alone so it scrolls smoothly.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || works.length < 2) return undefined;

    const handleWheel = (event) => {
      if (event.target.closest('video')) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY === 0) return;

      event.preventDefault();
      const now = Date.now();
      if (now - wheelLock.current < 300) return;
      wheelLock.current = now;
      goTo(index + (event.deltaY > 0 ? 1 : -1));
    };

    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, [index, lastIndex, works.length, goTo]);

  const handleScroll = () => {
    const stage = stageRef.current;
    if (!stage || stage.clientWidth === 0) return;
    const nearest = Math.round(stage.scrollLeft / stage.clientWidth);
    setIndex((currentIndex) => (currentIndex === nearest ? currentIndex : nearest));
  };

  useEffect(
    () => () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    },
    []
  );

  // PART 5 - Keyboard: Escape closes zoom first, then the card.
  // The ← and → arrow keys change the work.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        if (zoomed) setZoomIndex(null);
        else onClose();
        return;
      }
      if (zoomed) return;
      if (['INPUT', 'TEXTAREA', 'SELECT', 'VIDEO'].includes(event.target.tagName)) return;
      if (event.key === 'ArrowRight') goTo(index + 1);
      if (event.key === 'ArrowLeft') goTo(index - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, index, zoomed, goTo]);

  const cardLink = `${window.location.origin}${window.location.pathname}#card-${id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(cardLink);
    } catch {
      const area = document.createElement('textarea');
      area.value = cardLink;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={`${title} by ${author}`}>
      <div className="viewer-media">
        <div className="viewer-stage" ref={stageRef} onScroll={handleScroll}>
          <ul className="viewer-track">
            {works.map((work, number) => (
              <li
                key={work.id}
                className="viewer-slide"
                aria-roledescription="slide"
                aria-label={`Work ${number + 1} of ${works.length}`}
                aria-hidden={number !== index}
              >
                <div
                  className={work.type === 'image' ? 'art art-image' : 'art'}
                  onClick={
                    work.type === 'image' && number === index
                      ? () => setZoomIndex(number)
                      : undefined
                  }
                >
                  <WorkMedia
                    work={work}
                    alt={`${title} by ${author}, work ${number + 1} of ${works.length}`}
                    controls={number === index}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button type="button" className="viewer-close" onClick={onClose} aria-label="Close card">
          &times;
        </button>

        {current.type === 'image' && (
          <span className="viewer-zoom-hint" aria-hidden="true">
            Click the art to zoom
          </span>
        )}
      </div>

      <aside className="viewer-side" aria-label="Card details">
        <header className="viewer-artist">
          <h3>{title}</h3>
          <p className="tile-author">by {author}</p>
        </header>

        <div className="viewer-meta">
          <span className="tag">{category}</span>
          <span>
            {works.length} {works.length === 1 ? 'work' : 'works'}
          </span>
        </div>

        {caption && <p className="viewer-caption">{caption}</p>}

        <FollowLinks urls={socials} artist={author} />

        <div className="viewer-actions">
          <button
            type="button"
            className={liked ? 'like-btn like-btn-on' : 'like-btn'}
            onClick={() => onLike(id)}
            aria-pressed={liked}
            aria-label={liked ? `Remove your heart from ${title}` : `Give ${title} a heart`}
          >
            <span className="heart" aria-hidden="true">{liked ? '♥' : '♡'}</span>
            <span>{likes}</span>
          </button>

          <div className="viewer-share">
            <button type="button" className="btn-small" onClick={copyLink}>
              {copied ? '✓ Copied' : 'Copy link'}
            </button>
          </div>
        </div>

        <div className="viewer-side-foot">
          {isMine && (
            <button type="button" className="btn-small" onClick={() => onEdit(id)}>
              Edit my card
            </button>
          )}
          <button type="button" className="report-btn" onClick={() => onReport(id)}>
            &#9873; Report
          </button>
        </div>
      </aside>

      {zoomed && current.type === 'image' && (
        <div className="zoom-layer" onClick={() => setZoomIndex(null)}>
          <img src={current.url} alt={`${title} by ${author}, full screen`} />
        </div>
      )}
    </div>
  );
}

/* PART 6 - FOLLOWLINKS HELPER
   ------------------------------------------------------------
   This small helper shows one "Follow" button per social media
   link. It uses `getPlatformName` to turn a long address into a
   friendly name like "Instagram" or "TikTok". */
function FollowLinks({ urls, artist }) {
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

export default ArtworkViewer;
