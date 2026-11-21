import { useEffect, useRef, useState } from 'react';

// Reasons a visitor can choose when reporting a post
export const REPORT_REASONS = [
  'Copyright / stolen artwork',
  'Violent content',
  'Nudity or sexual content',
  'Something else',
];

// ReportDialog: asks WHY a post is being reported, then hands the reason back.
// Props: title (name of the artwork), onSubmit(reason), onCancel
function ReportDialog({ title, onSubmit, onCancel }) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  // Escape key = the same as choosing "cancel".
  // The latest onCancel is kept in a ref so the listener is added only once.
  // It listens in the "capture" phase and stops the event, so when this pop-up
  // sits on top of the big picture view, Escape closes ONLY this pop-up.
  const cancelRef = useRef(onCancel);
  cancelRef.current = onCancel;

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        cancelRef.current();
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, []);

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

export default ReportDialog;
