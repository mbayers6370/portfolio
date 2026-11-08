import headshot from '../assets/headshot-cutout.png'
import { heroContent } from '../content/hero'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-photo">
          <img src={headshot} alt={heroContent.alt} decoding="async" />
        </div>
        <div className="hero-copy">
          <h1>
            <span>{heroContent.firstName}</span>
            <span>{heroContent.lastName}</span>
          </h1>
          <p>{heroContent.tagline}</p>
          <a className="hero-work-link" href="#work">
            {heroContent.workLabel} <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
