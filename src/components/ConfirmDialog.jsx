import { useEffect, useRef } from 'react';

// ConfirmDialog: a small yes/no pop-up.
// Props: title, message, confirmLabel, cancelLabel, onConfirm, onCancel
function ConfirmDialog({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) {
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
