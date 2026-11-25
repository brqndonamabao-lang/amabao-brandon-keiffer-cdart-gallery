export const GALLERY_NAME = 'CDArt Gallery';
export const ARTIST_NAME = 'Keiffer';
export const CATEGORIES = ['Digital Art', 'Traditional', 'Animation'];
export const MAX_WORKS = 5;

// PART 3 - This helper adds the folder path to each image name.
const art = (file) => `${import.meta.env.BASE_URL}art/${file}`;

export const startingCards = [
  {
    id: 1,
    title: 'Keiffer - Selected Works',
    author: ARTIST_NAME,
    category: 'Digital Art',
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
