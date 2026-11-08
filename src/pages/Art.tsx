import '../styles/art.css'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, X } from 'lucide-react'
import { artPageContent } from '../content/art'
import artworks from '../content/artworks'
import PageHero from '../components/PageHero'

export default function Art() {
  const [expandedArtwork, setExpandedArtwork] = useState<(typeof artworks)[number] | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (expandedArtwork && !dialog.open) dialog.showModal()
    else if (!expandedArtwork && dialog.open) dialog.close()
  }, [expandedArtwork])

  const renderArtwork = (artwork: (typeof artworks)[number]) => (
    <figure className="art-tile" key={artwork.title}>
      <button className="art-tile-img" type="button" onClick={() => setExpandedArtwork(artwork)} aria-label={`Expand ${artwork.title}`} aria-haspopup="dialog">
        <img src={artwork.src} alt={artwork.title} loading="lazy" />
      </button>
      <figcaption className="art-tile-meta">
        <span className="art-tile-title">{artwork.title}</span>
        <span className="art-tile-medium">{artwork.medium}</span>
      </figcaption>
    </figure>
  )

  return (
    <div className="page-art">
      <PageHero title={artPageContent.title} description={artPageContent.tagline} />

      <div className="art-gallery">
        <section className="art-works art-works--dark">
          <div className="container art-grid art-grid--pair">
            {artworks.slice(0, 2).map(renderArtwork)}
          </div>
        </section>

        <section className="art-interlude-section">
          <div className="container art-interlude">
            <h2>{artPageContent.interlude}</h2>
            <p>{artPageContent.interludeLabel}</p>
          </div>
        </section>

        <section className="art-works art-works--cream">
          <div className="container art-grid art-grid--pair">
            {artworks.slice(2).map(renderArtwork)}
          </div>
        </section>

        <section className="art-enquire">
          <div className="container">
            <Link to="/" className="books-back"><ChevronLeft className="link-chevron" aria-hidden="true" />{artPageContent.backLabel}</Link>
          </div>
        </section>
      </div>
      <dialog ref={dialogRef} className="art-modal" aria-labelledby="art-modal-title" onCancel={() => setExpandedArtwork(null)} onClose={() => setExpandedArtwork(null)} onClick={(event) => { if (event.target === event.currentTarget) setExpandedArtwork(null) }}>
        {expandedArtwork && <div className="art-modal-content"><button type="button" className="art-modal-close" onClick={() => setExpandedArtwork(null)} aria-label="Close artwork preview"><X aria-hidden="true" /></button><img src={expandedArtwork.src} alt={expandedArtwork.title} /><div className="art-modal-caption"><h2 id="art-modal-title">{expandedArtwork.title}</h2><p>{expandedArtwork.medium}</p></div></div>}
      </dialog>
    </div>
  )
}
