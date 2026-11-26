import { normalizeLink, isValidLink } from './links';

export const MAX_LINKS = 5;

// ============================================================
// VIDEO PART 5 - VALIDATION = checking user input before using it.
// VIDEO PART 7 - TESTING: try an empty artist name, an empty
// category, a bad link, a 6 MB picture, and 6 links.
// ============================================================
//
// Used by PostArtwork AND EditCardPopup, so the rules live in one
// place instead of being copied into two forms.
//
// It returns an object of error messages. An "object" is a box of
// named values, like { author: "a message" }. An empty object {}
// means everything is valid. The first social link is required.

export function validateCardFields(values, links) {
  const errors = {};

  // PART 5 - IF: each rule asks a question. If the answer is
  // "yes, something is wrong", add one message to the errors box.
  if (values.author.trim() === '') {
    errors.author = 'Please enter the artist name.';
  }
  if (values.category === '') {
    errors.category = 'Choose a category.';
  }

  // PART 5 - LOOP: go over every link. The first one is required,
  // the others are optional but must be valid if filled in.
  // `forEach` runs the same steps once per item.
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
