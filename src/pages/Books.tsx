import '../styles/books.css'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { books, booksPageContent } from '../content/books'
import PageHero from '../components/PageHero'

export default function Books() {
  return (
    <div className="page-books">
      <PageHero className="books-hero" title={booksPageContent.title} description={booksPageContent.subtitle} />

      <div className="container books-content">
        <div className="books-list">
          {books.map((book) => (
            <article className="book-entry" key={book.number} aria-labelledby={`book-${book.number}-title`}>
              <span className="book-entry-number">Book {book.number}</span>
              <span className={`book-status book-status--${book.statusClass}`}>{book.status}</span>
              <header className="book-entry-heading">
                <h2 className="book-entry-title" id={`book-${book.number}-title`}>{book.title}</h2>
              </header>
              <div className="book-entry-body">
                <p className="book-entry-desc">{book.description}</p>
                {book.statusClass === 'available' && (
                  <a
                    className="book-entry-link"
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buy ${book.title.replace('\n', ' ')} on Amazon`}
                  >
                    {book.linkLabel} <ChevronRight className="link-chevron" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <aside className="books-author-note" aria-label="About the author">
          <blockquote>"{booksPageContent.authorQuote}"</blockquote>
          <p>{booksPageContent.authorBio}</p>
          <Link to="/" className="books-back"><ChevronLeft className="link-chevron" aria-hidden="true" />{booksPageContent.backLabel}</Link>
        </aside>
      </div>
    </div>
  )
}
