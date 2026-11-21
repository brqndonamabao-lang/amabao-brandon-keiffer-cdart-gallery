import { useEffect, useState } from 'react';
import { cleanLinks } from '../utils/links';
import { MAX_LINKS, validateCardFields } from '../utils/validation';
import SocialLinksField from './SocialLinksField';
import ConfirmDialog from './ConfirmDialog';

// EditCardDialog: pop-up to change the text and links of your own card.
// (Works are not changed here.) Changes last only until the page is refreshed.
// Props: card, categories, onSave(changes), onDelete, onCancel
function EditCardDialog({ card, categories, onSave, onDelete, onCancel }) {
  const [values, setValues] = useState({
    title: card.title,
    author: card.author,
    category: card.category,
    caption: card.caption,
  });
  const [links, setLinks] = useState(card.socials.length > 0 ? card.socials : ['']);
  const [errors, setErrors] = useState({});
  const [confirmingDelete, setConfirmingDelete] = useState(false); // shows the "are you sure?" pop-up

  // Escape = cancel (same pattern as the other pop-ups).
  // While the delete confirmation is open, that pop-up handles Escape instead.
  useEffect(() => {
    if (confirmingDelete) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [onCancel, confirmingDelete]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const foundErrors = validateCardFields(values, links);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    onSave({
      title: values.title.trim(),
      author: values.author.trim(),
      category: values.category,
      caption: values.caption.trim(),
      socials: cleanLinks(links),
    });
  };

  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <form
        className="dialog-panel dialog-wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-title"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <h3 id="edit-title">Edit my card</h3>

        <div className="field">
          <label htmlFor="edit-title-input">Card title</label>
          <input
            id="edit-title-input"
            name="title"
            type="text"
            value={values.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="field">
          <label htmlFor="edit-author">Artist name</label>
          <input
            id="edit-author"
            name="author"
            type="text"
            value={values.author}
            onChange={handleChange}
            aria-invalid={Boolean(errors.author)}
          />
          {errors.author && <p className="error">{errors.author}</p>}
        </div>

        <div className="field">
          <label htmlFor="edit-category">Main style</label>
          <select id="edit-category" name="category" value={values.category} onChange={handleChange}>
            {categories.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="edit-caption">Caption (optional)</label>
          <textarea
            id="edit-caption"
            name="caption"
            rows="2"
            value={values.caption}
            onChange={handleChange}
            aria-invalid={Boolean(errors.caption)}
          />
          {errors.caption && <p className="error">{errors.caption}</p>}
        </div>

        <SocialLinksField
          links={links}
          errors={errors.links || {}}
          idPrefix="edit-social"
          onChange={(index, value) => setLinks(links.map((text, i) => (i === index ? value : text)))}
          onAdd={() => links.length < MAX_LINKS && setLinks([...links, ''])}
          onRemove={(index) => setLinks(links.filter((text, i) => i !== index))}
        />

        <div className="dialog-actions">
          <button type="button" className="btn btn-danger" onClick={() => setConfirmingDelete(true)}>
            Delete
          </button>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>

      {confirmingDelete && (
        <ConfirmDialog
          title="Delete this card?"
          message="Your card and its works will be removed from the gallery. This cannot be undone."
          confirmLabel="Yes, delete"
          cancelLabel="Keep my card"
          onConfirm={onDelete}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </div>
  );
}

export default EditCardDialog;
