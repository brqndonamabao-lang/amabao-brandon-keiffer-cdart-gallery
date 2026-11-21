// Locally defined sample data (no database needed).
//
// WORDS USED IN THIS SITE
//   card  = one artist's square tile in the gallery
//   deck  = the 1 to 5 works (pictures or videos) inside that card
//
// socials: a list of social media links shown under the card, for example
//   socials: ['https://instagram.com/yourname', 'https://x.com/yourname']

export const GALLERY_NAME = 'CDArt Gallery'; // CD = Card Deck
export const ARTIST_NAME = 'Keiffer';

// Keep categories general and simple (the artist's main style).
export const CATEGORIES = ['Digital', 'Traditional', 'Photography', 'Animation', 'Video'];

export const MAX_WORKS = 5; // a card can hold 1 to 5 works

// BASE_URL is Vite's base path. It is "/" when running locally with npm run dev,
// and "/amabao-brandon-keiffer-cdart-gallery/" on GitHub Pages. Prefixing the
// image paths with it keeps the artworks loading in BOTH places.
const art = (file) => `${import.meta.env.BASE_URL}art/${file}`;

export const startingCards = [
  {
    id: 1,
    title: 'Keiffer - Selected Works',
    author: ARTIST_NAME,
    category: 'Digital',
    caption: '',
    socials: [
      'https://www.youtube.com/@KeiiAnimation',
      'https://www.tiktok.com/@k3ffer?is_from_webapp=1&sender_device=pc',
    ],
    works: [
      { id: 1, url: art('meme.png'), type: 'image' },
      { id: 2, url: art('melancholy-of-becoming.png'), type: 'image' },
      { id: 3, url: art('burden-memories.png'), type: 'image' },
    ],
    likes: 0,
    liked: false,
  },
];
