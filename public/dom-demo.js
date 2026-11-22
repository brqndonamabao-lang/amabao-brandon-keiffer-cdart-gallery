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

const progressBar = document.getElementById('scroll-progress');

// PART 5 - FUNCTION DECLARATION
function getScrollPercent() {
  const scrolled = document.documentElement.scrollTop;
  const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return total > 0 ? (scrolled / total) * 100 : 0;
}

// PART 5 - ARROW FUNCTION
const updateProgressBar = () => {
  progressBar.style.width = getScrollPercent() + '%';
};

window.addEventListener('scroll', updateProgressBar);
updateProgressBar();
