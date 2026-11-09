import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import App from './App'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root was not found')
}

// The build supplies readable HTML for crawlers and visitors without JS.
// Mount the interactive app fresh: the desktop intro depends on the viewport
// and intentionally differs from the fully expanded static page.
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
