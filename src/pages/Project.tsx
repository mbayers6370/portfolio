import '../styles/project.css'
import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProjectTitle from '../components/ProjectTitle'
import { projectPageContent } from '../content/project-page'
import projects from '../content/projects'
import type { Project } from '../types/content'
import schedulerOriginalHome from '../assets/Old-Home-Screen-Scheduler.png'
import schedulerSearch from '../assets/Search.png'
import schedulerAccount from '../assets/Account.png'

type ProjectDetailProps = {
  body: string
  heading: string
  index: number
}

function ProjectDetail({ body, heading, index }: ProjectDetailProps) {
  const rowRef = useRef<HTMLDivElement | null>(null)
  const [hasRevealed, setHasRevealed] = useState(false)

  useEffect(() => {
    const row = rowRef.current

    if (!row || hasRevealed) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true)
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin: '0px 0px -18% 0px',
        threshold: 0.25,
      },
    )

    observer.observe(row)

    return () => {
      observer.disconnect()
    }
  }, [hasRevealed])

  return (
    <div
      className={`project-page-detail${hasRevealed ? ' is-visible' : ''}`}
      ref={rowRef}
    >
      <div className="project-page-detail-num">0{index + 1}</div>
      <div className="project-page-detail-body">
        <h2 className="project-page-detail-heading">{heading}</h2>
        <p className="project-page-detail-text">{body}</p>
      </div>
    </div>
  )
}

type SchedulerScreen = {
  alt: string
  label: string
  src: string
}

function SchedulerCarousel({ screens }: { screens: SchedulerScreen[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const screenCount = screens.length

  useEffect(() => {
    screens.forEach((screen) => {
      const image = new Image()
      image.src = screen.src
    })
  }, [screens])

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + screenCount) % screenCount)
  }

  const visibleScreens = [-1, 0, 1].map((offset) => {
    const index = (activeIndex + offset + screenCount) % screenCount
    return { ...screens[index], offset }
  })

  return (
    <div
      className="scheduler-carousel"
      aria-label="Android Scheduler interface gallery"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') move(-1)
        if (event.key === 'ArrowRight') move(1)
      }}
      tabIndex={0}
    >
      <div className="scheduler-carousel-stage">
        <button className="scheduler-carousel-control" type="button" onClick={() => move(-1)} aria-label="Show previous screen">←</button>
        <div className="scheduler-carousel-track" aria-live="polite">
          {visibleScreens.map((screen) => (
            <figure className={`scheduler-carousel-slide${screen.offset === 0 ? ' is-active' : ' is-preview'}`} key={`slot-${screen.offset}`}>
              <img src={screen.src} alt={screen.alt} />
              <figcaption>{screen.label}</figcaption>
            </figure>
          ))}
        </div>
        <button className="scheduler-carousel-control" type="button" onClick={() => move(1)} aria-label="Show next screen">→</button>
      </div>
      <div className="scheduler-carousel-pagination" aria-label="Choose a screen">
        {screens.map((screen, index) => (
          <button
            aria-label={`Show ${screen.label} screen`}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={index === activeIndex ? 'is-active' : ''}
            key={screen.label}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <span>{index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function SchedulerCaseStudy({ project }: { project: Project }) {
  const [home, events, collections] = project.gallery || []
  const schedulerScreens = [
    home && { ...home, label: 'Home' },
    events && { ...events, label: 'Events' },
    collections && { ...collections, label: 'Collections' },
    { src: schedulerSearch, alt: 'Android Scheduler search screen with an empty-state prompt', label: 'Search' },
    { src: schedulerAccount, alt: 'Android Scheduler account screen with profile and preferences', label: 'Account' },
  ].filter(Boolean) as SchedulerScreen[]

  return (
    <div className="project-page scheduler-case-study">
      <header className="scheduler-hero">
        <div className="container scheduler-hero-grid">
          <div className="scheduler-hero-copy">
            <p className="scheduler-kicker">No. {project.num} / Android application</p>
            <h1>Android<br />Scheduler.</h1>
            <p className="scheduler-hero-subtitle">{project.desc}</p>
            <dl className="scheduler-metadata">
              <div><dt>Role</dt><dd>UI/UX Design &amp; Android Development</dd></div>
              <div><dt>Platform</dt><dd>Android</dd></div>
              <div><dt>Technology</dt><dd>Kotlin / Jetpack Compose</dd></div>
              <div><dt>Scope</dt><dd>Interface redesign, navigation, search, information architecture</dd></div>
            </dl>
          </div>
          {home && <figure className="scheduler-hero-screen"><img src={home.src} alt={home.alt} /></figure>}
        </div>
      </header>

      <main>
        <section className="scheduler-section scheduler-starting-point">
          <div className="container scheduler-split">
            <div className="scheduler-section-heading"><span>01</span><h2>The starting point.</h2></div>
            <div className="scheduler-prose">
              <p>The original application was a functional starting point. The redesign focused on making its organization, destinations, and interactions easier to discover, without treating the earlier work as something to dismiss.</p>
              <p>Its evolution centers on a simpler question: can the interface make the next useful action obvious?</p>
            </div>
          </div>
        </section>

        <section className="scheduler-section scheduler-comparison-section">
          <div className="container">
            <div className="scheduler-section-heading scheduler-section-heading--wide"><span>02</span><h2>From functional<br />to findable.</h2></div>
            <div className="scheduler-comparison">
              <figure className="scheduler-comparison-item"><img src={schedulerOriginalHome} alt="Original Android Scheduler home interface with mixed events and collections" /><figcaption>Original home / mixed event list, dropdown navigation, and floating action button</figcaption></figure>
              {home && <figure className="scheduler-comparison-item"><img src={home.src} alt={home.alt} /><figcaption>Redesigned home / visible search, distinct sections, persistent navigation</figcaption></figure>}
            </div>
            <ol className="scheduler-notes">
              <li><span>01</span> Persistent bottom navigation makes the app’s main destinations immediately available.</li>
              <li><span>02</span> A visible search field replaces the less prominent icon and overlay treatment.</li>
              <li><span>03</span> Contextual creation controls and Edit-first actions clarify what to do next.</li>
            </ol>
          </div>
        </section>

        <section className="scheduler-section scheduler-decisions">
          <div className="container">
            <div className="scheduler-section-heading scheduler-section-heading--wide"><span>03</span><h2>Design decisions.</h2></div>
            <article className="scheduler-decision"><div><h3>Navigation &amp;<br />information architecture.</h3><p>The interface shifts from a mixed event list and dropdown-based navigation to explicit destinations. Events and collections are separated into distinct places, while persistent bottom navigation gives the app a stable, legible structure.</p></div>{home && <img src={home.src} alt={home.alt} />}</article>
            <article className="scheduler-decision scheduler-decision--reverse"><div><h3>Search &amp;<br />interaction.</h3><p>Search becomes a clear, visible entry point rather than an interaction that must first be discovered. Contextual plus controls live where creation is relevant, reducing ambiguity around adding events or collections.</p></div><img src={schedulerSearch} alt="Android Scheduler search screen with an empty-state prompt" /></article>
            <article className="scheduler-decision"><div><h3>Visual hierarchy &amp;<br />consistency.</h3><p>Event cards carry the strongest visual weight; collections use a quieter treatment. Edit is the primary event action, while Delete recedes. Repeated spacing, type, and card patterns let the content—not the interface—set the hierarchy.</p></div>{events && <img src={events.src} alt={events.alt} />}</article>
          </div>
        </section>

        <section className="scheduler-section scheduler-final">
          <div className="container">
            <div className="scheduler-section-heading scheduler-section-heading--wide"><span>04</span><h2>The final experience.</h2></div>
            <SchedulerCarousel screens={schedulerScreens} />
          </div>
        </section>

        <section className="scheduler-section scheduler-reflection">
          <div className="container scheduler-split">
            <div className="scheduler-section-heading"><span>05</span><h2>Reflection &amp;<br />next steps.</h2></div>
            <div className="scheduler-prose"><p>This redesign came from evaluating an existing interface against practical design principles, then carrying the decisions through in Kotlin and Jetpack Compose. It was not informed by formal user research, and it does not claim measured outcomes.</p><p>Future usability testing could validate discoverability across navigation, event creation, search, and editing workflows.</p><div className="scheduler-links"><a href="https://mbayers6370.github.io/cs499-eportfolio/" target="_blank" rel="noopener noreferrer">Full technical capstone ↗</a><a href="https://github.com/mbayers6370/scheduler" target="_blank" rel="noopener noreferrer">GitHub repository ↗</a></div></div>
          </div>
        </section>
      </main>
      <div className="container project-page-footer"><Link to="/#work" className="books-back">{projectPageContent.labels.allProjects}</Link></div>
    </div>
  )
}

export default function Project() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="project-page-404">
        <div className="container">
          <p>{projectPageContent.notFound.message}</p>
          <Link to="/" className="books-back">{projectPageContent.notFound.backLabel}</Link>
        </div>
      </div>
    )
  }

  if (project.slug === 'cs499-eportfolio') {
    return <SchedulerCaseStudy project={project} />
  }

  return (
    <div className="project-page">
      <div className="page-header project-page-header">
        <div className="container">
          <div className="project-page-meta">
            <span className="page-header-label">No. {project.num}</span>
            <span className="page-header-label">{project.type}</span>
          </div>
          <h1 className="page-header-title">
            <ProjectTitle title={project.title} />.
          </h1>
          <div className="project-page-info">
            <div className="project-page-info-item">
              <span className="project-page-info-label">{projectPageContent.labels.role}</span>
              <span className="project-page-info-value">{project.role}</span>
            </div>
            <div className="project-page-info-item">
              <span className="project-page-info-label">{projectPageContent.labels.year}</span>
              <span className="project-page-info-value">{project.year}</span>
            </div>
            <div className="project-page-info-item project-page-info-tags">
              <span className="project-page-info-label">{projectPageContent.labels.stack}</span>
              <div className="project-page-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="project-page-overview">
          <div className="project-page-overview-label">{projectPageContent.labels.overview}</div>
          <p className="project-page-overview-text">{project.desc}</p>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className={`project-page-gallery${project.slug === 'cs499-eportfolio' ? ' project-page-gallery--scheduler' : ''}`}>
            <div className="project-page-gallery-label">
              {project.galleryLabel || projectPageContent.labels.gallery}
            </div>
            <div className="project-page-gallery-grid">
              {project.gallery.map((item) => (
                <figure className="project-page-gallery-item" key={item.src}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="project-page-gallery-image"
                  />
                  {item.label && (
                    <figcaption className="project-page-gallery-caption">
                      {item.label}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        )}

        <div className="project-page-details">
          {project.details.map((d, i) => (
            <ProjectDetail
              body={d.body}
              heading={d.heading}
              index={i}
              key={`${project.slug}-${d.heading}`}
            />
          ))}
        </div>

        <div className="project-page-footer">
          <Link to="/#work" className="books-back">{projectPageContent.labels.allProjects}</Link>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-page-live"
          >
            {project.linkLabel ? `View ${project.linkLabel} →` : 'View Live Site →'}
          </a>
        </div>
      </div>
    </div>
  )
}
