// ============================================================
// VIDEO PART 5 - JAVASCRIPT INTERACTIONS
// ------------------------------------------------------------
// This file shows the JavaScript basics in a real job:
//   - variables and functions
//   - if / else
//   - try / catch (for errors)
//   - arrays: map, filter
//   - a loop over an object
//
// It cleans up the social media links that visitors type.
//
// PART 5 - The PLATFORMS object below maps a web address to a
// friendly name, so "https://www.instagram.com/name" becomes
// "Instagram" on the card.
// ============================================================

// PART 5 - FUNCTION: add "https://" if the visitor typed just
// "instagram.com/name". A function takes input and returns output.
export function normalizeLink(text) {
  const trimmed = text.trim();
  if (trimmed === '') return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : 'https://' + trimmed;
}

// PART 5 - TRY / CATCH: new URL() throws an error when the text
// is not a real web address. catch keeps the page from crashing.
// Returns true when the text is a usable http(s) web address.
export function isValidLink(link) {
  try {
    const url = new URL(link);
    const isWeb = url.protocol === 'http:' || url.protocol === 'https:';
    return isWeb && url.hostname.includes('.');
  } catch {
    return false;
  }
}

// PART 5 - ARRAY METHODS: map changes every item, filter removes
// empty and duplicate links.
export function cleanLinks(links) {
  return links
    .map(normalizeLink)
    .filter((link, index, all) => link !== '' && all.indexOf(link) === index);
}

const PLATFORMS = {
  'instagram.com': 'Instagram',
  'tiktok.com': 'TikTok',
  'x.com': 'X',
  'twitter.com': 'X',
  'facebook.com': 'Facebook',
  'fb.com': 'Facebook',
  'youtube.com': 'YouTube',
  'youtu.be': 'YouTube',
  'pinterest.com': 'Pinterest',
  'behance.net': 'Behance',
  'artstation.com': 'ArtStation',
  'deviantart.com': 'DeviantArt',
  'threads.net': 'Threads',
  'bsky.app': 'Bluesky',
  'twitch.tv': 'Twitch',
  'tumblr.com': 'Tumblr',
  'pixiv.net': 'Pixiv',
  'dribbble.com': 'Dribbble',
  'ko-fi.com': 'Ko-fi',
  'patreon.com': 'Patreon',
  'linktr.ee': 'Linktree',
};

// PART 5 - LOOP: "https://www.instagram.com/keiffer" -> "Instagram".
// Unknown sites show their address instead.
export function getPlatformName(link) {
  try {
    const host = new URL(link).hostname.replace(/^www\./, '');
    for (const [domain, name] of Object.entries(PLATFORMS)) {
      if (host === domain || host.endsWith('.' + domain)) return name;
    }
    return host;
  } catch {
    return link;
  }
}
