// ============================================================
// VIDEO PART 3 - STRUCTURE: one square card in the gallery.
// VIDEO PART 6 - REACT: App draws this once per card with .map().
// ============================================================
//
// ArtworkCard = the WHOLE card (picture + title + heart + report).
// It is not just the title. The title is the <h3> inside it.
//
// PROPS:
//   card     -> one object from the cards array in App.jsx
//   onOpen   -> function to open the big viewer
//   onLike   -> function to add or remove a heart
//   onReport -> function to open the report pop-up
//
// PART 3 - HTML ELEMENTS USED HERE:
// <article> is one complete card. <h3> is the title. <button> is
// used for anything clickable. The cover is a button because
// clicking it opens the viewer.

function ArtworkCard({ card, onOpen, onLike, onReport }) {
  const { id, title, author, works, likes, liked, isMine } = card;

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
        <WorkMedia work={works[0]} alt="" controls={false} />
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

/* PART 6 - WORKMEDIA HELPER
   ------------------------------------------------------------
   This small helper shows ONE work as an <img> or a <video>.
   ArtworkViewer imports it too, so the "picture or video?" choice
   lives in one place instead of being repeated in two files. */
export function WorkMedia({ work, alt, controls = true }) {
  if (work.type === 'video') {
    return (
      <video
        src={controls ? work.url : `${work.url}#t=0.1`}
        controls={controls}
        muted={!controls}
        playsInline
        preload="metadata"
        aria-label={alt}
      />
    );
  }

  return <img src={work.url} alt={alt} loading="lazy" draggable="false" />;
}

export default ArtworkCard;
