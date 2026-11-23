import { useEffect } from 'react';

// ============================================================
// VIDEO PART 6 - REACT: a reusable pop-up component.
// It is used for "delete this card?".
// ============================================================
//
// ConfirmPopup = a small yes/no pop-up.
//
// PROPS: title, message, confirmLabel, cancelLabel, onConfirm, onCancel

function ConfirmPopup({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) {
  // PART 5 - Keyboard: Escape means the same as choosing "cancel".
  // The listener uses the "capture" phase and stops the event, so when
  // this pop-up sits on top of the big picture view, Escape closes ONLY
  // this pop-up.
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

  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <div
        className="dialog-panel"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="confirm-title">{title}</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel} autoFocus>
            {cancelLabel}
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopup;
