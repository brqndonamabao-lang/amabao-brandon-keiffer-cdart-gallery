import { useRef, useState } from 'react';
import { MAX_WORKS } from '../data/artworks';
import { cleanLinks } from '../utils/links';
import { MAX_LINKS, validateCardFields } from '../utils/validation';

// ============================================================
// VIDEO PART 5 - JAVASCRIPT: loops, conditions, validation.
// VIDEO PART 6 - REACT: useState keeps the form values.
// VIDEO PART 7 - TESTING: try an empty artist name, a bad link, a big file.
// ============================================================
//
// PostArtwork = lets an artist post their ONE card with 1 to 5 works.
// Social links are required.
//
// PROPS: categories, onAddCard
//
// `categories` is the list of styles for the dropdown.
// `onAddCard` is the function App uses to add the new card.
//
// "Validation" means checking the visitor's input before using it.
// "State" is information the form remembers while the page is open:
// `values` holds the text fields, `links` holds the social links,
// `works` holds the chosen files, and `errors` holds the messages
// shown under the fields.
//
// PART 5 - `validateCardFields` checks the text and links.
// `checkFile` checks each picture or video. The helper
// `SocialLinksFields` is shared with EditCardPopup.

const MAX_IMAGE_MB = 5;
const MAX_VIDEO_MB = 30;

const emptyForm = { title: '', author: '', category: '' };

// PART 5 - CHECKFILE: returns a message if the file is the wrong
// type or too big, or an empty string if it is fine.
function checkFile(file) {
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');
  if (!isImage && !isVideo) return `"${file.name}" is not a picture or a video.`;
  if (isImage && file.size > MAX_IMAGE_MB * 1024 * 1024) {
    return `"${file.name}" is too big (pictures: up to ${MAX_IMAGE_MB} MB).`;
  }
  if (isVideo && file.size > MAX_VIDEO_MB * 1024 * 1024) {
    return `"${file.name}" is too big (videos: up to ${MAX_VIDEO_MB} MB).`;
  }
  return '';
}

function PostArtwork({ categories, onAddCard }) {
  // PART 6 - STATE: every value the form needs to remember.
  const [values, setValues] = useState(emptyForm);
  const [links, setLinks] = useState(['']);
  const [works, setWorks] = useState([]);
  const [errors, setErrors] = useState({});
  const [fileNotice, setFileNotice] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0);
  const nextWorkId = useRef(1);

  const linkErrors = errors.links || {};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleLinkChange = (index, value) => {
    setLinks(links.map((text, i) => (i === index ? value : text)));
  };
  const addLink = () => {
    if (links.length < MAX_LINKS) setLinks([...links, '']);
  };
  const removeLink = (index) => {
    setLinks(links.filter((text, i) => i !== index));
  };

  // PART 5 - works (pictures / videos)
  // PART 5 - LOOP: go over every chosen file and keep the good ones.
  // A loop repeats the same steps for each item in a list.
  const handleFiles = (event) => {
    const picked = [...event.target.files];
    const accepted = [];
    const problems = [];

    picked.forEach((file) => {
      const problem = checkFile(file);
      if (problem) {
        problems.push(problem);
      } else if (works.length + accepted.length >= MAX_WORKS) {
        problems.push(`A card holds up to ${MAX_WORKS} works, so "${file.name}" was skipped.`);
      } else {
        accepted.push({
          id: nextWorkId.current++,
          // PART 5 - createObjectURL makes a temporary link to the
          // file inside this browser. Nothing is uploaded anywhere.
          url: URL.createObjectURL(file),
          type: file.type.startsWith('video/') ? 'video' : 'image',
        });
      }
    });

    setWorks([...works, ...accepted]);
    setFileNotice(problems.join(' '));
    if (accepted.length > 0) {
      setErrors({ ...errors, works: undefined });
    }
    setFileInputKey(fileInputKey + 1);
  };

  const removeWork = (id) => {
    setWorks(works.filter((work) => work.id !== id));
    setFileNotice('');
  };

  const publish = () => {
    onAddCard({
      title: values.title.trim(),
      author: values.author.trim(),
      category: values.category,
      socials: cleanLinks(links),
      works,
    });
  };

  // PART 5 - CONDITION: stop if there is an error.
  // A condition is just an if question: is this true or false?
  const handleSubmit = (event) => {
    event.preventDefault();
    const foundErrors = validateCardFields(values, links);
    if (works.length === 0) {
      foundErrors.works = `Add at least 1 work (up to ${MAX_WORKS}).`;
    }
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) return;

    publish();
  };

  return (
    <section className="section upload" id="upload" aria-labelledby="upload-title">
      <p className="eyebrow">Get more fans</p>
      <h2 id="upload-title">Post your card</h2>
      <p className="section-intro">
        Your work deserves more than a folder. Choose the pieces that feel most
        like you, name the collection, and leave your links so people can follow
        your work.
      </p>

      <form className="upload-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="title">Card title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="author">Artist name</label>
            <input
              id="author"
              name="author"
              type="text"
              value={values.author}
              onChange={handleChange}
              aria-invalid={Boolean(errors.author)}
            />
            {errors.author && <p className="error">{errors.author}</p>}
          </div>

          <div className="field">
            <label htmlFor="category">Main style</label>
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              aria-invalid={Boolean(errors.category)}
            >
              <option value="">Select a category...</option>
              {categories.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            {errors.category && <p className="error">{errors.category}</p>}
          </div>
        </div>

        <SocialLinksFields
          links={links}
          errors={linkErrors}
          idPrefix="social"
          onChange={handleLinkChange}
          onAdd={addLink}
          onRemove={removeLink}
        />

        <fieldset className="field links-field">
          <legend>Your works ({works.length}/{MAX_WORKS})</legend>
          <p className="hint">
            Pictures or videos. The first one is your card&rsquo;s cover. Pictures up to{' '}
            {MAX_IMAGE_MB} MB, videos up to {MAX_VIDEO_MB} MB.
          </p>

          {works.length < MAX_WORKS && (
            <>
              <label htmlFor="works" className="visually-hidden">Choose works</label>
              <input
                key={fileInputKey}
                id="works"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFiles}
                aria-invalid={Boolean(errors.works)}
              />
            </>
          )}

          {/* PART 5 - `preload="metadata"` loads only the video's
              basic details (its length and a first frame), not the
              whole file. "Metadata" means data about the file. */}
          {works.length > 0 && (
            <ul className="work-previews">
              {works.map((work, number) => (
                <li key={work.id} className="work-preview">
                  {work.type === 'video' ? (
                    <video src={`${work.url}#t=0.1`} muted preload="metadata" aria-label={`Work ${number + 1} preview`} />
                  ) : (
                    <img src={work.url} alt={`Work ${number + 1} preview`} />
                  )}
                  <span className="work-number">{number === 0 ? 'Cover' : number + 1}</span>
                  <button
                    type="button"
                    className="btn-small"
                    onClick={() => removeWork(work.id)}
                    aria-label={`Remove work ${number + 1}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {fileNotice && <p className="error">{fileNotice}</p>}
          {errors.works && <p className="error">{errors.works}</p>}
        </fieldset>

        <button type="submit" className="btn btn-primary">Post my card</button>
        <p className="fineprint">
          Post only your own work. Preview mode: your card is shown on this device only.
        </p>
      </form>
    </section>
  );
}

/* PART 6 - SOCIAL LINKS FIELD HELPER
   ------------------------------------------------------------
   This is the "add up to 5 social media links" part of the form.
   EditCardPopup imports it too, so the markup lives in one place
   instead of being copied into two forms. */
export function SocialLinksFields({ links, errors, idPrefix, onChange, onAdd, onRemove }) {
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

export default PostArtwork;
