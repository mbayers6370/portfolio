import { useState } from 'react'
import MarginPreview, { type MarginScreen } from '../components/margin/MarginPreview'
import ProjectNavigation from '../components/ProjectNavigation'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project } from '../types/content'
import endOfFeed from '../assets/margin/icons/end-of-feed.svg'
import conversation from '../assets/margin/icons/conversation.svg'
import gallery from '../assets/margin/icons/gallery.svg'
import spaces from '../assets/margin/icons/spaces.svg'
import notebook from '../assets/margin/icons/notebook.svg'
import onRepeat from '../assets/margin/icons/on-repeat.svg'
import closeFriends from '../assets/margin/icons/close-friends.svg'
import reading from '../assets/margin/icons/reading.svg'
import '../styles/margin-brand.css'
import '../styles/margin.css'
import { workContent } from '../content/work'

const identityIcons: { src: string; label: string; desktopOnly?: boolean }[] = [
  { src: endOfFeed, label: 'End of feed' },
  { src: conversation, label: 'Conversation' },
  { src: gallery, label: 'Gallery' },
  { src: spaces, label: 'Spaces' },
  { src: notebook, label: 'Notebook', desktopOnly: true },
  { src: onRepeat, label: 'On Repeat', desktopOnly: true },
  { src: closeFriends, label: 'Close friends', desktopOnly: true },
  { src: reading, label: 'Reading', desktopOnly: true },
]

export default function MarginCaseStudy({ project }: { project: Project }) {
  const [activeScreen, setActiveScreen] = useState<MarginScreen>('Feed')
  const screens: MarginScreen[] = ['Feed', 'Profile', 'Spaces']

  return (
    <article className="margin-case-study margin-brand">
      <header className="margin-hero">
        <div className="margin-wrap">
          <Link className="margin-back" to="/#work"><ChevronLeft aria-hidden="true" /> All projects</Link>
          <div className="margin-hero-grid">
            <div>
              <h1 className="margin-wordmark">margin</h1>
              <p className="margin-hero-statement">{workContent.marginCard.hook}</p>
            </div>
            <div className="margin-hero-summary">
              <p>{project.desc}</p>
              <dl className="margin-meta">
                <div><dt>My role</dt><dd>{project.role}</dd></div>
                <div><dt>Project</dt><dd>Independent · {project.year}</dd></div>
                <div><dt>Scope</dt><dd>Identity, interaction, and implementation</dd></div>
              </dl>
              <div className="margin-project-links">
                <a className="margin-source-link" href={project.link} target="_blank" rel="noopener noreferrer">Explore live demo <ChevronRight aria-hidden="true" /></a>
                {project.sourceLink && <a className="margin-source-link" href={project.sourceLink} target="_blank" rel="noopener noreferrer">View source on GitHub <ChevronRight aria-hidden="true" /></a>}
              </div>
            </div>
          </div>
          <nav className="margin-page-nav" aria-label="Margin case study sections">
            <a href="#margin-idea">The idea</a>
            <a href="#margin-experience">The experience</a>
            <a href="#margin-language">Visual language</a>
            <a href="#margin-build">Behind the interface</a>
          </nav>
        </div>
      </header>

      <section className="margin-section margin-wrap" id="margin-idea">
        <div className="margin-concept">
          <h2>Margin: The Concept</h2>
          <p>Margin began with minimalism: what if social media gave people more room to live outside of it?</p>
          <p>A finite, chronological feed, intentional posting limits, mutual friendships, and smaller shared spaces keep the focus on personal connection. Reaching the end of the feed is part of the experience.</p>
          <p>Restrained typography, generous whitespace, and subtle motion carry that philosophy into a full-stack application, now presented as an interactive portfolio demo.</p>
          <p className="margin-concept-emphasis"><strong>Technology should make room for life, not take up all of it.</strong></p>
        </div>
      </section>

      <section className="margin-experience" id="margin-experience">
        <div className="margin-wrap">
          <div className="margin-section-heading margin-section-heading--stacked">
            <h2>Familiar places.<br />A connected experience.</h2>
            <p>The feed, profiles, and conversations share the same visual language. Each gives its content a clear home, from an everyday update to a collection of photographs.</p>
          </div>
          <div className="margin-screen-controls" role="group" aria-label="Choose a Margin screen">
            {screens.map((item) => (
              <button type="button" key={item} aria-pressed={item === activeScreen} aria-controls="margin-screen" onClick={() => setActiveScreen(item)}>{item}</button>
            ))}
          </div>
          <div id="margin-screen"><MarginPreview kind={activeScreen} /></div>
        </div>
      </section>

      <section className="margin-section margin-wrap" id="margin-language">
        <div className="margin-section-heading margin-section-heading--stacked">
          <h2>A visual language<br />with a human hand.</h2>
          <p>I designed Margin Aside, a custom typeface, and Margin Editorial Geometry, an original icon family, to give Margin its character. Warm paper, olive, and cinnamon hold the interface together, with Inter keeping navigation and controls clear.</p>
        </div>
        <div className="margin-design-system">
          <div className="margin-type-specimen">
            <span>Margin Aside</span>
            <p>Aa<br /><span>A thought.<br />A photograph.<br />A conversation.</span></p>
            <small>Original type · Worn-print detail · Rounded terminals</small>
          </div>
          <div className="margin-design-details">
            <div className="margin-icon-specimen">
              <span>Margin Editorial Geometry · Custom icon family</span>
              <div>{identityIcons.map((icon) => <figure className={icon.desktopOnly ? 'margin-icon-desktop-only' : undefined} key={icon.label}><img src={icon.src} alt="" /><figcaption>{icon.label}</figcaption></figure>)}</div>
            </div>
            <div className="margin-palette" aria-label="Margin color palette">
              <div><i style={{ background: '#eeede7' }} /><span>Warm paper</span><small>#EEEDE7</small></div>
              <div><i style={{ background: '#282820' }} /><span>Deep slate olive</span><small>#282820</small></div>
              <div><i style={{ background: '#777536' }} /><span>Olive</span><small>#777536</small></div>
              <div><i style={{ background: '#c99b61' }} /><span>Cinnamon</span><small>#C99B61</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="margin-build" id="margin-build">
        <div className="margin-wrap">
          <div className="margin-section-heading margin-section-heading--stacked">
            <h2>Design decisions,<br />carried into the build.</h2>
          </div>
          <div className="margin-build-columns">
            <div>
              <h3>The full-stack foundation</h3>
              <p>{project.details[2].body}</p>
              <ul>{['Next.js & TypeScript', 'PostgreSQL & Prisma', 'Authentication & authorization', 'Private media & data lifecycle'].map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>A demo you can explore</h3>
              <p>{project.details[3].body}</p>
              <p>The public demo uses sample content and local interactions. Live accounts, private uploads, and backend services are kept outside that experience.</p>
              <a className="margin-demo-link" href={project.link} target="_blank" rel="noopener noreferrer">Explore live demo <ChevronRight aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="margin-case-footer margin-wrap">
        <p>A little space goes a long way.</p>
        <ProjectNavigation sourceHref={project.sourceLink} />
      </footer>
    </article>
  )
}
