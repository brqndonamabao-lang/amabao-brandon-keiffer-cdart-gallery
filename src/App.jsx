import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import CardTile from './components/CardTile';
import CardViewer from './components/CardViewer';
import UploadForm from './components/UploadForm';
import PostedNotice from './components/PostedNotice';
import EditCardDialog from './components/EditCardDialog';
import ReportDialog from './components/ReportDialog';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { GALLERY_NAME, CATEGORIES, startingCards } from './data/artworks';

// The site opens in dark mode so the Night background looks its best.
// Visitors can still switch to light with the theme button.
function getStartingTheme() {
  return 'dark';
}

// Give every starting card the fields the app needs.
function prepareCard(card) {
  return {
    ...card,
    caption: card.caption || '',
    socials: card.socials || [],
    reports: [],
    reportedByMe: false,
    isMine: false, // true only for the card posted by the visitor using this page
  };
}

function App() {
  // ---- STATE: everything that changes and makes the page re-render ----
  const [cards, setCards] = useState(() => startingCards.map(prepareCard));
  const [theme, setTheme] = useState(getStartingTheme);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  // A shared link like .../#card-3 opens that card straight away
  const [selectedId, setSelectedId] = useState(() => {
    const match = window.location.hash.match(/^#card-(\d+)$/);
    return match ? Number(match[1]) : null;
  }); // card open in the viewer
  const [editingId, setEditingId] = useState(null); // card open in the edit pop-up
  const [reportingId, setReportingId] = useState(null); // card open in the report pop-up
  const galleryRef = useRef(null);

  // Keep the address bar in sync, so "Copy link" in the viewer shares the card
  useEffect(() => {
    if (selectedId) {
      history.replaceState(null, '', `#card-${selectedId}`);
    } else if (/^#card-\d+$/.test(window.location.hash)) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [selectedId]);

  // Keep the browser UI (mobile address bar, form controls) in step with the theme
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1224' : '#f6f1ea');
  }, [theme]);

  // ---- EVENT HANDLERS ----
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Like / unlike. Likes only live in React state, so a refresh resets them
  // (no database, as intended for this project).
  const handleLike = (id) => {
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

  // Called by UploadForm when a valid card is submitted.
  // The card is marked as the visitor's own, which pins it to the top
  // and hides the post form (one card per artist).
  const handleAddCard = (newCard) => {
    const nextId = cards.reduce((max, card) => Math.max(max, card.id), 0) + 1;
    setCards([
      { ...newCard, id: nextId, likes: 0, liked: false, reports: [], reportedByMe: false, isMine: true },
      ...cards,
    ]);
    setActiveCategory('All');
    setSearchText('');
    // After the screen updates, scroll up to the gallery so the new card is seen
    setTimeout(() => galleryRef.current.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // Save the changes made in the edit pop-up
  const handleSaveEdit = (changes) => {
    setCards(cards.map((card) => (card.id === editingId ? { ...card, ...changes } : card)));
    setEditingId(null);
  };

  // Remove the card being edited (the pop-up already asked "are you sure?")
  const handleDeleteCard = () => {
    setCards(cards.filter((card) => card.id !== editingId));
    setEditingId(null);
  };

  const openEditor = (id) => {
    setSelectedId(null); // close the viewer first
    setEditingId(id);
  };

  // A visitor sent a report: store the reason and hide the card for them
  const handleReport = (reason) => {
    setCards(
      cards.map((card) =>
        card.id === reportingId
          ? { ...card, reports: [...card.reports, reason], reportedByMe: true }
          : card
      )
    );
    if (selectedId === reportingId) setSelectedId(null);
    setReportingId(null);
  };

  // "Surprise me": open a random card (skipping ones the visitor reported)
  const handleSurprise = () => {
    const pool = cards.filter((card) => !card.reportedByMe);
    if (pool.length === 0) return;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setSelectedId(pool[randomIndex].id);
  };

  // ---- DERIVED DATA: calculated from state on every render ----
  const query = searchText.trim().toLowerCase();
  const filteredCards = cards.filter((card) => {
    const matchesCategory = activeCategory === 'All' || card.category === activeCategory;
    const matchesSearch =
      query === '' ||
      card.title.toLowerCase().includes(query) ||
      card.caption.toLowerCase().includes(query) ||
      card.author.toLowerCase().includes(query) ||
      card.socials.join(' ').toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // ORDER: the visitor's own card is pinned first. Everything else is newest
  // first, so a new artist is never buried under older, popular cards.
  // Hearts are appreciation, not a ranking.
  const galleryCards = [...filteredCards].sort((a, b) => {
    if (a.isMine !== b.isMine) return a.isMine ? -1 : 1;
    return b.id - a.id;
  });

  const totalLikes = cards.reduce((sum, card) => sum + card.likes, 0);
  const totalWorks = cards.reduce((sum, card) => sum + card.works.length, 0);
  const myCard = cards.find((card) => card.isMine);
  const selectedCard = cards.find((card) => card.id === selectedId);
  const editingCard = cards.find((card) => card.id === editingId);
  const reportingCard = cards.find((card) => card.id === reportingId);

  return (
    <div className="app-shell" data-theme={theme}>
      <a className="skip-link" href="#gallery">Skip to the gallery</a>

      <Navbar galleryName={GALLERY_NAME} theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <HeroSection
          galleryName={GALLERY_NAME}
          cardCount={cards.length}
          workCount={totalWorks}
          totalLikes={totalLikes}
          onSurprise={handleSurprise}
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
            resultCount={galleryCards.length}
          />

          {galleryCards.length > 0 ? (
            <div className="card-grid">
              {galleryCards.map((card) => (
                <CardTile
                  key={card.id}
                  card={card}
                  onOpen={setSelectedId}
                  onLike={handleLike}
                  onReport={setReportingId}
                />
              ))}
            </div>
          ) : (
            <p className="empty-state">
              No cards match that search. Try another word or pick &ldquo;All&rdquo;.
            </p>
          )}

          {cards.length === 1 && galleryCards.length === 1 && (
            <p className="gallery-note">
              The wall is just opening. Post your card below and it will be pinned
              here beside the featured artist.
            </p>
          )}
        </section>

        {/* One card per artist: after posting, the form is replaced by a notice */}
        {myCard ? (
          <PostedNotice card={myCard} onView={setSelectedId} onEdit={openEditor} />
        ) : (
          <UploadForm categories={CATEGORIES} onAddCard={handleAddCard} />
        )}

        <AboutSection cards={cards} categories={CATEGORIES} />
      </main>

      <Footer galleryName={GALLERY_NAME} />

      {selectedCard && (
        <CardViewer
          key={selectedCard.id}
          card={selectedCard}
          onLike={handleLike}
          onReport={setReportingId}
          onEdit={openEditor}
          onClose={() => setSelectedId(null)}
        />
      )}

      {editingCard && (
        <EditCardDialog
          card={editingCard}
          categories={CATEGORIES}
          onSave={handleSaveEdit}
          onDelete={handleDeleteCard}
          onCancel={() => setEditingId(null)}
        />
      )}

      {reportingCard && (
        <ReportDialog
          title={reportingCard.title}
          onSubmit={handleReport}
          onCancel={() => setReportingId(null)}
        />
      )}
    </div>
  );
}

export default App;
