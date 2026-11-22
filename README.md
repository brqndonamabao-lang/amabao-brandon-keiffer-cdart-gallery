# Amabao_Brandon_Keiffer_WebsiteProject

## CDArt Gallery | Card Gallery for Artists

**Student:** Brandon Keiffer Amabao  
**Course:** BSIT 3  
**Subject:** ITEC 138  
---

### Concept

CDArt Gallery (CD = Card Deck) is a card gallery that helps artists gain fans. Each artist posts **ONE card**: a square tile holding 1 to 5 works (pictures or videos), with a title, optional caption, and social media links. It's made for artists who want more followers and for visitors who want quick art inspiration.

Visitors scroll cards, open one, swipe through works, leave a heart, and follow the artist on real social media. New cards appear first, so a small artist is never buried under older, popular ones.

---

### Rules of the Gallery

- **One card per artist**, holding 1 to 5 works. No accounts, no premium: everyone gets the same single card.
- **Social media links are required** (1 to 5 accounts). Artists link accounts where they post the same artwork, so fans can verify it and follow them.
- Captions are optional. Posting without one shows an "Are you sure?" question first.
- After posting, the form disappears and the artist's card is pinned at the top. The artist can still edit it.
- Every card has a **Report** button (copyright, violent, nudity, other). The reporter no longer sees that card.

---

### Key User Tasks

1. Scroll, filter and search the cards, or press "Surprise me" for a random one.
2. Open a card, scroll through its works, heart it, and follow the artist.
3. Post your own card with 1 to 5 works and your social links.

---

### Features

- Square card tiles in newest-first order (your own card is pinned first); hearts are appreciation, not a ranking; cards with several works look like a small stack
- Card viewer: full-screen art on the left with title, caption, hearts, social links, and share buttons on the right; works scroll sideways (mouse wheel, horizontal scroll bar, swipe on touch screens, or keyboard arrows)
- Social link buttons under every card (Instagram, TikTok, X, YouTube, Facebook, and more)
- Post form with validation, 1 to 5 works (pictures or videos), previews, and removable files
- Edit my card (works while the page is open)
- Report button (reported cards are hidden from your gallery); light/dark theme toggle
- Categories: Digital, Traditional, Photography, Animation, Video
- Slowly moving "Night" background (CSS animation, `public/bg/night.jpg`)
- Live data table (cards and hearts per category), nested lists, `<pre>` poem, scroll-progress bar

---

### Tools Used

- HTML5, CSS3, JavaScript (ES6), React (functional components, props, `useState`, `useEffect`), Vite
- Plain CSS — no framework, no CSS-in-JS
- Three starting artworks (Melancholy of Becoming, Meme, Burden Memory) by Keiffer, in `public/art/`
- Background: a painted reproduction of The Starry Night by Vincent van Gogh (public domain)

---

### How to Run

1. Install Node.js, then open this folder in VS Code.
2. Terminal: `npm install`
3. Terminal: `npm run dev` and open the shown link (usually `http://localhost:5173`)

**Live website (GitHub Pages):** https://brqndonamabao-lang.github.io/amabao-brandon-keiffer-cdart-gallery/

---

### Known Limitations

- Social links are checked only for a valid web address. The site cannot verify that the accounts really belong to the poster.
- **Frontend only**: no server, database, or login. Cards, likes, and edits live in the browser and **reset on refresh**. Because there are no accounts, "one card per artist" is only enforced while the page is open. Shared card links (`#card-2`) only work while that card still exists, so a link to a posted card stops working after a refresh.
- Chosen pictures and videos are shown through temporary browser URLs and are not uploaded anywhere.
- Edit the starting card, caption, and social links in `src/data/artworks.js`.
- Pictures are limited to 5 MB and videos to 30 MB each.
- The background animation is switched off for visitors who set "reduce motion" on their device.

---

### Grading Rubric Summary

The project is graded out of 100 points across website criteria (HTML, CSS, JavaScript, React, functionality, video, presentation, organization) and video documentation. See the full guidelines PDF for detailed point breakdown.
