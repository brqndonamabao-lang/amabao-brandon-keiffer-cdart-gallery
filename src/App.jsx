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

  return (
    <div className="app-shell" data-theme={theme}>
      <Navbar galleryName={GALLERY_NAME} theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero galleryName={GALLERY_NAME} onSurprise={openRandomCard} />

        <Gallery
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
