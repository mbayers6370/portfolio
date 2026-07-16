import '../styles/art.css'
import { Link } from 'react-router-dom'
import { artPageContent } from '../content/art'
import artworks from '../content/artworks'

export default function Art() {
  return (
    <div className="page-art">
      <div className="page-header">
        <div className="container">
          <span className="page-header-label">{artPageContent.pageLabel}</span>
          <h1 className="page-header-title">
            {artPageContent.title[0]}
            <br />
            <em>{artPageContent.title[1]}</em>
          </h1>
        </div>
      </div>

      <div className="container">
        <div className="art-statement">
          <p>{artPageContent.statement}</p>
        </div>

        <div className="art-grid">
          {artworks.map((p) => (
            <div className="art-tile" key={p.title}>
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

        <div className="art-enquire">
          <Link to="/" className="books-back">{artPageContent.backLabel}</Link>
        </div>
      </div>
    </div>
  )
}
