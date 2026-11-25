// ============================================================
// VIDEO PART 5 - JAVASCRIPT INTERACTIONS
// ------------------------------------------------------------
// This file shows the JavaScript basics in a real job:
//   - variables (names that hold a value)
//   - functions (small machines: input goes in, result comes out)
//   - if / else (ask a question, pick one path)
//   - try / catch (try something risky; catch the error if it fails)
//   - arrays: map and filter (change or keep items in a list)
//   - a loop (repeat the same step for each item)
//
// It cleans up the social media links that visitors type.
//
// PART 5 - The PLATFORMS object below is a list of pairs. Each
// pair is "this web address" -> "this friendly name". So a link
// with instagram.com shows the word "Instagram" on the card.
// ============================================================

// PART 5 - FUNCTION: add "https://" if the visitor typed just
// "instagram.com/name". `trim()` removes spaces at the ends. The
// test asks: "does it already start with http:// or https://?"
// The `i` means ignore upper or lower case.
export function normalizeLink(text) {
  const trimmed = text.trim();
  if (trimmed === '') return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : 'https://' + trimmed;
}

// PART 5 - TRY / CATCH: new URL() throws an error when the text
// is not a real web address. `catch` keeps the page from crashing.
// Returns true when the text is a usable web address.
export function isValidLink(link) {
  try {
    const url = new URL(link);
    const isWeb = url.protocol === 'http:' || url.protocol === 'https:';
    return isWeb && url.hostname.includes('.');
  } catch {
    return false;
  }
}

// PART 5 - ARRAY METHODS: map changes every item; filter keeps
// only the items that pass a test. Here we remove empty links and
// duplicates.
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
// The loop goes over each pair in the object. An unknown site
// shows its address instead.
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
