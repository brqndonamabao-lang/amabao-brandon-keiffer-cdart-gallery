// NON-REACT DOM MANIPULATION DEMO
// ------------------------------------------------------------
// This file is plain JavaScript. It talks to the page directly using the DOM:
//   1. document.getElementById()  -> find an element
//   2. addEventListener()         -> react to the user scrolling
//   3. element.style.width        -> change the page by hand
//
// React areas (inside #root) never do this - they change state and React
// updates the screen (declarative). This bar sits OUTSIDE #root, so React
// does not manage it and it is safe to update it manually.

const progressBar = document.getElementById('scroll-progress');

// Function declaration
function getScrollPercent() {
  const scrolled = document.documentElement.scrollTop;
  const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return total > 0 ? (scrolled / total) * 100 : 0;
}

// Arrow function
const updateProgressBar = () => {
  progressBar.style.width = getScrollPercent() + '%';
};

window.addEventListener('scroll', updateProgressBar);
updateProgressBar();
