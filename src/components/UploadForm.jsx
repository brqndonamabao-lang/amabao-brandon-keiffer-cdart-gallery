import { useRef, useState } from 'react';
import { MAX_WORKS } from '../data/artworks';
import { cleanLinks } from '../utils/links';
import { MAX_LINKS, validateCardFields } from '../utils/validation';
import ConfirmDialog from './ConfirmDialog';
import SocialLinksField from './SocialLinksField';

const MAX_IMAGE_MB = 5;
const MAX_VIDEO_MB = 30;

// Starting (empty) form values
const emptyForm = { title: '', author: '', category: '', caption: '' };

// Checks ONE chosen file. Returns an error message, or '' when the file is fine.
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

// UploadForm: lets an artist post their ONE card with 1 to 5 works.
// Social links are required, the caption is optional.
// Props: categories, onAddCard
function UploadForm({ categories, onAddCard }) {
  const [values, setValues] = useState(emptyForm);
  const [links, setLinks] = useState(['']); // list of social link inputs
  const [works, setWorks] = useState([]); // chosen files: { id, url, type }
  const [errors, setErrors] = useState({});
  const [fileNotice, setFileNotice] = useState(''); // problems found while picking files
  const [askNoCaption, setAskNoCaption] = useState(false); // shows the "no caption?" pop-up
  const [fileInputKey, setFileInputKey] = useState(0); // changing the key clears the file input
  const nextWorkId = useRef(1);
  const captionRef = useRef(null);

  const linkErrors = errors.links || {};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // ---- social link list handlers ----
  const handleLinkChange = (index, value) => {
    setLinks(links.map((text, i) => (i === index ? value : text)));
  };
  const addLink = () => {
    if (links.length < MAX_LINKS) setLinks([...links, '']);
  };
  const removeLink = (index) => {
    setLinks(links.filter((text, i) => i !== index));
  };

  // ---- works (pictures / videos) ----
  const handleFiles = (event) => {
    const picked = [...event.target.files];
    const accepted = [];
    const problems = [];

    // Loop over every chosen file and keep the good ones (up to the limit)
    picked.forEach((file) => {
      const problem = checkFile(file);
      if (problem) {
        problems.push(problem);
      } else if (works.length + accepted.length >= MAX_WORKS) {
        problems.push(`A card holds up to ${MAX_WORKS} works, so "${file.name}" was skipped.`);
      } else {
        accepted.push({
          id: nextWorkId.current++,
          url: URL.createObjectURL(file), // temporary address, nothing is uploaded
          type: file.type.startsWith('video/') ? 'video' : 'image',
        });
      }
    });

    setWorks([...works, ...accepted]);
    setFileNotice(problems.join(' '));
    if (accepted.length > 0) {
      setErrors({ ...errors, works: undefined }); // the "add a work" message is no longer true
    }
    setFileInputKey(fileInputKey + 1); // clear the input so the same file can be chosen again
  };

  const removeWork = (id) => {
    setWorks(works.filter((work) => work.id !== id));
    setFileNotice('');
  };

  // Actually adds the card (called once everything is valid and confirmed)
  const publish = () => {
    onAddCard({
      title: values.title.trim(),
      author: values.author.trim(),
      category: values.category,
      caption: values.caption.trim(),
      socials: cleanLinks(links),
      works,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const foundErrors = validateCardFields(values, links);
    if (works.length === 0) {
      foundErrors.works = `Add at least 1 work (up to ${MAX_WORKS}).`;
    }
    setErrors(foundErrors);

    // Stop here if there is at least one error
    if (Object.keys(foundErrors).length > 0) return;

    // No caption? That is allowed, but ask once to make sure it is on purpose.
    if (values.caption.trim() === '') {
      setAskNoCaption(true);
      return;
    }

    publish();
  };

  return (
    <section className="section upload" id="upload" aria-labelledby="upload-title">
      <p className="eyebrow">Get more fans</p>
      <h2 id="upload-title">Post your card</h2>
      <p className="section-intro">
        Your work deserves more than a folder. Give it a card: choose the pieces
        that feel most like you, name the collection, and leave your links for
        anyone who wants to see what comes next. One card each keeps the wall
        fair, and a caption is a lovely touch &mdash; never a requirement.
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
              aria-invalid={Boolean(errors.title)}
            />
            {errors.title && <p className="error">{errors.title}</p>}
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

          <div className="field">
            <label htmlFor="caption">Caption (optional)</label>
            <textarea
              id="caption"
              name="caption"
              rows="2"
              ref={captionRef}
              value={values.caption}
              onChange={handleChange}
              aria-invalid={Boolean(errors.caption)}
            />
            <p className="hint">{values.caption.trim().length}/150 characters</p>
            {errors.caption && <p className="error">{errors.caption}</p>}
          </div>
        </div>

        <SocialLinksField
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

      {askNoCaption && (
        <ConfirmDialog
          title="Post without a caption?"
          message="Are you sure you don't want a caption? A few words can help people connect with your art, but it's totally fine to skip."
          confirmLabel="Yes, post it"
          cancelLabel="No, add a caption"
          onConfirm={() => {
            setAskNoCaption(false);
            publish();
          }}
          onCancel={() => {
            setAskNoCaption(false);
            captionRef.current.focus();
          }}
        />
      )}
    </section>
  );
}

export default UploadForm;
