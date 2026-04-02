import { useParams, Link } from 'react-router-dom'
import projects from '../data/projects'

export default function Project() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div className="project-page-404">
        <div className="container">
          <p>Project not found.</p>
          <Link to="/" className="books-back">← Back to portfolio</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="project-page">

      {/* ── Header ── */}
      <div className="page-header project-page-header">
        <div className="container">
          <div className="project-page-meta">
            <span className="page-header-label">No. {project.num}</span>
            <span className="page-header-label">{project.type}</span>
          </div>
          <h1 className="page-header-title">{project.title}.</h1>
          <div className="project-page-info">
            <div className="project-page-info-item">
              <span className="project-page-info-label">Role</span>
              <span className="project-page-info-value">{project.role}</span>
            </div>
            <div className="project-page-info-item">
              <span className="project-page-info-label">Year</span>
              <span className="project-page-info-value">{project.year}</span>
            </div>
            <div className="project-page-info-item project-page-info-tags">
              <span className="project-page-info-label">Stack</span>
              <div className="project-page-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container">

        {/* Overview */}
        <div className="project-page-overview">
          <div className="project-page-overview-label">Overview</div>
          <p className="project-page-overview-text">{project.desc}</p>
        </div>

        {/* Detail sections */}
        {project.details && (
          <div className="project-page-details">
            {project.details.map((d, i) => (
              <div className="project-page-detail" key={i}>
                <div className="project-page-detail-num">0{i + 1}</div>
                <div className="project-page-detail-body">
                  <h2 className="project-page-detail-heading">{d.heading}</h2>
                  <p className="project-page-detail-text">{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div className="project-page-footer">
          <Link to="/#work" className="books-back">← All Projects</Link>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-page-live"
            >
              {project.linkLabel ? `View ${project.linkLabel} →` : 'View Live Site →'}
            </a>
          )}
        </div>

      </div>
    </div>
  )
}
