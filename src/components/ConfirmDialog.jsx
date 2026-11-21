import { useEffect } from 'react';

// ConfirmDialog: a small yes/no pop-up.
// Props: title, message, confirmLabel, cancelLabel, onConfirm, onCancel
function ConfirmDialog({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) {
  // Escape key = the same as choosing "cancel".
  // The listener is re-added when onCancel changes, so it always calls the latest one.
  // It listens in the "capture" phase and stops the event, so when this pop-up
  // sits on top of the big picture view, Escape closes ONLY this pop-up.
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

export default ConfirmDialog;
