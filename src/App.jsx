import { useEffect, useRef, useState } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import GalleryCard from './components/GalleryCard';
import ArtworkViewer from './components/ArtworkViewer';
import PostForm from './components/PostForm';
import EditCardPopup from './components/EditCardPopup';
import ReportPopup from './components/ReportPopup';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { GALLERY_NAME, CATEGORIES, startingCards } from './data/artworks';

/* ============================================================
   VIDEO PART 3 - DEVELOPMENT SETUP AND STRUCTURE
   TOPIC 3 OF 4: src/App.jsx (the brain of the page)
   ------------------------------------------------------------
   This is the main React file. It does three jobs:
   1. It imports the small pieces (NavBar, HeroSection, etc.).
   2. It keeps the shared data (cards, theme, search).
   3. It puts the pieces in order on the screen.

   The imports at the top are like bringing tools into a room.
   `useState`, `useEffect`, and `useRef` come from React. The other
   imports are our own components and data.

   At the bottom of this file you will see `return (`. What is
   that? A React component is just a JavaScript function. A normal
   JavaScript function can return a result, like a calculator
   returns a number. In React, that result is JSX: code that looks
   like HTML but is actually JavaScript. React takes the returned
   JSX and turns it into real page elements.

   So `return (` means: "here is what this component should show."
   It comes from React's rule that a component must return
   something to display. If a component returns nothing, nothing
   appears on the screen. The `return` is not an HTML tag and it
   is not a React-only keyword; it is normal JavaScript.

   The order inside the return is the order on the page:
   NavBar -> HeroSection -> Gallery -> Post form -> About ->
   Footer. The pop-ups at the bottom appear only when their state
   says they should.

   The next topic is src/data/artworks.js, which holds the starting
   card data that App.jsx uses.
   ============================================================ */

/* ============================================================
   PART 6 - REACT DATA SHAPE
   ------------------------------------------------------------
   `prepareCard` takes one card and adds the fields the app needs.
   The `...card` part copies everything that is already there.
   Then we add the missing fields with safe starting values.
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
     value between renders, but changing it does NOT re-draw the
     page. We use it to point at the gallery section so we can
     scroll to it later.
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
     browser theme colour, timers, and event listeners. The array
     at the end (for example `[openCardId]`) tells React when to
     run the effect again. An empty array `[]` means "run once,
     when the component first appears."
     ========================================================== */
  useEffect(() => {
    if (openCardId) {
      history.replaceState(null, '', `#card-${openCardId}`);
    } else if (/^#card-\d+$/.test(window.location.hash)) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [openCardId]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1224' : '#f2ece2');
  }, [theme]);

  /* ==========================================================
     VIDEO PART 5 - EVENT HANDLERS
     ----------------------------------------------------------
     These functions run when the visitor clicks something.
     `toggleTheme` flips light and dark. `toggleHeart` uses `.map()`
     to find one card and change only that card. `addCard` uses the
     spread operator `...` to put the new card at the front.
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
    const nextId = cards.reduce((max, card) => Math.max(max, card.id), 0) + 1;
    setCards([
      { ...newCard, id: nextId, likes: 0, liked: false, reports: [], reportedByMe: false, isMine: true },
      ...cards,
    ]);
    setActiveCategory('All');
    setSearchText('');
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
    const pool = cards.filter((card) => !card.reportedByMe);
    if (pool.length === 0) return;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setOpenCardId(pool[randomIndex].id);
  };

  /* ==========================================================
     VIDEO PART 5 - DERIVED DATA
     ----------------------------------------------------------
     These values are calculated from state on every render.
     `.filter()` keeps only the cards that match the category and
     the search text. `.sort()` puts the visitor's own card first.
     `.reduce()` adds up the hearts and the works. `.find()` picks
     one card by its id.
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

  const totalLikes = cards.reduce((sum, card) => sum + card.likes, 0);
  const totalWorks = cards.reduce((sum, card) => sum + card.works.length, 0);
  const myCard = cards.find((card) => card.isMine);
  const openCard = cards.find((card) => card.id === openCardId);
  const editingCard = cards.find((card) => card.id === editingCardId);
  const reportingCard = cards.find((card) => card.id === reportingCardId);

  /* ==========================================================
     VIDEO PART 8 - FINAL WEBSITE WALKTHROUGH
     ----------------------------------------------------------
     This is the `return` explained in Part 3. Everything inside it
     is what the visitor sees. Read it from top to bottom:
     NavBar -> HeroSection -> Gallery -> Post form -> About ->
     Footer. Then show the pop-ups at the bottom: the viewer, the
     edit pop-up, and the report pop-up.
     ========================================================== */
  return (
    <div className="app-shell" data-theme={theme}>
      <a className="skip-link" href="#gallery">Skip to the gallery</a>

      <NavBar galleryName={GALLERY_NAME} theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <HeroSection
          galleryName={GALLERY_NAME}
          cardCount={cards.length}
          workCount={totalWorks}
          totalLikes={totalLikes}
          onSurprise={openRandomCard}
        />

        <section className="section" id="gallery" ref={galleryRef} aria-labelledby="gallery-title">
          <p className="eyebrow">Fresh on the wall</p>
          <h2 id="gallery-title">Discover artists</h2>
          <p className="section-intro">
             Open a card to see an artist’s work. Drag the art or the bar below it to move through the pieces,
             leave a heart on the ones you like, and follow the links to see more.
          </p>

          <FilterBar
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchText={searchText}
            onSearchChange={setSearchText}
            resultCount={visibleCards.length}
          />

          {visibleCards.length > 0 ? (
            <div className="card-grid">
              {visibleCards.map((card) => (
                <GalleryCard
                  key={card.id}
                  card={card}
                  onOpen={setOpenCardId}
                  onLike={toggleHeart}
                  onReport={setReportingCardId}
                />
              ))}
            </div>
          ) : (
            <p className="empty-state">
              No cards match that search. Try another word or pick &ldquo;All&rdquo;.
            </p>
          )}

          {cards.length === 1 && visibleCards.length === 1 && (
            <p className="gallery-note">
              The wall is just opening. Post your card below and it will be pinned
              here beside the featured artist.
            </p>
          )}
        </section>

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
          <PostForm categories={CATEGORIES} onAddCard={addCard} />
        )}

        <AboutSection />
      </main>

      <Footer galleryName={GALLERY_NAME} />

      {openCard && (
        <ArtworkViewer
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
        <ReportPopup
          title={reportingCard.title}
          onSubmit={reportCard}
          onCancel={() => setReportingCardId(null)}
        />
      )}
    </div>
  );
}

export default App;
