import headshot from '../assets/headshot.jpg'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">

        {/* Photo floats right, screen blend knocks out black background */}
        <div className="hero-photo">
          <img src={headshot} alt="Matthew Bayers" />
        </div>

        <div className="hero-name">
          <span className="hero-name-first">Matthew</span>
          <span className="hero-name-divider" aria-hidden="true" />
          <span className="hero-name-last">Bayers.</span>
        </div>

        <p className="hero-tagline">
          Full-Stack Developer
        </p>

        <div className="hero-meta">
          matthewbayers.com&nbsp;//&nbsp;2025
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>

      </div>
    </section>
  )
}
