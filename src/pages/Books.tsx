import '../styles/books.css'
import { Link } from 'react-router-dom'
import { books, booksPageContent } from '../content/books'

export default function Books() {
  return (
    <div className="page-books">
      <div className="page-header">
        <div className="container">
          <span className="page-header-label">{booksPageContent.pageLabel}</span>
          <h1 className="page-header-title">
            {booksPageContent.title[0]}
            <br />
            <em>{booksPageContent.title[1]}</em>
          </h1>
          <p className="page-header-sub">{booksPageContent.subtitle}</p>
        </div>
      </div>

      <div className="container">
        <div className="books-list">
          {books.map((book) => (
            <article className="book-entry" key={book.number}>
              <div className="book-entry-number">No.&nbsp;{book.number}</div>
              <div className="book-entry-cover">
                <img src={book.cover} alt={book.title.replace('\n', ' ')} />
              </div>
              <div className="book-entry-body">
                <div className="book-entry-top">
                  <h2 className="book-entry-title">
                    {book.title.split('\n').map((line, i) => (
                      <span key={`${book.number}-${line}`}>{line}{i === 0 && <br />}</span>
                    ))}
                  </h2>
                  <span className={`book-status book-status--${book.statusClass}`}>
                    {book.status}
                  </span>
                </div>
                <p className="book-entry-desc">{book.description}</p>
                <a
                  className="book-entry-link"
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {book.linkLabel}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="books-author-note">
          <blockquote>"{booksPageContent.authorQuote}"</blockquote>
          <p>{booksPageContent.authorBio}</p>
          <Link to="/" className="books-back">{booksPageContent.backLabel}</Link>
        </div>
      </div>
    </div>
  )
}
