import { Link } from 'react-router-dom'

export default function BooksArt() {
  return (
    <section className="beyond">
      <div className="container">
        <div className="beyond-inner">
          <div>
            <span className="beyond-label">Beyond Code</span>
          </div>
          <div className="beyond-cards">
            <Link to="/books" className="beyond-card">
              <div className="beyond-card-label">Writing</div>
              <div className="beyond-card-title">Books</div>
              <div className="beyond-card-desc">
                Published fiction. Words, like code, require architecture.
              </div>
            </Link>
            <Link to="/art" className="beyond-card">
              <div className="beyond-card-label">Visual</div>
              <div className="beyond-card-title">Art</div>
              <div className="beyond-card-desc">
                Oil &amp; acrylic paintings — the creative practice behind the work.
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
