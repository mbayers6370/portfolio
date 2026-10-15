import headshot from '../assets/headshot-cutout.png'
import { heroContent } from '../content/hero'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-photo">
          <img src={headshot} alt={heroContent.alt} />
        </div>
      </div>
    </section>
  )
}
