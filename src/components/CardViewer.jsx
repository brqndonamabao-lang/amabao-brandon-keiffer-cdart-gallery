import { useEffect, useRef, useState } from 'react';
import MediaView from './MediaView';
import SocialLink from './SocialLink';

// CardViewer: opens ONE card as a full-screen art view.
// LEFT: the artwork, as large as the screen allows, with only a close button
//       and a native horizontal scroll bar. Use the mouse wheel, swipe on a
//       touch screen, or press ← → to move. Click an image to zoom.
// RIGHT: title, artist, caption, social links, hearts and share/copy actions.
// Props: card, onLike, onReport, onEdit, onClose
function CardViewer({ card, onLike, onReport, onEdit, onClose }) {
  const { id, title, author, category, caption, socials, works, likes, liked, isMine } = card;
  const stageRef = useRef(null);
  const wheelLock = useRef(0);
  const copiedTimer = useRef(null);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [copied, setCopied] = useState(false);
  const lastIndex = works.length - 1;
  const current = works[index];

  // Move to a given work, staying inside 0 .. lastIndex.
  // The stage is a real scroll area, so we scroll it instead of moving a row.
  const goTo = (number) => {
    const stage = stageRef.current;
    const next = Math.max(0, Math.min(lastIndex, number));
    setIndex(next);
    if (stage) {
      stage.scrollTo({ left: next * stage.clientWidth, behavior: 'smooth' });
    }
  };

  // A different card was opened: start from its first work
  useEffect(() => {
    setIndex(0);
    setZoomed(false);
    if (stageRef.current) stageRef.current.scrollLeft = 0;
  }, [card.id]);

  // New work shown: leave zoom mode
  useEffect(() => {
    setZoomed(false);
  }, [index]);

  // Keep the page behind the viewer from scrolling while it is open
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Mouse wheel: turn vertical wheel clicks into sideways movement through
  // the works. Touch screens keep their natural native swipe, and a trackpad's
  // horizontal gesture is left alone so it scrolls smoothly.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || works.length < 2) return undefined;

    const handleWheel = (event) => {
      if (event.target.closest('video')) return; // let the video keep its controls
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY === 0) return;

      event.preventDefault();
      const now = Date.now();
      if (now - wheelLock.current < 300) return; // one work per wheel click
      wheelLock.current = now;
      goTo(index + (event.deltaY > 0 ? 1 : -1));
    };

    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, [index, lastIndex, works.length]);

  // Keep the active work in step with the native scroll position (this is
  // what makes swiping on a phone and dragging the scroll bar work).
  const handleScroll = () => {
    const stage = stageRef.current;
    if (!stage || stage.clientWidth === 0) return;
    const nearest = Math.round(stage.scrollLeft / stage.clientWidth);
    setIndex((currentIndex) => (currentIndex === nearest ? currentIndex : nearest));
  };

  // Clear the "Copied!" timer if the viewer closes first
  useEffect(
    () => () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    },
    []
  );

  // Keyboard: Escape closes zoom first, then the card. ← → change work.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        if (zoomed) setZoomed(false);
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
  }, [onClose, index, zoomed]);

  // ---- Share / copy a link to this card ----
  const cardLink = `${window.location.origin}${window.location.pathname}#card-${id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(cardLink);
    } catch {
      // Fallback for browsers without the clipboard API
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} by ${author}`,
          text: 'Look at this card on CDArt Gallery',
          url: cardLink,
        });
      } catch {
        // The visitor closed the share sheet: nothing to do
      }
      return;
    }
    copyLink();
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
                      ? () => setZoomed(true)
                      : undefined
                  }
                >
                  <MediaView
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
          <span className="viewer-avatar" aria-hidden="true">
            {works[0].type === 'video' ? '▶' : <img src={works[0].url} alt="" />}
          </span>
          <div>
            <h3>{title}</h3>
            <p className="tile-author">by {author}</p>
          </div>
        </header>

        <div className="viewer-meta">
          <span className="tag">{category}</span>
          <span>
            {works.length} {works.length === 1 ? 'work' : 'works'}
          </span>
        </div>

        {caption && <p className="viewer-caption">{caption}</p>}

        <SocialLink urls={socials} artist={author} />

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
            <button type="button" className="btn-small" onClick={handleShare}>
              Share
            </button>
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
        <div className="zoom-layer" onClick={() => setZoomed(false)}>
          <img src={current.url} alt={`${title} by ${author}, full screen`} />
        </div>
      )}
    </div>
  );
}

export default CardViewer;
