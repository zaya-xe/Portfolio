import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from "./App";

// HashRouter rather than BrowserRouter: the site is hosted on GitHub Pages,
// which has no server-side fallback, so deep links / refreshes on a
// client-side route would 404 without the hash.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
