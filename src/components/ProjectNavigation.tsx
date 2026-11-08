import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '../styles/project-navigation.css'

type ProjectNavigationProps = {
  liveHref?: string
  liveLabel?: string
  sourceHref?: string
}

export default function ProjectNavigation({ liveHref, liveLabel = 'View live site', sourceHref }: ProjectNavigationProps) {
  return (
    <nav className="project-navigation" aria-label="Project links">
      <Link to="/#work"><ChevronLeft aria-hidden="true" /> All projects</Link>
      <div className="project-navigation-links">
        {liveHref && liveHref !== '#' && <a href={liveHref} target="_blank" rel="noopener noreferrer">{liveLabel} <ChevronRight aria-hidden="true" /></a>}
        {sourceHref && <a href={sourceHref} target="_blank" rel="noopener noreferrer">View source on GitHub <ChevronRight aria-hidden="true" /></a>}
      </div>
    </nav>
  )
}
