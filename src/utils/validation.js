import { normalizeLink, isValidLink } from './links';

export const MAX_LINKS = 5;

// VALIDATION for the text part of a card (used by the post form AND the edit pop-up).
// Returns an object of error messages. An empty object means everything is valid.
// The caption is optional, but at least one social link is REQUIRED.
export function validateCardFields(values, links) {
  const errors = {};

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

  // Social links: the first one is required, the others are optional
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
