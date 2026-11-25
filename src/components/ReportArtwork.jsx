import { useState } from 'react';

const REPORT_REASONS = [
  'Copyright / stolen artwork',
  'Violent content',
  'Nudity or sexual content',
  'Something else',
];

// ============================================================
// VIDEO PART 5 - JAVASCRIPT: the list above holds the choices.
// VIDEO PART 6 - REACT: useState remembers the chosen reason.
// VIDEO PART 8 - WALKTHROUGH: click Report on a card.
// ============================================================
//
// ReportArtwork = asks WHY a card is being reported.
//
// PROPS: title (the card name), onSubmit(reason), onCancel
//
// PART 5 - RADIO BUTTONS are a multiple-choice question. The
// visitor can pick only one answer. "Disabled" means the button
// is greyed out and cannot be clicked until a reason is chosen.
// `preventDefault` stops the browser from reloading the page when
// a form is sent.

function ReportArtwork({ title, onSubmit, onCancel }) {
  const [reason, setReason] = useState('');

  // PART 5 - Send the chosen reason back to App.
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(reason);
  }

  return (
    <div className="dialog-backdrop">
      <form
        className="dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
        onSubmit={handleSubmit}
      >
        <h3 id="report-title">Report &ldquo;{title}&rdquo;</h3>
        <p>Pick one reason. The card will be hidden from your gallery.</p>

        {/* PART 6 - Clicking a choice saves it in `reason`. */}
        <div className="report-options">
          {REPORT_REASONS.map((name) => (
            <label key={name} className="report-option">
              <input
                type="radio"
                name="reason"
                value={name}
                checked={reason === name}
                onChange={() => setReason(name)}
              />
              {name}
            </label>
          ))}
        </div>

        <div className="dialog-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={reason === ''}>
            Send report
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportArtwork;
