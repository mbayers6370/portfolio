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
      </div>
    </section>
  )
}
