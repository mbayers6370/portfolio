import { Link } from 'react-router-dom'
import artworks from '../data/artworks'

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
        </div>
      </div>

      {/* ── Statement ── */}
      <div className="container">
        <div className="art-statement">
          <p>
            I’m drawn to structure and negative space. I constantly
            ask myself, “What is necessary here? What can be removed?” I find that tension
            between presence and absence to be the most interesting place to work, 
            whether I’m writing, designing, or coding. The discipline of that process is something I enjoy in itself.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="art-grid">
          {artworks.map((p, i) => (
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
          <Link to="/" className="books-back">← Back to portfolio</Link>
        </div>
      </div>

    </div>
  )
}
