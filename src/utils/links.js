// Helper functions for social media links (shared by the form and the cards).

// Add "https://" if the visitor typed just "instagram.com/name"
export function normalizeLink(text) {
  const trimmed = text.trim();
  if (trimmed === '') return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : 'https://' + trimmed;
}

// Returns true when the text is a usable http(s) web address
export function isValidLink(link) {
  try {
    const url = new URL(link);
    const isWeb = url.protocol === 'http:' || url.protocol === 'https:';
    return isWeb && url.hostname.includes('.');
  } catch {
    return false; // new URL() throws when the text is not a real address
  }
}

// Clean a list of typed links: add https://, drop empty ones, drop duplicates
export function cleanLinks(links) {
  return links
    .map(normalizeLink)
    .filter((link, index, all) => link !== '' && all.indexOf(link) === index);
}

// Known platforms: web address -> friendly name
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

// "https://www.instagram.com/keiffer" -> "Instagram" (unknown sites show their address)
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
