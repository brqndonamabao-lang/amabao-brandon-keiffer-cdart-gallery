// PostedNotice: replaces the post form once the artist has posted their card.
// (One card per artist, so the form disappears.)
// Props: card, onView, onEdit
function PostedNotice({ card, onView, onEdit }) {
  return (
    <section className="section upload" id="upload" aria-labelledby="posted-title">
      <p className="eyebrow">You&rsquo;re in the gallery</p>
      <h2 id="posted-title">Your card is live</h2>
      <p className="section-intro">
        &ldquo;{card.title}&rdquo; is pinned at the top of the gallery. You can
        still edit it any time.
      </p>
      <div className="hero-actions">
        <button type="button" className="btn btn-primary" onClick={() => onView(card.id)}>
          View my card
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => onEdit(card.id)}>
          Edit my card
        </button>
      </div>
      <p className="fineprint">
        Demo note: editing works while this page is open, but nothing is saved, so a
        refresh clears it.
      </p>
    </section>
  );
}

export default PostedNotice;
