import { Link } from 'react-router-dom'
import { booksArtContent } from '../content/books-art'

export default function BooksArt() {
  return (
    <section className="beyond">
      <div className="container">
        <div className="beyond-inner">
          <div>
            <span className="beyond-label">{booksArtContent.label}</span>
          </div>
          <div className="beyond-cards">
            {booksArtContent.cards.map((card) => (
              <Link to={card.to} className="beyond-card" key={card.to}>
                <div className="beyond-card-label">{card.label}</div>
                <div className="beyond-card-title">{card.title}</div>
                <div className="beyond-card-desc">{card.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
