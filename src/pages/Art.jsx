import { Link } from 'react-router-dom'
import rose from '../assets/Rose_BW.jpeg'
import lemons from '../assets/Lemons.jpeg'
import bathtub from '../assets/Bathtub_Benjamin.jpeg'
import copperFlowers from '../assets/Copper_Flowers.jpeg'

const paintings = [
  { src: lemons,        title: 'Lemons',           medium: 'Oil on canvas' },
  { src: copperFlowers, title: 'Copper Flowers',   medium: 'Oil on canvas' },
  { src: bathtub,       title: 'Bathtub Benjamin', medium: 'Oil on canvas' },
  { src: rose,          title: 'Rose',             medium: 'Acrylic on canvas', pos: '65% center' },
]

export default function Art() {
  return (
    <div className="page-art">

      {/* ── Hero header ── */}
      <div className="page-header">
        <div className="container">
          <span className="page-header-label">Visual Practice</span>
          <h1 className="page-header-title">
            Oil &amp; Acrylic<br /><em>Paintings.</em>
          </h1>
          <p className="page-header-sub">
            Works on canvas — available on request.
          </p>
        </div>
      </div>

      {/* ── Statement ── */}
      <div className="container">
        <div className="art-statement">
          <p>
            The same instinct that drives the code drives the paint — an obsession
            with structure, negative space, and what happens when you strip everything
            back to what matters. The canvas is where the logic ends and something
            else takes over.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="art-grid">
          {paintings.map((p, i) => (
            <div className="art-tile" key={i}>
              <div className="art-tile-img">
                <img src={p.src} alt={p.title} style={p.pos ? { objectPosition: p.pos } : undefined} />
              </div>
              <div className="art-tile-meta">
                <span className="art-tile-title">{p.title}</span>
                <span className="art-tile-medium">{p.medium}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Enquire ── */}
        <div className="art-enquire">
          <p>Interested in a piece or a commission?</p>
          <a href="mailto:matthew.bayers@gmail.com" className="art-enquire-link">
            matthew.bayers@gmail.com →
          </a>
          <Link to="/" className="books-back">← Back to portfolio</Link>
        </div>
      </div>

    </div>
  )
}
