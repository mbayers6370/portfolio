import '../styles/design.css'
import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { ChevronRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { designStudies } from '../content/design-studies'

export default function Design() {
  return (
    <div className="curiosities-page">
      <div className="curiosities-main">
        <PageHero className="curiosities-intro" title="Collected Curiosities" description="Some things are simply worth a closer look." />
        <div className="container">
          <ul className="design-collection" aria-label="Design studies">
            {designStudies.map(study => (
              <li key={study.slug}>
                <Link className="design-study-preview" style={{ '--preview-surface': study.preview.surface, '--preview-text': study.preview.text, '--preview-accent': study.preview.accent } as CSSProperties} to={`/design/${study.slug}`} aria-labelledby={`study-${study.slug}`}>
                  <div className="design-study-preview-visual">
                    <img src={study.image} alt={study.imageAlt} decoding="async" loading="lazy" />
                  </div>
                  <div className="design-study-preview-palette" role="img" aria-label={`Palette: ${study.palette.map(color => color.hex).join(', ')}`}>
                    {study.palette.map(color => <span key={color.hex} style={{ backgroundColor: color.hex }} />)}
                  </div>
                  <div className="design-study-preview-copy">
                    <h2 id={`study-${study.slug}`}>{study.title}</h2>
                    <p>{study.description}<span className="design-study-preview-summary"> {study.summary}</span></p>
                    <span className="design-study-preview-action">View study <ChevronRight className="link-chevron" aria-hidden="true" /></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
