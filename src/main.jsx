// ============================================================
// VIDEO PART 3 - DEVELOPMENT SETUP AND STRUCTURE
// TOPIC 2 OF 4: src/main.jsx (the starting point of React)
// ------------------------------------------------------------
// This file is short, but it is the bridge between index.html
// and React. It answers one question: "Where does React start?"
//
// The line `import { createRoot } from 'react-dom/client'` brings
// in a function called createRoot. That function knows how to
// take over an empty HTML element and let React draw inside it.
//
// The line `document.getElementById('root')` looks in index.html
// for the element with id="root". That is the empty box we saw
// in the previous topic. If that box is missing, React has
// nowhere to draw, so this step is important.
//
// `createRoot(...)` turns that empty box into a React root. Then
// `.render(<App />)` tells React: "draw the App component inside
// this box." App is the main component, and it contains the whole
// page. Everything grows from there.
//
// <StrictMode> is a development helper. It does not show anything
// on the screen. It warns us about possible problems while we
// build the site, and it helps us catch mistakes early.
//
// So the story is: index.html gives us the empty box, main.jsx
// finds it, and React starts drawing <App /> inside it. The next
// topic is src/App.jsx, which is the file that describes what
// that <App /> should actually show.
// ============================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'

// PART 3 - Find the #root box and tell React to draw <App /> inside it.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
