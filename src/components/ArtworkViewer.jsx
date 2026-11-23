import { useEffect, useRef, useState } from 'react';
import { WorkMedia } from './GalleryCard';
import { getPlatformName } from '../utils/links';

// ============================================================
// VIDEO PART 5 - JAVASCRIPT: effects, keyboard, and a timer.
// VIDEO PART 6 - REACT: useState remembers what is on screen.
// VIDEO PART 8 - WALKTHROUGH: open a card and show this screen.
// ============================================================
//
// ArtworkViewer = one card, full screen, like a TikTok post.
// The artwork fills the screen. The title, artist, links and
// buttons sit together in one quiet column.
//
// PROPS: card, onLike, onReport, onEdit, onClose
//
// PART 6 - THREE PIECES OF MEMORY:
//   index  = which work is showing
//   zoom   = is the zoom picture open?
//   copied = show the "Copied!" text for a moment?
//
// PART 5 - useRef points at the sliding area so we can scroll it.

function ArtworkViewer({ card, onLike, onReport, onEdit, onClose }) {
  const { id, title, author, socials, works, likes, liked, isMine } = card;
  const stageRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [copied, setCopied] = useState(false);

  const current = works[index];
  const lastIndex = works.length - 1;

  // PART 5 - Stop the page behind the viewer from scrolling.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // PART 5 - Mouse wheel: up/down moves one work at a time.
  // The short pause stops one fast flick from skipping works.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    let paused = false;

    function handleWheel(event) {
      if (event.target.closest('video')) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY === 0) return;

      event.preventDefault();
      if (paused) return;
      paused = true;
      setTimeout(() => { paused = false; }, 350);

      const step = event.deltaY > 0 ? stage.clientWidth : -stage.clientWidth;
      stage.scrollBy({ left: step, behavior: 'smooth' });
    }

    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, []);

  // PART 5 - Keyboard: Escape closes, left and right change work.
  useEffect(() => {
    // Move to a work. Math keeps the number inside the list.
    function goTo(number) {
      const next = Math.max(0, Math.min(lastIndex, number));
      setIndex(next);

      const stage = stageRef.current;
      if (stage) stage.scrollTo({ left: next * stage.clientWidth, behavior: 'smooth' });
    }

    function handleKey(event) {
      if (event.key === 'Escape') {
        if (zoom) setZoom(false);
        else onClose();
      }
      if (event.key === 'ArrowRight') goTo(index + 1);
      if (event.key === 'ArrowLeft') goTo(index - 1);
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index, zoom, onClose, lastIndex]);

  // PART 5 - When the visitor swipes, update the memory to match.
  function handleScroll() {
    const stage = stageRef.current;
    if (!stage || stage.clientWidth === 0) return;
    setIndex(Math.round(stage.scrollLeft / stage.clientWidth));
  }

  // PART 5 - Copy this card's link, then show "Copied!" for 2 seconds.
  function copyLink() {
    const link = `${window.location.origin}${window.location.pathname}#card-${id}`;
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={`${title} by ${author}`}>
      {/* PART 3 - The artwork. Each work is one full-screen slide. */}
      <div className="viewer-stage" ref={stageRef} onScroll={handleScroll}>
        <div className="viewer-track">
          {works.map((work, number) => (
            <div className="viewer-slide" key={work.id}>
              <div
                className={work.type === 'image' ? 'art art-image' : 'art'}
                onClick={
                  work.type === 'image'
                    ? () => {
                        setIndex(number);
                        setZoom(true);
                      }
                    : undefined
                }
              >
                <WorkMedia
                  work={work}
                  alt={`${title} by ${author}`}
                  controls={number === index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PART 3 - One column of quiet controls over the art. */}
      <div className="viewer-info">
        <h3>{title}</h3>
        <p className="tile-author">by {author}</p>

        <FollowLinks urls={socials} artist={author} />

        <button
          type="button"
          className={liked ? 'like-btn like-btn-on' : 'like-btn'}
          onClick={() => onLike(id)}
          aria-pressed={liked}
        >
          <span className="heart">{liked ? '♥' : '♡'}</span>
          <span>{likes}</span>
        </button>

        <button type="button" className="btn-small" onClick={copyLink}>
          {copied ? '✓ Copied' : 'Copy link'}
        </button>

        {isMine && (
          <button type="button" className="btn-small" onClick={() => onEdit(id)}>
            Edit my card
          </button>
        )}

        <button type="button" className="report-btn" onClick={() => onReport(id)}>
          &#9873; Report
        </button>
      </div>

      <button type="button" className="viewer-close" onClick={onClose} aria-label="Close card">
        &times;
      </button>

      {/* PART 6 - The zoom layer only draws when zoom is true. */}
      {zoom && current.type === 'image' && (
        <div className="zoom-layer" onClick={() => setZoom(false)}>
          <img src={current.url} alt={`${title} by ${author}`} />
        </div>
      )}
    </div>
  );
}

/* VIDEO PART 6 - FOLLOWLINKS HELPER
   ------------------------------------------------------------
   One "Follow" button per social link. getPlatformName turns a
   long address into a short name like "YouTube" or "TikTok". */
function FollowLinks({ urls, artist }) {
  if (!urls || urls.length === 0) return null;

  return (
    <div className="social-block">
      <span className="social-label">Follow {artist}:</span>
      <ul className="social-list">
        {urls.map((url) => (
          <li key={url}>
            <a
              className="social-link"
              href={url}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {getPlatformName(url)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtworkViewer;
