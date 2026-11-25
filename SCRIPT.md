# SCRIPT

## PART 1 - Creative opening (0:00-0:30)

> Begin with a short hook, montage, or face-camera introduction. State your name and the project title.

## PART 2 - Concept and planning (0:30-1:30)

> Explain the website's purpose, target users, the need it addresses, key features, and the initial layout or plan.

## PART 3 - Development setup and structure (1:30-2:30)

> Show your editor and project files. Explain the HTML/JSX structure, semantic elements, headings, content, links, images, lists, or tables used.

### index.html

```html
    <!--
      ============================================================
      VIDEO PART 3 - DEVELOPMENT SETUP AND STRUCTURE
      TOPIC 1 OF 4: index.html (the shell of the website)
      ------------------------------------------------------------
      Hi. This is index.html. It is the only real HTML file in the
      project. When the browser opens the website, it reads this
      file first.

      The page has two main parts:
      1. <head> = information ABOUT the page. You do not see it on
         the page itself. It holds the words on the browser tab
         (<title>), the small icon (favicon), and notes for search
         engines.
      2. <body> = what people actually see.

      "Meta" means extra information about something. A <meta> tag
      is a note for the browser or a search engine, not text a
      visitor reads on the page. For example, the viewport tag
      tells a phone: "use the real screen width, do not zoom out."

      Inside <body> there is an empty box: <div id="root"></div>.
      It is empty on purpose. React will fill it with the whole
      gallery.

      At the bottom, the <script> tag starts React. In this source
      code it points to /src/main.jsx. When the site is built for
      the internet, that line becomes one bundled file instead.
      That is how the browser knows to run our React code.

      So the story is: index.html gives the browser a title, an
      icon, and an empty box called root. React takes over from
      there. The next topic is src/main.jsx, which is the file that
      finds that box and starts React inside it.
      ============================================================
    -->
```

### src/main.jsx

```jsx
// ============================================================
// VIDEO PART 3 - DEVELOPMENT SETUP AND STRUCTURE
// TOPIC 2 OF 4: src/main.jsx (the starting point of React)
// ------------------------------------------------------------
// This file is short, but it is the bridge between index.html
// and React. It answers one question: "Where does React start?"
//
// React is a tool for building a page out of small pieces called
// components. A component is just a JavaScript function that
// returns what should appear on the screen.
//
// The line below brings in a function called createRoot. That
// function knows how to take over an empty HTML element and let
// React draw inside it.
//
// document.getElementById('root') looks in index.html for the
// element with id="root". That is the empty box from the last
// topic. If the box is missing, React has nowhere to draw, so
// this step matters.
//
// createRoot(...) turns that box into a React root. Then
// .render(<App />) tells React: "draw the App component inside
// this box." App is the main component, and it contains the
// whole page.
//
// <StrictMode> is a development helper. It shows nothing on the
// screen. It warns us about possible problems while we build the
// site, so we catch mistakes early.
//
// So the story is: index.html gives us the empty box, main.jsx
// finds it, and React starts drawing <App /> inside it. The next
// topic is src/App.jsx, which describes what that <App /> should
// actually show.
// ============================================================
```

```jsx
// PART 3 - Find the #root box and tell React to draw <App /> inside it.
```

### src/App.jsx

```jsx
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
```

### src/data/artworks.js

```js
// ============================================================
// VIDEO PART 3 - DEVELOPMENT SETUP AND STRUCTURE
// TOPIC 4 OF 4: src/data/artworks.js (the starting data)
// ------------------------------------------------------------
// This file is not a component and it does not draw anything. It
// is just data. It tells the gallery what to show before the
// visitor adds their own card.
//
// The words used in this site:
//   card    = one artist's square tile in the gallery
//   works   = the 1 to 5 pictures or videos inside a card
//   socials = the list of social media links under the card
//
// `export` means "let other files use this". App.jsx imports
// GALLERY_NAME, CATEGORIES, and startingCards from here.
//
// The pictures live in public/art. GitHub Pages puts this site in
// a folder, not at the top of the domain. The `art()` helper adds
// that folder path with import.meta.env.BASE_URL. Vite is the tool
// that builds the site, and "env" means its build settings. This
// way the images work both on your computer and on the internet.
//
// If you want only one picture, delete two of the three `works`
// lines below. The detail view still works, but the sideways
// scrolling demo will have only one slide.
// ============================================================
```

```js
// PART 3 - This helper adds the folder path to each image name.
```

### src/components/Navbar.jsx

```jsx
// ============================================================
// VIDEO PART 3 - STRUCTURE: this is one small piece of the page.
// VIDEO PART 6 - REACT: this piece receives props and shows them.
// ============================================================
//
// Navbar = the strip at the very top of the page.
// It holds the logo, the three section links, and the theme button.
//
// PROPS are values that App.jsx gives to this component. Think of
// props like ingredients passed into a recipe:
//   galleryName   -> the words "CDArt Gallery"
//   theme         -> "light" or "dark"
//   onToggleTheme -> a function App gave us; clicking calls it
//
// "Semantic HTML" means using a tag that says what the thing is.
// <header> says "this is the top of the page". <nav> says "this
// is a menu". We could use a plain <div> for both, but then the
// browser and screen readers would not know what they mean.
//
// PART 3 - HTML ELEMENTS USED HERE:
// <header> is the top strip. <nav> marks the main menu. <ul> and
// <li> make a list. <a> links to a section on the page. <button>
// runs a function.
```

```jsx
/* PART 3 - BRANDNAME HELPER
   ------------------------------------------------------------
   This tiny helper is kept here so we do not need an extra file.
   "CDArt Gallery" becomes a gold "CD" plus "Art Gallery".
   CD means Card Deck, so the first two letters get the accent
   colour. If the name does not start with "CD", it is printed as
   it is. */
```

### src/components/Hero.jsx

```jsx
// ============================================================
// VIDEO PART 3 - STRUCTURE: the first big section of the page.
// VIDEO PART 8 - WALKTHROUGH: this is the first thing a visitor sees.
// ============================================================
//
// Hero = the welcome area. "Hero" is a web design word for the
// big first block at the top of a page, usually with a title and
// a button.
//
// It explains the site in one line and gives two buttons.
//
// PROPS: galleryName, onSurprise
//
// PART 3 - HTML ELEMENTS USED HERE:
// <h1> is the biggest heading, and a page should have only one.
// <a> jumps to another part of the page. <button> runs a function.
```

### src/components/Gallery.jsx

```jsx
// ============================================================
// VIDEO PART 3 - STRUCTURE: the gallery section and its controls.
// VIDEO PART 6 - REACT: this component has no state of its own.
// App keeps the values and passes them down. This component only
// reports clicks and typing back up to App.
// ============================================================
//
// Gallery = the wall of artwork cards, plus the category buttons
// and the search box that narrow the wall down.
//
// A "chip" is just a small rounded button. The active chip is the
// one with a different colour.
//
// PROPS (the values App passes in):
//   cardCount        -> how many cards exist in total
//   visibleCards     -> the cards that match right now
//   categories       -> ["Digital Art", "Traditional", "Animation"]
//   activeCategory   -> the chip currently selected
//   onCategoryChange -> function App gave us
//   searchText       -> what the visitor typed
//   onSearchChange   -> function App gave us
//   onOpen           -> function to open ArtworkDetails
//   onLike           -> function to add or remove a heart
//   onReport         -> function to open the report pop-up
//   sectionRef       -> a handle to this section so App can scroll here
//
// PART 3 - HTML ELEMENTS USED HERE:
// <section> groups the gallery. <p> and <h2> introduce it.
// <button> is used for anything clickable. <input> takes the
// search text.
//
// PART 3 - ACCESSIBILITY: screen readers are software that read
// the page out loud. `role="group"` tells them the chips belong
// together. `aria-live="polite"` tells them to read the result
// count when it changes, without interrupting.
```

```jsx
      {/* PART 3 - The filter bar: category chips and a search box. */}
```

### src/components/ArtworkCard.jsx

```jsx
// ============================================================
// VIDEO PART 3 - STRUCTURE: one square card in the gallery.
// VIDEO PART 6 - REACT: App draws this once per card with .map().
// ============================================================
//
// ArtworkCard = the WHOLE card (picture + title + heart + report).
// It is not just the title. The title is the <h3> inside it.
//
// PROPS:
//   card     -> one object from the cards array in App.jsx
//   onOpen   -> function to open the detail view
//   onLike   -> function to add or remove a heart
//   onReport -> function to open the report pop-up
//
// PART 3 - HTML ELEMENTS USED HERE:
// <article> is one complete card. <h3> is the title. <button> is
// used for anything clickable. The cover is a button because
// clicking it opens the detail view.
//
// PART 3 - ACCESSIBILITY: `aria-label` is the name a screen
// reader reads out loud. `aria-pressed` says whether the heart is
// on or off, like a light switch.
```

### src/components/ArtworkDetails.jsx

```jsx
  // PART 3 - role="dialog" tells screen readers this is a pop-up.
  // aria-modal="true" means the page behind it is not active.
```

```jsx
      {/* PART 3 - The artwork. Each work is one full-screen slide. */}
```

```jsx
      {/* PART 3 - One column of quiet controls over the art. */}
```

### src/components/About.jsx

```jsx
// ============================================================
// VIDEO PART 3 - STRUCTURE: headings, paragraphs, lists, a poem.
// VIDEO PART 8 - WALKTHROUGH: scroll to the About section.
// ============================================================
//
// About = explains the gallery and its rules.
// It uses a numbered list, a nested list, and a <pre> poem.
//
// "Semantic HTML" means a tag that describes its job. <section>
// says "this is one part of the page". <h2> and <h3> are headings
// in order, like a book.
//
// PART 3 - HTML ELEMENTS USED HERE:
// <ol> is a numbered list (the steps). <ul> is a bullet list
// (the rules), and a <ul> can sit inside a <ul> for extra detail.
// That is called a nested list. <pre> keeps line breaks and spaces
// exactly as typed, which is why the poem looks like a poem.
```

### src/components/Footer.jsx

```jsx
// ============================================================
// VIDEO PART 3 - STRUCTURE: the bottom strip of the page.
// VIDEO PART 8 - the last region in the walkthrough.
// ============================================================
//
// Footer = the small print at the bottom of the page.
// It shows the copyright line and links to free art collections.
//
// PART 3 - HTML ELEMENTS USED HERE:
// <footer> marks the bottom of the page. <ul> and <li> make a
// list. <a> opens another website.
//
// PART 5 - `new Date().getFullYear()` asks the browser for the
// current year, so the copyright stays correct without editing
// the text every January.
```

## PART 4 - Styling and layout (2:30-3:45)

> Show CSS selectors, properties, values, styling methods, CSS variables, layout techniques, and responsive design. Explain your design choices.

### index.html

```html
    <!--
      ============================================================
      VIDEO PART 4 - STYLING AND LAYOUT
      EXAMPLE 1 OF 3: internal CSS (a <style> block in the head)
      ------------------------------------------------------------
      CSS is the paint of the page. It decides colours, spacing,
      and where things sit. "Internal CSS" just means the CSS lives
      inside this HTML file instead of a separate .css file.

      This tiny block colours the thin bar at the very top of the
      page. It sits here because that bar is not made by React.

      A "selector" is the part that says WHAT to style. Here the
      selector is #scroll-progress. The # means "the element with
      this id". An id is a name used once on the page. An id
      selector is stronger than a class selector (a name written
      with a dot, like .scroll-progress), so this colour wins over
      the grey one in App.css.

      The width is not set here. JavaScript sets it while you
      scroll, because the bar grows as you move down the page.
      ============================================================
    -->
```

```html
    <!--
      ============================================================
      VIDEO PART 4 - STYLING AND LAYOUT
      EXAMPLE 2 OF 3: inline CSS (the style="" attribute)
      ------------------------------------------------------------
      "Inline CSS" means the style is written right on the element,
      inside the style="..." attribute. It is the strongest of the
      three ways to add CSS, but it is hard to reuse.

      We only use it here for the starting width (0%), because
      JavaScript changes that width while you scroll.
      aria-hidden="true" tells screen readers to skip this bar.
      A screen reader is software that reads the page out loud for
      people who cannot see it.
      ============================================================
    -->
```

### src/App.css

```css
/* ============================================================
   VIDEO PART 4 - STYLING AND LAYOUT
   ------------------------------------------------------------
   This one file styles the whole site. Read it top to bottom in
   the video. The numbered markers below show what to point at.

   WHAT TO SAY FIRST:
   "HTML and React build the rooms. CSS is the paint. It decides
   the colours, the spacing, and where things sit on the screen."

   "Responsive" means the page changes to fit the screen, from a
   small phone to a big monitor. A "media query" is a rule that
   says: "only use this CSS when the screen is smaller than X."

   THE THREE CSS METHODS (all three are in this project):
   1. Inline style  -> style="..." in index.html (strongest)
   2. Internal block -> <style> in index.html
   3. External file  -> this file (easiest to reuse)
   ============================================================ */
```

```css
/* ============================================================
   PART 4.1 - CSS VARIABLES (custom properties)
   ------------------------------------------------------------
   A variable is a name that holds a value. We define it once in
   :root, which means "the whole page", and reuse it with
   var(--name). Think of it like naming a colour once and using
   that name everywhere. Change one line here and the whole site
   changes.
   Palette: the Night painting - deep blue, cream paper, star yellow.
   ============================================================ */
```

```css
/* ============================================================
   PART 4.2 - THE DARK THEME
   ------------------------------------------------------------
   Same variable names, new values. The theme button in the
   Navbar sets data-theme="dark" on .app-shell, so every var()
   below switches to the dark colours at the same time.
   That is why one button can re-paint the whole website.
   ============================================================ */
```

```css
/* ============================================================
   PART 4.3 - BASE STYLES (element selectors)
   ------------------------------------------------------------
   These rules target HTML element names: body, h1, p, a, img.
   That is called an element selector. They set the defaults for
   the whole page.
   box-sizing: border-box means padding is counted INSIDE the
   width, so a box is never wider than the number you gave it.
   ============================================================ */
```

```css
/* PART 4 - Smooth scrolling is nice, but only when the visitor did
   not ask for less motion. */
```

```css
/* PART 4 - A skip link stays hidden until you press Tab, the key
   that moves from link to link. It lets a keyboard user jump
   straight to the gallery without tabbing through the menu. */
```

```css
/* ============================================================
   PART 4.4 - ANIMATION (the moving Night background)
   ------------------------------------------------------------
   The layer is 150% as wide as the screen. @keyframes is a set of
   steps for an animation; here it slides the image left and back
   forever (alternate). A pseudo-element (::before) is a fake
   extra box that CSS can draw. We use it instead of
   background-attachment: fixed because it also works on phones.
   z-index: -1 puts it behind the page content. A bigger z-index
   sits closer to the viewer.
   ============================================================ */
```

```css
/* PART 4 - This hides text on screen but keeps it for screen
   readers. We use it for labels that would look repetitive. */
```

```css
/* PART 4 - The outline shows keyboard users which control is
   selected. It appears only when the visitor uses Tab, not when
   they click with a mouse. */
```

```css
/* ============================================================
   PART 4.5 - THE SCROLL PROGRESS BAR
   ------------------------------------------------------------
   This rule gives the bar its shape and a grey background.
   The small <style> block in index.html uses an ID selector,
   which is stronger, so its blue-to-yellow colour wins.
   JavaScript only changes the width.
   ============================================================ */
```

```css
/* ============================================================
   PART 4.6 - FLEXBOX (the top bar)
   ------------------------------------------------------------
   display: flex puts children in one row. That is called Flexbox.
   justify-content: space-between pushes the logo left and the
   theme button right. align-items: center lines them up.
   flex-wrap: wrap lets them move to a new line on a small screen.
   ============================================================ */
```

```css
/* PART 4.2b - THEME BUTTON (icon only)
   ------------------------------------------------------------
   One round button in the navbar. It holds a picture, not text,
   so screen readers still get the label from aria-label. A screen
   reader is software that reads the page out loud.
   The icon shows the mode you will switch TO. */
```

```css
/* ============================================================
   PART 4.7 - SHARED BUTTONS (one class, many buttons)
   ------------------------------------------------------------
   .btn is the base style. .btn-primary and .btn-ghost only change
   the colours. Reusing a class keeps every button consistent.
   border-radius: 999px makes a pill shape.
   transition + :hover make the small lift animation.
   ============================================================ */
```

```css
/* PART 4.7 - A disabled button looks faded and cannot be clicked.
   The report pop-up uses this until a reason is picked. */
```

```css
/* ============================================================
   PART 4.8 - CSS GRID (the card wall)
   ------------------------------------------------------------
   display: grid makes rows and columns. That is called CSS Grid.
   repeat(auto-fit, minmax(220px, 300px)) means:
     "make as many columns as fit; each one is between 220px
      and 300px wide." It is responsive without extra code.
      "Responsive" means it adapts to the screen size.
   gap is the space between cards. justify-content: center keeps
   one card in the middle instead of stuck on the left.

   CLASS NAMES (so you know what is what):
   .card-tile    = the WHOLE card
   .tile-cover   = the square picture at the top
   .tile-info    = the title + heart row
   .tile-text h3 = just the title inside the card
   ============================================================ */
```

```css
/* ============================================================
   VIDEO PART 4.9 - THE FULL-SCREEN VIEWER
   ------------------------------------------------------------
   The viewer covers the screen. It has two parts:
   LEFT  = the artwork, fitted inside its side with a scroll bar.
   RIGHT = a dark panel with the title, artist, links and buttons.
   The X button sits on the left, over the artwork.
   "Fitted" comes from object-fit: contain, which shows the whole
   picture and never crops it. The scroll bar moves sideways
   through the works. scroll-snap makes each work stop neatly at
   the edge instead of halfway.
   On a phone the dark panel moves to the bottom.
   ============================================================ */
```

```css
/* PART 4.9 - The art fits inside its side, so the transparent blur
   shows around it. object-fit: contain means "show the whole
   picture, never crop it". */
```

```css
/* PART 4.9 - The dark panel on the right. */
```

```css
/* PART 4.9 - On a phone the dark panel moves to the bottom. */
```

```css
/* PART 4 - If the visitor asked their device to use less motion,
   stop animations and smooth changes. This is a comfort setting
   some people turn on in their system settings. */
```

## PART 5 - JavaScript interactions (3:45-5:00)

> Show variables, functions, conditions, loops, validation, and at least one working interaction. Explain how the interaction works.

### public/dom-demo.js

```js
// ============================================================
// VIDEO PART 5 - PLAIN JAVASCRIPT (no React)
// ------------------------------------------------------------
// This file talks to the page directly using the DOM:
//   1. document.getElementById()  -> find an element
//   2. addEventListener()         -> react when the user scrolls
//   3. element.style.width        -> change the page by hand
//
// React areas (inside #root) never do this. They change state and
// React updates the screen. This bar sits OUTSIDE #root, so React
// does not manage it and it is safe to update it manually.
//
// This is the difference the video asks you to explain:
// plain JavaScript = imperative (you do every step),
// React = declarative (you describe the result).
// ============================================================
```

```js
// PART 5 - FUNCTION DECLARATION
```

```js
// PART 5 - ARROW FUNCTION
```

### src/utils/links.js

```js
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
```

```js
// PART 5 - FUNCTION: add "https://" if the visitor typed just
// "instagram.com/name". `trim()` removes spaces at the ends. The
// test asks: "does it already start with http:// or https://?"
// The `i` means ignore upper or lower case.
```

```js
// PART 5 - TRY / CATCH: new URL() throws an error when the text
// is not a real web address. `catch` keeps the page from crashing.
// Returns true when the text is a usable web address.
```

```js
// PART 5 - ARRAY METHODS: map changes every item; filter keeps
// only the items that pass a test. Here we remove empty links and
// duplicates.
```

```js
// PART 5 - LOOP: "https://www.instagram.com/keiffer" -> "Instagram".
// The loop goes over each pair in the object. An unknown site
// shows its address instead.
```

### src/utils/validation.js

```js
// ============================================================
// VIDEO PART 5 - VALIDATION = checking user input before using it.
// VIDEO PART 7 - TESTING: try an empty title, a short title,
// a bad link, a 6 MB picture, and 6 links.
// ============================================================
//
// Used by PostArtwork AND EditCardPopup, so the rules live in one
// place instead of being copied into two forms.
//
// It returns an object of error messages. An "object" is a box of
// named values, like { title: "a message" }. An empty object {}
// means everything is valid. The first social link is required.
```

```js
  // PART 5 - IF: each rule asks a question. If the answer is
  // "yes, something is wrong", add one message to the errors box.
```

```js
  // PART 5 - LOOP: go over every link. The first one is required,
  // the others are optional but must be valid if filled in.
  // `forEach` runs the same steps once per item.
```

### src/App.jsx

```jsx
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
```

```jsx
    // PART 5 - Put the open card in the address bar, so the link
    // can be copied and shared. `replaceState` changes the address
    // without reloading the page.
```

```jsx
    // PART 5 - Change the colour the phone uses for its browser bar,
    // so it matches the dark or light theme.
```

```jsx
  /* ==========================================================
     VIDEO PART 5 - EVENT HANDLERS
     ----------------------------------------------------------
     These functions run when the visitor clicks something.
     `toggleTheme` flips light and dark. `toggleHeart` uses `.map()`
     to go over every card and change only the one that was
     clicked. `addCard` uses the spread operator `...` to put the
     new card at the front of the list.
     ========================================================== */
```

```jsx
    // PART 5 - `reduce` looks at every card and keeps the biggest
    // id. Add 1 so the new card gets a fresh id.
```

```jsx
    // PART 5 - After posting, scroll back to the gallery.
    // setTimeout waits a moment so React can draw the new card first.
```

```jsx
    // PART 5 - Keep only cards that were not reported, then pick
    // one random card from that list.
```

```jsx
  /* ==========================================================
     VIDEO PART 5 - DERIVED DATA
     ----------------------------------------------------------
     These values are calculated from state every time the page
     re-draws. `.filter()` keeps only the cards that match the
     category and the search text. `.sort()` puts the visitor's
     own card first. `.find()` picks one card by its id.
     ========================================================== */
```

### src/components/ArtworkDetails.jsx

```jsx
// ============================================================
// VIDEO PART 5 - JAVASCRIPT: effects, keyboard, and a timer.
// VIDEO PART 6 - REACT: useState remembers what is on screen.
// VIDEO PART 8 - WALKTHROUGH: open a card and show this screen.
// ============================================================
//
// ArtworkDetails = one card, full screen, like a TikTok post.
// "Details" means the close-up view: the artwork plus the title,
// artist, links, and buttons.
//
// PROPS are the values App gives this component: the card to show,
// plus the functions for a heart, a report, an edit, and closing.
//
// PART 6 - THREE PIECES OF MEMORY (state):
//   index  = which work is showing
//   zoom   = is the zoom picture open?
//   copied = show the "Copied!" text for a moment?
//
// PART 5 - useRef points at the sliding area so we can scroll it.
// A "ref" is a handle to a real element on the page.
```

```jsx
  // PART 5 - Stop the page behind this full-screen view from
  // scrolling. `overflow = 'hidden'` locks the page. The return
  // runs when the view closes, so scrolling works again.
```

```jsx
  // PART 5 - Mouse wheel: up/down moves one work at a time.
  // "Wheel" means the scroll wheel on a mouse.
  // `preventDefault` stops the page itself from scrolling too.
  // The short pause stops one fast flick from skipping works.
```

```jsx
  // PART 5 - Keyboard: Escape closes, left and right change work.
  // `addEventListener` waits for a key press. The return removes
  // the listener so it does not keep running after the view closes.
```

```jsx
    // PART 5 - Move to a work. Math keeps the number inside the list.
```

```jsx
  // PART 5 - When the visitor swipes or drags the art, update the
  // memory to match. `scrollLeft` is how far the strip has moved.
```

```jsx
  // PART 5 - Copy this card's link, then show "Copied!" for 2 seconds.
  // The clipboard is the invisible place where "copy" puts text.
  // `.catch` stops an error from breaking the page if copying is
  // blocked by the browser.
```

### src/components/PostArtwork.jsx

```jsx
// ============================================================
// VIDEO PART 5 - JAVASCRIPT: loops, conditions, validation.
// VIDEO PART 6 - REACT: useState keeps the form values.
// VIDEO PART 7 - TESTING: try an empty title, a bad link, a big file.
// ============================================================
//
// PostArtwork = lets an artist post their ONE card with 1 to 5 works.
// Social links are required.
//
// PROPS: categories, onAddCard
//
// `categories` is the list of styles for the dropdown.
// `onAddCard` is the function App uses to add the new card.
//
// "Validation" means checking the visitor's input before using it.
// "State" is information the form remembers while the page is open:
// `values` holds the text fields, `links` holds the social links,
// `works` holds the chosen files, and `errors` holds the messages
// shown under the fields.
//
// PART 5 - `validateCardFields` checks the text and links.
// `checkFile` checks each picture or video. The helper
// `SocialLinksFields` is shared with EditCardPopup.
```

```jsx
// PART 5 - CHECKFILE: returns a message if the file is the wrong
// type or too big, or an empty string if it is fine.
```

```jsx
  // PART 5 - works (pictures / videos)
  // PART 5 - LOOP: go over every chosen file and keep the good ones.
  // A loop repeats the same steps for each item in a list.
```

```jsx
          // PART 5 - createObjectURL makes a temporary link to the
          // file inside this browser. Nothing is uploaded anywhere.
```

```jsx
  // PART 5 - CONDITION: stop if there is an error.
  // A condition is just an if question: is this true or false?
```

```jsx
          {/* PART 5 - `preload="metadata"` loads only the video's
              basic details (its length and a first frame), not the
              whole file. "Metadata" means data about the file. */}
```

### src/components/EditCardPopup.jsx

```jsx
  // PART 5 - Keyboard: Escape means cancel.
  // While the delete confirmation is open, that pop-up handles Escape instead.
  // `true` at the end is called the capture phase. It lets this
  // listener hear the key before the page behind it does.
```

```jsx
  // PART 5 - Ask the shared validation rules first. If there are
  // errors, show them and stop. If there are none, save the card.
```

```jsx
  // PART 5 - Keyboard: Escape means the same as choosing "cancel".
  // The listener uses the "capture" phase and stops the event, so when
  // this pop-up sits on top of the big picture view, Escape closes ONLY
  // this pop-up.
```

### src/components/ReportArtwork.jsx

```jsx
// ============================================================
// VIDEO PART 5 - JAVASCRIPT: the list above holds the choices.
// VIDEO PART 6 - REACT: useState remembers the chosen reason.
// VIDEO PART 8 - WALKTHROUGH: click Report on a card.
// ============================================================
//
// ReportArtwork = asks WHY a card is being reported.
//
// PROPS: title (the card name), onSubmit(reason), onCancel
//
// PART 5 - RADIO BUTTONS are a multiple-choice question. The
// visitor can pick only one answer. "Disabled" means the button
// is greyed out and cannot be clicked until a reason is chosen.
// `preventDefault` stops the browser from reloading the page when
// a form is sent.
```

```jsx
  // PART 5 - Send the chosen reason back to App.
```

## PART 6 - React implementation (5:00-6:15)

> Show functional components, JSX, props, and useState. Demonstrate a state change and explain React's declarative update approach.

### src/App.jsx

```jsx
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
```

```jsx
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
```

### src/components/Navbar.jsx

```jsx
// PART 6 - These two small pictures are the theme icons. `import`
// brings each file in so we can use it like a value.
```

```jsx
      {/* PART 6 - STATE: clicking this button changes App's theme
          state, and React re-draws the page with the new colours.
          The icon shows the mode you will switch TO: a sun means
          "go light", a moon means "go dark".
          aria-label is the name a screen reader reads out loud,
          because this button has a picture but no visible text. */}
```

### src/components/ArtworkCard.jsx

```jsx
/* PART 6 - WORKMEDIA HELPER
   ------------------------------------------------------------
   This small helper shows ONE work as an <img> or a <video>.
   ArtworkDetails imports it too, so the "picture or video?"
   choice lives in one place instead of being repeated in two
   files.

   PART 5 - A FEW VIDEO SETTINGS, IN PLAIN WORDS:
   `preload="metadata"` tells the browser to load only the small
   information about the video (its length and a first frame),
   not the whole file. That keeps the page light until the visitor
   presses play. "Metadata" just means data about the file.
   `muted` starts the video with no sound.
   `playsInline` keeps the video inside the page on a phone,
   instead of opening a full-screen player.
   `alt` is the text a screen reader reads out loud when the
   picture cannot be seen. */
```

### src/components/ArtworkDetails.jsx

```jsx
      {/* PART 6 - The zoom layer only draws when zoom is true. */}
```

```jsx
/* VIDEO PART 6 - FOLLOWLINKS HELPER
   ------------------------------------------------------------
   One "Follow" button per social link. getPlatformName turns a
   long address into a short name like "YouTube" or "TikTok". */
```

### src/components/PostArtwork.jsx

```jsx
  // PART 6 - STATE: every value the form needs to remember.
```

```jsx
/* PART 6 - SOCIAL LINKS FIELD HELPER
   ------------------------------------------------------------
   This is the "add up to 5 social media links" part of the form.
   EditCardPopup imports it too, so the markup lives in one place
   instead of being copied into two forms. */
```

### src/components/EditCardPopup.jsx

```jsx
// ============================================================
// VIDEO PART 6 - REACT: useState starts from the card's current text.
// VIDEO PART 5 - JAVASCRIPT: validation runs before saving.
// ============================================================
//
// EditCardPopup = pop-up to change the text and links of your own card.
// (Works are not changed here.) Changes last only until the page
// refreshes.
//
// A pop-up is a small box that sits on top of the page. A
// "controlled input" means the value on screen comes from React
// state, so React always knows what is typed.
//
// PROPS: card, categories, onSave(changes), onDelete, onCancel
```

```jsx
/* VIDEO PART 6 - CONFIRMPOPUP HELPER
   ------------------------------------------------------------
   A small yes/no pop-up, used here for "delete this card?".
   It is kept in this file because EditCardPopup is the only
   place that needs it.

   PROPS: title, message, confirmLabel, cancelLabel, onConfirm,
   onCancel */
```

### src/components/ReportArtwork.jsx

```jsx
        {/* PART 6 - Clicking a choice saves it in `reason`. */}
```

## PART 7 - Testing and problem-solving (6:15-7:15)

> Test the site at different widths. Show at least one issue encountered, how you investigated it, and the solution or improvement.

### src/App.css

```css
/* ============================================================
   VIDEO PART 7 - TESTING AND PROBLEM-SOLVING
   ------------------------------------------------------------
   TESTING means using the site like a real visitor and looking
   for problems. A "device toolbar" is a button in DevTools that
   pretends the screen is a phone.

   STEP 1 - SEE THE PROBLEM
   Open the site, press F12, turn on the device toolbar, and pick
   375px (a phone). The phone layout is ugly: the menu is a tall
   stack, the About section and the form are two narrow columns,
   and the page scrolls sideways.

   STEP 2 TO 7 - FIX ONE PROBLEM AT A TIME
   Each rule below says what is wrong and what to change. Change
   the value, save, and look at the phone again.
   ============================================================ */
```

```css
  /* STEP 2 - THE PAGE SCROLLS SIDEWAYS.
     Something is wider than the screen. overflow-x controls what
     happens when content is too wide. clip hides the extra width,
     so the page cannot move left and right.
     Change visible to clip. */
```

```css
  /* STEP 3 - THE MENU IS A TALL STACK.
     flex-direction: row puts the logo, links and theme button in
     one line. A small gap and small padding keep the bar short.
     Change column to row, 1.2rem to 0.5rem, and 2.5rem 1rem to
     0.5rem 1rem. */
```

```css
  /* STEP 7 - THE ABOUT SECTION AND THE FORM ARE STILL TWO COLUMNS.
     grid-template-columns: 1fr 1fr makes two equal columns.
     One column (1fr) is easier to read on a phone.
     Change 1fr 1fr to 1fr. */
```

## PART 8 - Final website walkthrough (7:15-8:45)

> Demonstrate the completed site in the browser. Test navigation, images, interactions, and form feedback rather than only describing them.

### src/App.jsx

```jsx
  /* ==========================================================
     VIDEO PART 8 - FINAL WEBSITE WALKTHROUGH
     ----------------------------------------------------------
     This is the `return` explained in Part 3. Everything inside it
     is what the visitor sees. Read it from top to bottom:
     Navbar -> Hero -> Gallery -> Post artwork -> About ->
     Footer. Then show the pop-ups at the bottom: ArtworkDetails,
     the edit pop-up, and the report pop-up.
     ========================================================== */
```

### index.html

```html
    <!--
      ============================================================
      VIDEO PART 8 - FINAL WEBSITE WALKTHROUGH
      ------------------------------------------------------------
      This is the empty box from Part 3. When you open the site,
      React puts everything inside it: the top bar, the welcome
      area, the gallery, the post form, the About section, the
      footer, and the pop-ups.

      Show this in the browser, then press F12. That opens DevTools,
      the browser's built-in inspector. Point at #root and say:
      "Everything I built is inside this one box."
      ============================================================
    -->
```

## PART 9 - Reflection and closing (8:45-10:00)

> Return to face-camera. Share what you learned, the most challenging part, what you would improve next, and close the video.

### index.html

```html
    <!--
      ============================================================
      VIDEO PART 9 - REFLECTION AND CLOSING
      ------------------------------------------------------------
      Go back to your face camera here. Do not read this word for
      word. Use these prompts and say it in your own voice.

      1. WHAT I LEARNED
         "I learned how React breaks a page into small components,
         how state makes the page update, and how CSS Grid and
         Flexbox make the layout fit different screens."

      2. THE HARDEST PART
         Pick one real example. For example:
         "The hardest part was the art viewer. I had to make the
         artwork scroll sideways, keep the mouse wheel and keyboard
         in sync, and still let Escape close the zoom first."

      3. WHAT I AM PROUD OF
         Pick one real example. For example:
         "I am proud that the gallery works on a phone, that every
         artist gets the same one card, and that the form checks
         mistakes before posting."

      4. WHAT I WOULD IMPROVE NEXT
         "Next time I would add a real database and accounts, so
         cards and hearts survive a refresh."

      5. CLOSE
         "Thank you for watching. This is CDArt Gallery."

      REMEMBER: the rubric says do not read a script. These are
      notes, not lines. Sound natural and point at the code.
      ============================================================
    -->
```
