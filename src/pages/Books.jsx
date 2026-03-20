import { Link } from 'react-router-dom'
import cover01 from '../assets/The Shape in the Echo - Kindle - 2.jpg'
import cover02 from '../assets/The Shape that Breaks - Kindle.png'

const books = [
  {
    number: '01',
    title: 'The Shape\nIn The Echo',
    status: 'Available Now',
    statusClass: 'available',
    description:
      'A story of memory, identity, and what gets left behind when the world resets around you. Book one of The Shape Sequence.',
    link: 'https://www.amazon.com/dp/B0DPF54L84',
    linkLabel: 'Buy on Amazon →',
    cover: cover01,
  },
  {
    number: '02',
    title: 'The Shape\nThat Breaks',
    status: 'Available Now',
    statusClass: 'available',
    description:
      "Lucian\u2019s reset comes with memories marked into his skin. He wakes in the city of Vaelor with a new promotion and an Engine that is on the brink of total control.",
    link: 'https://www.amazon.com/dp/B0GJ5FG1L4',
    linkLabel: 'Buy on Amazon →',
    cover: cover02,
  },
]

export default function Books() {
  return (
    <div className="page-books">

      {/* ── Hero header ── */}
      <div className="page-header">
        <div className="container">
          <span className="page-header-label">Writing</span>
          <h1 className="page-header-title">
            The Shape<br /><em>Sequence.</em>
          </h1>
          <p className="page-header-sub">
            A series about the architecture of a world meant to make you forget.
          </p>
        </div>
      </div>

      {/* ── Books list ── */}
      <div className="container">
        <div className="books-list">
          {books.map((book) => (
            <article className="book-entry" key={book.number}>
              <div className="book-entry-number">No.&nbsp;{book.number}</div>
              {book.cover && (
                <div className="book-entry-cover">
                  <img src={book.cover} alt={book.title.replace('\n', ' ')} />
                </div>
              )}
              <div className="book-entry-body">
                <div className="book-entry-top">
                  <h2 className="book-entry-title">
                    {book.title.split('\n').map((line, i) => (
                      <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                  </h2>
                  <span className={`book-status book-status--${book.statusClass}`}>
                    {book.status}
                  </span>
                </div>
                <p className="book-entry-desc">{book.description}</p>
                {book.link && (
                  <a
                    className="book-entry-link"
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {book.linkLabel}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* ── Author note ── */}
        <div className="books-author-note">
          <blockquote>
            "Writing found me when everything else fell apart."
          </blockquote>
          <p>
            Matthew Bayers is a self-published author, full-stack developer, and painter.
            His fiction explores queer identity, memory, and the architecture of worlds
            that feel just slightly out of reach, built for anyone who has ever felt
            like they didn't quite fit.
          </p>
          <Link to="/" className="books-back">← Back to portfolio</Link>
        </div>
      </div>

    </div>
  )
}
