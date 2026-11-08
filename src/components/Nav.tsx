import "../styles/nav.css";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { navContent } from "../content/nav";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";
  const isProjectPage = pathname.startsWith("/work/");
  const isSchedulerCaseStudy = pathname === "/work/cs499-eportfolio";
  const isNelaRideCaseStudy = pathname === "/work/nelaride";
  const isArtPage = pathname === "/art";
  const isBooksPage = pathname === "/books";
  const isDesignPage = pathname === "/design";

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let direction = 0;
    let distance = 0;
    let frame = 0;
    setHidden(false);
    setScrolled(previousY > 20);

    const update = () => {
      frame = 0;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const currentY = Math.max(0, Math.min(window.scrollY, maxScroll));
      const delta = currentY - previousY;
      previousY = currentY;
      setScrolled(currentY > 20);

      const nextDirection = Math.sign(delta);
      if (nextDirection !== direction) distance = 0;
      direction = nextDirection;
      distance += Math.abs(delta);

      if (currentY <= 80 || menuOpen || navRef.current?.querySelector(":focus-visible")) {
        setHidden(false);
      } else if (distance >= 10 && direction !== 0) {
        setHidden(direction > 0);
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname, hash, menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
      setHidden(false);
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  const close = () => setMenuOpen(false);
  const homeHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        onFocusCapture={(event) => {
          if (event.target.matches(":focus-visible")) setHidden(false);
        }}
        className={`nav${hidden ? " nav--hidden" : ""}${scrolled ? " nav--scrolled" : ""}${
          isSchedulerCaseStudy ? " nav--scheduler" : ""
        }${isArtPage ? " nav--art" : ""}${isBooksPage ? " nav--books" : ""}${
          isHome ? " nav--home" : ""
        }${isProjectPage ? " nav--project" : ""}${isNelaRideCaseStudy ? " nav--nelaride" : ""}${isDesignPage ? " nav--design" : ""}`}
      >
        <Link to="/" className="nav-logo">
          {navContent.logo}
        </Link>
        {isHome && <span className="nav-home-label">Portfolio / 2026</span>}
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={close} aria-current={isHome ? "page" : isProjectPage ? "location" : undefined}>
              {navContent.links.home}
            </Link>
          </li>
          <li>
            <Link to="/design" onClick={close} aria-current={isDesignPage ? "page" : undefined}>
              {navContent.links.design}
            </Link>
          </li>
          <li>
            <Link to="/art" onClick={close} className="nav-link--secondary" aria-current={isArtPage ? "page" : undefined}>
              {navContent.links.art}
            </Link>
          </li>
          <li>
            <Link to="/books" onClick={close} className="nav-link--secondary" aria-current={isBooksPage ? "page" : undefined}>
              {navContent.links.books}
            </Link>
          </li>
        </ul>
        <div className="nav-socials" aria-label="Social links">
          <a href="https://github.com/mbayers6370" target="_blank" rel="noopener noreferrer" className="nav-linkedin" aria-label={navContent.socialLabels.github}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/matthew-bayers" target="_blank" rel="noopener noreferrer" className="nav-linkedin" aria-label={navContent.socialLabels.linkedIn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
        <button
          className={`nav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={navContent.toggleLabel}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`nav-mobile${menuOpen ? " open" : ""}${
          isSchedulerCaseStudy ? " nav-mobile--scheduler" : ""
        }${isArtPage ? " nav-mobile--art" : ""}${isBooksPage ? " nav-mobile--books" : ""}${
          isHome ? " nav-mobile--home" : ""
        }${isProjectPage ? " nav-mobile--project" : ""}${isNelaRideCaseStudy ? " nav-mobile--nelaride" : ""}${isDesignPage ? " nav-mobile--design" : ""}`}
      >
        <a href={homeHref("#work")} onClick={close} aria-current={isHome && hash !== "#about" && hash !== "#contact" ? "page" : isProjectPage ? "location" : undefined}>
          {navContent.links.work}
        </a>
        <Link to="/design" onClick={close} aria-current={isDesignPage ? "page" : undefined}>
          {navContent.links.design}
        </Link>
        <a href={homeHref("#about")} onClick={close} aria-current={isHome && hash === "#about" ? "location" : undefined}>
          {navContent.links.about}
        </a>
        <a href={homeHref("#contact")} onClick={close} aria-current={isHome && hash === "#contact" ? "location" : undefined}>
          {navContent.links.contact}
        </a>
        <Link to="/art" onClick={close} aria-current={isArtPage ? "page" : undefined}>
          {navContent.links.art}
        </Link>
        <Link to="/books" onClick={close} aria-current={isBooksPage ? "page" : undefined}>
          {navContent.links.books}
        </Link>
        <div className="nav-mobile-socials" aria-label="Social links">
          <a
            href="https://github.com/mbayers6370"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            aria-label={navContent.socialLabels.github}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/matthew-bayers"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            aria-label={navContent.socialLabels.linkedIn}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
