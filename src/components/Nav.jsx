import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const close = () => setMenuOpen(false)
  const homeHref = (hash) => isHome ? hash : `/${hash}`

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <Link to="/" className="nav-logo">MB.</Link>
        <ul className="nav-links">
          <li><a href={homeHref('#work')} onClick={close}>Work</a></li>
          <li><a href={homeHref('#about')} onClick={close}>About</a></li>
          <li><Link to="/books" onClick={close}>Books</Link></li>
          <li><Link to="/art" onClick={close}>Art</Link></li>
          <li><a href={homeHref('#contact')} onClick={close}>Contact</a></li>
          <li>
            <a href="https://github.com/mbayers6370" target="_blank" rel="noopener noreferrer" className="nav-linkedin" aria-label="GitHub">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/matthew-bayers" target="_blank" rel="noopener noreferrer" className="nav-linkedin" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </li>
        </ul>
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        <a href={homeHref('#work')} onClick={close}>Work</a>
        <a href={homeHref('#about')} onClick={close}>About</a>
        <Link to="/books" onClick={close}>Books</Link>
        <Link to="/art" onClick={close}>Art</Link>
        <a href={homeHref('#contact')} onClick={close}>Contact</a>
        <a href="https://www.linkedin.com/in/matthew-bayers" target="_blank" rel="noopener noreferrer" onClick={close}>
          LinkedIn ↗
        </a>
      </div>
    </>
  )
}
