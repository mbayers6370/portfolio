import { Link } from 'react-router-dom'
import ProjectTitle from './ProjectTitle'
import projects from '../content/projects'
import { workContent } from '../content/work'

const sortedProjects = [...projects].sort((a, b) => Number(a.num) - Number(b.num))

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{workContent.sectionTitle}</h2>
        </div>

        {sortedProjects.map((p) => (
          <div className="project-feature" key={p.num}>
            <div className="project-number-bg">{p.num}</div>
            <div className="project-meta">
              <span className="project-num">No. {p.num}</span>
              <span className="project-meta-divider">—</span>
              <span className="project-type">{p.type}</span>
            </div>
            <h3 className="project-title">
              <ProjectTitle title={p.title} />
            </h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tags.map((tag) => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>
            <div className="project-actions">
              <Link to={`/work/${p.slug}`} className="project-link">
                {workContent.caseStudyLabel} <span>→</span>
              </Link>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link project-link--ghost">
                {p.linkLabel || workContent.liveSiteLabel} <span>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
