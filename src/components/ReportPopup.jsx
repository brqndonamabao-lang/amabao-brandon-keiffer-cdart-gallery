import { useEffect, useState } from 'react';

const REPORT_REASONS = [
  'Copyright / stolen artwork',
  'Violent content',
  'Nudity or sexual content',
  'Something else',
];

// ============================================================
// VIDEO PART 5 - JAVASCRIPT: radio buttons, conditions, validation.
// VIDEO PART 6 - REACT: useState remembers the chosen reason.
// VIDEO PART 8 - WALKTHROUGH: click Report on a card.
// ============================================================
//
// ReportPopup = asks WHY a post is being reported, then hands the reason back.
//
// PROPS: title (name of the artwork), onSubmit(reason), onCancel
//
// PART 5 - The REPORT_REASONS list below holds the choices shown
// as radio buttons. Radio buttons let the visitor pick only one.

function ReportPopup({ title, onSubmit, onCancel }) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  // PART 5 - Keyboard: Escape means cancel.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [onCancel]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (reason === '') {
      setError('Please choose a reason.');
      return;
    }
    onSubmit(reason);
  };

  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <form
        className="dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h3 id="report-title">Report &ldquo;{title}&rdquo;</h3>
        <p>Why are you reporting this card? It will be hidden from your gallery.</p>

        <fieldset className="report-options">
          <legend className="visually-hidden">Reason for report</legend>
          {REPORT_REASONS.map((name) => (
            <label key={name} className="report-option">
              <input
                type="radio"
                name="reason"
                value={name}
                checked={reason === name}
                onChange={() => {
                  setReason(name);
                  setError('');
                }}
              />
              {name}
            </label>
          ))}
        </fieldset>
        {error && <p className="error">{error}</p>}

        <div className="dialog-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Send report
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportPopup;
