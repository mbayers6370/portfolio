import { Link } from 'react-router-dom'
import { booksArtContent } from '../content/books-art'

export default function BooksArt() {
  return (
    <section className="beyond">
      <div className="container">
        <div className="beyond-inner">
          <div className="beyond-intro">
            <span className="beyond-label">{booksArtContent.label}</span>
            <h2>{booksArtContent.title}</h2>
            <p>{booksArtContent.description}</p>
          </div>
          <div className="beyond-cards">
            {booksArtContent.cards.map((card) => (
              <Link to={card.to} className={`beyond-card beyond-card--${card.theme}`} key={card.to}>
                <div className="beyond-card-meta">
                  <span>{card.number}</span>
                  <span>{card.label}</span>
                </div>
                <div className="beyond-card-title">{card.title}</div>
                <div className="beyond-card-desc">{card.description}</div>
                <span className="beyond-card-arrow" aria-hidden="true">↗︎</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
