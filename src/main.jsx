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
