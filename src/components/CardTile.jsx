import MediaView from './MediaView';

// CardTile: ONE square card in the gallery. App renders it once per card with .map().
// Clicking the cover opens the card viewer.
// Props (read-only): card, onOpen, onLike, onReport
function CardTile({ card, onOpen, onLike, onReport }) {
  const { id, title, author, works, likes, liked, isMine } = card;

  // A visitor who reported this card sees a short note instead of the artwork
  if (card.reportedByMe) {
    return (
      <article className="card-tile card-tile-reported">
        <p>You reported this card. Thank you, it is hidden from your gallery.</p>
      </article>
    );
  }

  return (
    <article className="card-tile">
      <button
        type="button"
        className={works.length > 1 ? 'tile-cover tile-cover-deck' : 'tile-cover'}
        onClick={() => onOpen(id)}
        aria-label={`Open ${title} by ${author}, ${works.length} ${works.length === 1 ? 'work' : 'works'}`}
      >
        <MediaView work={works[0]} alt="" controls={false} />
        <span className="tile-count">
          {works[0].type === 'video' ? '▶ ' : ''}{works.length} {works.length === 1 ? 'work' : 'works'}
        </span>
        {isMine && <span className="tile-mine">Your card</span>}
      </button>

      <div className="tile-info">
        <div className="tile-text">
          <h3>{title}</h3>
          <p className="tile-author">by {author}</p>
        </div>
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
      </div>

      <div className="tile-foot">
        <button
          type="button"
          className="report-btn"
          onClick={() => onReport(id)}
          aria-label={`Report ${title}`}
        >
          &#9873; Report
        </button>
      </div>
    </article>
  );
}

export default CardTile;
