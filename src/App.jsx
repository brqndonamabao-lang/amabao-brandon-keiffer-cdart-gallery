import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ArtworkDetails from './components/ArtworkDetails';
import PostArtwork from './components/PostArtwork';
import EditCardPopup from './components/EditCardPopup';
import ReportArtwork from './components/ReportArtwork';
import About from './components/About';
import Footer from './components/Footer';
import { GALLERY_NAME, CATEGORIES, startingCards } from './data/artworks';

/* ============================================================
   VIDEO PART 3 - DEVELOPMENT SETUP AND STRUCTURE
   TOPIC 3 OF 4: src/App.jsx (the brain of the page)
   ------------------------------------------------------------
   This is the main React file. It does three jobs:
   1. It imports the small pieces (Navbar, Hero, Gallery, etc.).
   2. It keeps the shared data (cards, theme, search).
   3. It puts the pieces in order on the screen.

   "Import" means bringing code from another file so we can use
   it here. The imports at the top are like bringing tools into
   a room.

   `useState`, `useEffect`, and `useRef` come from React. The
   other imports are our own components and data.

   What is a component? It is a small reusable piece of the page,
   like a button, one card, or a whole section. We build a big
   page by putting small pieces together.

   At the bottom of this file you will see `return (`. What is
   that? A React component is just a JavaScript function. A normal
   function can return a result, like a calculator returns a
   number. In React, that result is JSX. JSX looks like HTML, but
   it is really JavaScript, so we can put values and logic inside
   it. React turns the returned JSX into real page elements.

   So `return (` means: "here is what this component should
   show." A component must return something to display. If it
   returns nothing, nothing appears on the screen. `return` is
   normal JavaScript, not an HTML tag and not a special React
   keyword.

   The order inside the return is the order on the page:
   Navbar -> Hero -> Gallery -> Post artwork -> About -> Footer.
   The pop-ups at the bottom appear only when someone opens them.

   The next topic is src/data/artworks.js, which holds the
   starting card data that App.jsx uses.
   ============================================================ */

/* ============================================================
   PART 6 - REACT DATA SHAPE
   ------------------------------------------------------------
   `prepareCard` takes one card and adds the fields the app needs.
   `...card` is the spread operator. It means "copy everything
   that is already in this card". Then we add the missing fields
   with safe starting values.
   `isMine` is false for the featured artist. It becomes true only
   for the card posted by the visitor using this page.
   ============================================================ */
function prepareCard(card) {
  return {
    ...card,
    socials: card.socials || [],
    reports: [],
    reportedByMe: false,
    isMine: false,
  };
}

function App() {
  /* ==========================================================
     VIDEO PART 6 - REACT IMPLEMENTATION
     STATE: data that can change
     ----------------------------------------------------------
     "State" is information the page remembers while it is open.
     `useState` gives us two things in one line:
     - the current value (cards, theme, searchText, ...)
     - a setter function (setCards, setTheme, ...)
     When we call the setter, React re-draws the page with the new
     value. We never change the screen by hand.

     Example:
       const [theme, setTheme] = useState('dark');
     `theme` is the value now. `setTheme('light')` changes it, and
     React updates every place that uses `theme`.

     `useRef` is different. It is a small box that remembers a
     value between re-draws, but changing it does NOT re-draw the
     page. We use it to point at the gallery section so we can
     scroll back to it later.
     ========================================================== */
  const [cards, setCards] = useState(() => startingCards.map(prepareCard));
  const [theme, setTheme] = useState('dark');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [openCardId, setOpenCardId] = useState(() => {
    const match = window.location.hash.match(/^#card-(\d+)$/);
    return match ? Number(match[1]) : null;
  });
  const [editingCardId, setEditingCardId] = useState(null);
  const [reportingCardId, setReportingCardId] = useState(null);
  const galleryRef = useRef(null);

  /* ==========================================================
     VIDEO PART 5 - JAVASCRIPT INTERACTIONS
     EFFECTS: code that runs after the screen updates
     ----------------------------------------------------------
     `useEffect` is for things outside React: the address bar, the
     browser tab colour, timers, and event listeners. An "event
     listener" is code that waits for something to happen, like a
     key press or a click.

     The array at the end (for example `[openCardId]`) tells React
     when to run the effect again. An empty array `[]` means "run
     once, when the component first appears."
     ========================================================== */
  useEffect(() => {
    // PART 5 - Put the open card in the address bar, so the link
    // can be copied and shared. `replaceState` changes the address
    // without reloading the page.
    if (openCardId) {
      history.replaceState(null, '', `#card-${openCardId}`);
    } else if (/^#card-\d+$/.test(window.location.hash)) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [openCardId]);

  useEffect(() => {
    // PART 5 - Change the colour the phone uses for its browser bar,
    // so it matches the dark or light theme.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1224' : '#f2ece2');
  }, [theme]);

  /* ==========================================================
     VIDEO PART 5 - EVENT HANDLERS
     ----------------------------------------------------------
     These functions run when the visitor clicks something.
     `toggleTheme` flips light and dark. `toggleHeart` uses `.map()`
     to go over every card and change only the one that was
     clicked. `addCard` uses the spread operator `...` to put the
     new card at the front of the list.
     ========================================================== */
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const toggleHeart = (id) => {
    setCards(
      cards.map((card) => {
        if (card.id !== id) return card;
        return {
          ...card,
          liked: !card.liked,
          likes: card.liked ? card.likes - 1 : card.likes + 1,
        };
      })
    );
  };

  const addCard = (newCard) => {
    // PART 5 - `reduce` looks at every card and keeps the biggest
    // id. Add 1 so the new card gets a fresh id.
    const nextId = cards.reduce((max, card) => Math.max(max, card.id), 0) + 1;
    setCards([
      { ...newCard, id: nextId, likes: 0, liked: false, reports: [], reportedByMe: false, isMine: true },
      ...cards,
    ]);
    setActiveCategory('All');
    setSearchText('');
    // PART 5 - After posting, scroll back to the gallery.
    // setTimeout waits a moment so React can draw the new card first.
    setTimeout(() => galleryRef.current.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const saveCardEdits = (changes) => {
    setCards(cards.map((card) => (card.id === editingCardId ? { ...card, ...changes } : card)));
    setEditingCardId(null);
  };

  const deleteCard = () => {
    setCards(cards.filter((card) => card.id !== editingCardId));
    setEditingCardId(null);
  };

  const openEditor = (id) => {
    setOpenCardId(null);
    setEditingCardId(id);
  };

  const reportCard = (reason) => {
    setCards(
      cards.map((card) =>
        card.id === reportingCardId
          ? { ...card, reports: [...card.reports, reason], reportedByMe: true }
          : card
      )
    );
    if (openCardId === reportingCardId) setOpenCardId(null);
    setReportingCardId(null);
  };

  const openRandomCard = () => {
    // PART 5 - Keep only cards that were not reported, then pick
    // one random card from that list.
    const pool = cards.filter((card) => !card.reportedByMe);
    if (pool.length === 0) return;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setOpenCardId(pool[randomIndex].id);
  };

  /* ==========================================================
     VIDEO PART 5 - DERIVED DATA
     ----------------------------------------------------------
     These values are calculated from state every time the page
     re-draws. `.filter()` keeps only the cards that match the
     category and the search text. `.sort()` puts the visitor's
     own card first. `.find()` picks one card by its id.
     ========================================================== */
  const query = searchText.trim().toLowerCase();
  const filteredCards = cards.filter((card) => {
    const matchesCategory = activeCategory === 'All' || card.category === activeCategory;
    const matchesSearch =
      query === '' ||
      card.title.toLowerCase().includes(query) ||
      card.author.toLowerCase().includes(query) ||
      card.socials.join(' ').toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const visibleCards = [...filteredCards].sort((a, b) => {
    if (a.isMine !== b.isMine) return a.isMine ? -1 : 1;
    return b.id - a.id;
  });

  const myCard = cards.find((card) => card.isMine);
  const openCard = cards.find((card) => card.id === openCardId);
  const editingCard = cards.find((card) => card.id === editingCardId);
  const reportingCard = cards.find((card) => card.id === reportingCardId);

  /* ==========================================================
     VIDEO PART 8 - FINAL WEBSITE WALKTHROUGH
     ----------------------------------------------------------
     This is the `return` explained in Part 3. Everything inside it
     is what the visitor sees. Read it from top to bottom:
     Navbar -> Hero -> Gallery -> Post artwork -> About ->
     Footer. Then show the pop-ups at the bottom: ArtworkDetails,
     the edit pop-up, and the report pop-up.
     ========================================================== */
  return (
    <div className="app-shell" data-theme={theme}>
      <a className="skip-link" href="#gallery">Skip to the gallery</a>

      <Navbar galleryName={GALLERY_NAME} theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero galleryName={GALLERY_NAME} onSurprise={openRandomCard} />

        <Gallery
          cardCount={cards.length}
          visibleCards={visibleCards}
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchText={searchText}
          onSearchChange={setSearchText}
          onOpen={setOpenCardId}
          onLike={toggleHeart}
          onReport={setReportingCardId}
          sectionRef={galleryRef}
        />

        {myCard ? (
          <section className="section upload" id="upload" aria-labelledby="posted-title">
            <p className="eyebrow">You&rsquo;re in the gallery</p>
            <h2 id="posted-title">Your card is live</h2>
            <p className="section-intro">
              &ldquo;{myCard.title}&rdquo; is pinned at the top of the gallery. You can
              still edit it any time.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => setOpenCardId(myCard.id)}>
                View my card
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => openEditor(myCard.id)}>
                Edit my card
              </button>
            </div>
            <p className="fineprint">
              Demo note: editing works while this page is open, but nothing is saved, so a
              refresh clears it.
            </p>
          </section>
        ) : (
          <PostArtwork categories={CATEGORIES} onAddCard={addCard} />
        )}

        <About />
      </main>

      <Footer galleryName={GALLERY_NAME} />

      {openCard && (
        <ArtworkDetails
          key={openCard.id}
          card={openCard}
          onLike={toggleHeart}
          onReport={setReportingCardId}
          onEdit={openEditor}
          onClose={() => setOpenCardId(null)}
        />
      )}

      {editingCard && (
        <EditCardPopup
          card={editingCard}
          categories={CATEGORIES}
          onSave={saveCardEdits}
          onDelete={deleteCard}
          onCancel={() => setEditingCardId(null)}
        />
      )}

      {reportingCard && (
        <ReportArtwork
          title={reportingCard.title}
          onSubmit={reportCard}
          onCancel={() => setReportingCardId(null)}
        />
      )}
    </div>
  );
}

export default App;
