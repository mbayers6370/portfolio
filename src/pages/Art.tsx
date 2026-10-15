import '../styles/art.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { artPageContent } from '../content/art'
import artworks from '../content/artworks'

export default function Art() {
  const [expandedArtwork, setExpandedArtwork] = useState<(typeof artworks)[number] | null>(null)

  useEffect(() => {
    if (!expandedArtwork) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedArtwork(null)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [expandedArtwork])

  const renderArtwork = (artwork: (typeof artworks)[number]) => (
    <div className="art-tile" key={artwork.title}>
      <button className="art-tile-img" type="button" onClick={() => setExpandedArtwork(artwork)} aria-label={`Expand ${artwork.title}`}>
        <img src={artwork.src} alt={artwork.title} style={artwork.pos ? { objectPosition: artwork.pos } : undefined} />
      </button>
      <div className="art-tile-meta">
        <span className="art-tile-title">{artwork.title}</span>
        <span className="art-tile-medium">{artwork.medium}</span>
      </div>
    </div>
  )

  return (
    <div className="page-art">
      <header className="art-header">
        <div className="container art-header-inner">
          <div>
            <span className="art-header-label">{artPageContent.pageLabel}</span>
            <h1 className="art-header-title">
            {artPageContent.title[0]}
            <br />
              {artPageContent.title[1]}
            </h1>
          </div>
          <p>{artPageContent.tagline}</p>
        </div>
      </header>

      <main className="container art-gallery">
        <div className="art-grid art-grid--pair">
          {artworks.slice(0, 2).map(renderArtwork)}
        </div>

        <div className="art-interlude">
          <h2>{artPageContent.interlude}</h2>
          <p>{artPageContent.interludeLabel}</p>
        </div>

        <div className="art-grid art-grid--pair">
          {artworks.slice(2).map(renderArtwork)}
        </div>

        <div className="art-enquire">
          <Link to="/" className="books-back">{artPageContent.backLabel}</Link>
        </div>
      </main>
      {expandedArtwork && <div className="art-modal" role="presentation" onMouseDown={() => setExpandedArtwork(null)}><div className="art-modal-content" role="dialog" aria-modal="true" aria-label={expandedArtwork.title} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="art-modal-close" onClick={() => setExpandedArtwork(null)} aria-label="Close artwork preview">×</button><img src={expandedArtwork.src} alt={expandedArtwork.title} /><p>{expandedArtwork.title}</p></div></div>}
    </div>
  )
}
