// ============================================================
// VIDEO PART 3 - DEVELOPMENT SETUP AND STRUCTURE
// TOPIC 4 OF 4: src/data/artworks.js (the starting data)
// ------------------------------------------------------------
// This file is not a component and it does not draw anything. It
// is just data. It tells the gallery what to show before the
// visitor adds their own card.
//
// The words used in this site:
//   card  = one artist's square tile in the gallery
//   deck  = the 1 to 5 works (pictures or videos) inside a card
//   socials = the list of social media links under the card
//
// The pictures live in public/art. When you build the site for
// GitHub Pages, Vite makes a copy in docs/art automatically. You
// only edit public/art. The `art()` helper below adds the correct
// base path, so the images work both locally and on GitHub Pages.
//
// If you want only one picture, delete two of the three `works`
// lines at the bottom. The viewer still works, but the swipe-
// through-works demo will have only one slide.
// ============================================================

export const GALLERY_NAME = 'CDArt Gallery';
export const ARTIST_NAME = 'Keiffer';

export const CATEGORIES = ['Digital', 'Traditional', 'Photography', 'Animation', 'Video'];

export const MAX_WORKS = 5;

// PART 3 - This helper adds the correct base path to each image.
const art = (file) => `${import.meta.env.BASE_URL}art/${file}`;

export const startingCards = [
  {
    id: 1,
    title: 'Keiffer - Selected Works',
    author: ARTIST_NAME,
    category: 'Digital',
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
