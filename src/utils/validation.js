import { normalizeLink, isValidLink } from './links';

export const MAX_LINKS = 5;

// ============================================================
// VIDEO PART 5 - VALIDATION = checking user input before using it.
// VIDEO PART 7 - TESTING: try an empty title, a short title,
// a bad link, a 6 MB picture, and 6 links.
// ============================================================
//
// Used by PostCardForm AND EditCardPopup, so the rules live in one place.
// Returns an object of error messages. An empty object means everything is valid.
// The caption is optional, but at least one social link is REQUIRED.

export function validateCardFields(values, links) {
  const errors = {};

  // PART 5 - IF: each rule adds one message to the errors object.
  if (values.title.trim().length < 3) {
    errors.title = 'Give your card a title (at least 3 characters).';
  }
  if (values.author.trim() === '') {
    errors.author = 'Please enter the artist name.';
  }
  if (values.category === '') {
    errors.category = 'Choose a category.';
  }
  if (values.caption.trim().length > 150) {
    errors.caption = 'Keep the caption under 150 characters.';
  }

  // PART 5 - LOOP: the first link is required, the others are optional.
  const linkErrors = {};
  links.forEach((text, index) => {
    if (index === 0 && text.trim() === '') {
      linkErrors[index] = 'Add at least one social media link so fans can find you.';
    } else if (text.trim() !== '' && !isValidLink(normalizeLink(text))) {
      linkErrors[index] = 'Enter a full link, like https://instagram.com/yourname';
    }
  });
  if (Object.keys(linkErrors).length > 0) {
    errors.links = linkErrors;
  }

  return errors;
}
