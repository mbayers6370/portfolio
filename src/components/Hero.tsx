import headshot from '../assets/headshot.jpg'
import { heroContent } from '../content/hero'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-photo">
          <img src={headshot} alt={heroContent.alt} />
        </div>

        <div className="hero-name">
          <span className="hero-name-first">{heroContent.firstName}</span>
          <span className="hero-name-divider" aria-hidden="true" />
          <span className="hero-name-last">{heroContent.lastName}</span>
        </div>

        <p className="hero-tagline">{heroContent.tagline}</p>

        <div className="hero-meta">{heroContent.meta}</div>

        <div className="hero-scroll">
          <span>{heroContent.scrollLabel}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
