import { Link } from 'react-router-dom'
import projects from '../data/projects'

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Websites</h2>
        </div>

        {projects.map((p) => (
          <div className="project-feature" key={p.num}>
            <div className="project-number-bg">{p.num}</div>
            <div className="project-meta">
              <span className="project-num">No. {p.num}</span>
              <span style={{ color: 'var(--hairline)' }}>—</span>
              <span className="project-type">{p.type}</span>
            </div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tags.map(tag => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>
            <div className="project-actions">
              <Link to={`/work/${p.slug}`} className="project-link">
                Case Study <span>→</span>
              </Link>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link project-link--ghost">
                {p.linkLabel || 'Live Site'} <span>↗</span>
              </a>
            </div>
          </div>
        ))}

        <div className="project-grid">
          <div className="project-card">
            <span className="project-card-number">03</span>
            <span className="project-card-label">Coming Soon</span>
            <h3 className="project-card-title">Next Project</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
