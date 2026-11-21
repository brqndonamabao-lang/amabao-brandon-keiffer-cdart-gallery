import { MAX_LINKS } from '../utils/validation';

// SocialLinksField: the "add up to 5 social media links" part of a form.
// It owns no state: the parent form keeps the list and passes it in.
// Props: links, errors (messages by position), idPrefix, onChange(index, text), onAdd, onRemove(index)
function SocialLinksField({ links, errors, idPrefix, onChange, onAdd, onRemove }) {
  return (
    <fieldset className="field links-field">
      <legend>Social media links (required)</legend>
      <p className="hint">
        Link the accounts where you post this same artwork, so fans can check
        it&rsquo;s yours and follow you. Add up to {MAX_LINKS}.
      </p>

      {links.map((text, index) => (
        <div key={index} className="link-row">
          <div className="link-input">
            <label htmlFor={`${idPrefix}-${index}`} className="visually-hidden">
              Social media link {index + 1}
            </label>
            <input
              id={`${idPrefix}-${index}`}
              type="text"
              placeholder="https://instagram.com/yourname"
              value={text}
              onChange={(event) => onChange(index, event.target.value)}
              aria-invalid={Boolean(errors[index])}
            />
            {errors[index] && <p className="error">{errors[index]}</p>}
          </div>
          {index > 0 && (
            <button
              type="button"
              className="btn-small"
              onClick={() => onRemove(index)}
              aria-label={`Remove social media link ${index + 1}`}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {links.length < MAX_LINKS && (
        <button type="button" className="btn-small btn-add" onClick={onAdd}>
          + Add another account
        </button>
      )}
    </fieldset>
  );
}

export default SocialLinksField;
