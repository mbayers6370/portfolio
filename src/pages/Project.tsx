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
import schedulerArchived from '../assets/Archived.png'
import schedulerAddEvent from '../assets/Add_Event.png'
import schedulerAddCollection from '../assets/Add_Collection.png'
import sonusTopographic from '../assets/Topographic.png'
import sonusDesktopHome from '../assets/Desktop_Home.png'
import sonusLearn from '../assets/Learn.PNG'
import sonusPractice from '../assets/Practice.png'
import sonusTravel from '../assets/Travel.PNG'
import nelaRideBefore from '../assets/Before.PNG'
import nelaRideAfter from '../assets/After.PNG'
import nelaRideComponents from '../assets/Components.png'
import nelaRideTypography from '../assets/Typography.png'
import nelaRideIconography from '../assets/Iconography.png'

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
    { src: schedulerArchived, alt: 'Android Scheduler archived items screen', label: 'Archived' },
    { src: schedulerAddEvent, alt: 'Android Scheduler form for adding an event', label: 'Add event' },
    { src: schedulerAddCollection, alt: 'Android Scheduler form for adding a collection', label: 'Add collection' },
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
            <article className="scheduler-decision scheduler-decision--reverse"><div><h3>Search &amp;<br />interaction.</h3><p>Search is surfaced directly on the Home screen so it is easy to find. The dedicated search screen keeps the interaction focused, with a clear empty state that explains what to do next. Contextual plus controls live where creation is relevant, reducing ambiguity around adding events or collections.</p></div><img src={schedulerSearch} alt="Android Scheduler search screen with an empty-state prompt" /></article>
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

function SonusCaseStudy({ project }: { project: Project }) {
  return (
    <div className="project-page sonus-case-study">
      <header className="sonus-hero">
        <div className="container">
          <div className="sonus-hero-meta"><span>No. {project.num} / Independent project</span><span>{project.year}</span></div>
          <div className="sonus-hero-intro">
            <h1>Sonus.</h1>
            <p>Speak with clarity. Learn with structure.</p>
          </div>
          <div className="sonus-hero-spec"><span>Product design / engineering</span><span>React · TypeScript · PostgreSQL</span></div>
        </div>
      </header>

      <main>
        <section className="sonus-terrain-section" aria-label="Sonus project introduction">
          <div className="container">
            <div className="sonus-terrain-frame">
              <img src={sonusTopographic} alt="Topographic linework representing Sonus's focused learning paths" />
              <p>A learning experience built around focus, not distraction.</p>
            </div>
          </div>
        </section>

        <section className="sonus-section sonus-idea">
          <div className="container">
            <p className="sonus-kicker">01 / The idea</p>
            <h2>Language learning, without the noise.</h2>
            <p className="sonus-lead">Sonus began as an attempt to make language learning feel more deliberate. Structured lessons, meaningful practice, and real-world application take priority over points and streaks.</p>
            <div className="sonus-challenge"><div><p className="sonus-kicker">The challenge</p><h3>Structure over gamification.</h3></div><p>Build a system that supports retention, progression, and practical language use without overwhelming the learner.</p></div>
          </div>
        </section>

        <section className="sonus-section sonus-product">
          <div className="container">
            <p className="sonus-kicker">02 / The product</p>
            <h2>Three ways to learn.</h2>
            <div className="sonus-paths">
              <article><div><span>01</span><h3>Learn</h3><p>Guided units and structured progression.</p></div><figure className="sonus-phone-frame"><img src={sonusLearn} alt="Sonus Learn mobile experience" /></figure></article>
              <article><div><span>02</span><h3>Practice</h3><p>Listening, speaking, and review.</p></div><figure className="sonus-phone-frame"><img src={sonusPractice} alt="Sonus Practice mobile experience" /></figure></article>
              <article><div><span>03</span><h3>Travel</h3><p>Useful language for real situations.</p></div><figure className="sonus-phone-frame"><img src={sonusTravel} alt="Sonus Travel mobile experience" /></figure></article>
            </div>
            <figure className="sonus-home-showcase">
              <figcaption><span>Home / Desktop</span><span>The full learning dashboard</span></figcaption>
              <div><img src={sonusDesktopHome} alt="Sonus desktop home screen" /></div>
            </figure>
          </div>
        </section>

        <section className="sonus-section sonus-system">
          <div className="container">
            <p className="sonus-kicker">03 / The design system</p>
            <h2>A system discovered through building.</h2>
            <p className="sonus-lead">The interface came first. As Sonus evolved, its recurring patterns became the foundation for a formal visual identity.</p>
            <div className="sonus-swatches" aria-label="Sonus color palette"><span /><span /><span /><span /></div>
            <div className="sonus-system-grid">
              <div className="sonus-type-sample">
                <div>
                  <strong>Aa</strong>
                  <p className="sonus-type-name">Tenor Sans</p>
                  <p className="sonus-type-role">Display / Headlines</p>
                </div>
                <p className="sonus-type-line">Speak with clarity.<br />Learn with structure.</p>
                <span>Source Sans 3 · Body &nbsp; / &nbsp; Monoist · Captions</span>
              </div>
              <div className="sonus-component">
                <div className="sonus-component-preview">
                  <span>Continue Learning</span>
                  <b aria-hidden="true">›</b>
                </div>
                <span>Primary action / dark surface</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sonus-section sonus-outcome">
          <div className="container">
            <p className="sonus-kicker">04 / The outcome</p>
            <h2>One product. One coherent language.</h2>
            <p>A working learning platform supported by a reusable design system, with clearer visual patterns and room for future growth.</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">Explore Sonus <span>↗</span></a>
          </div>
        </section>
      </main>
      <div className="container project-page-footer sonus-footer"><Link to="/#work" className="books-back">{projectPageContent.labels.allProjects}</Link></div>
    </div>
  )
}

function NelaRideCaseStudy({ project }: { project: Project }) {
  const [expandedGuideline, setExpandedGuideline] = useState<{ alt: string; label: string; src: string } | null>(null)
  const guidelines = [
    { src: nelaRideComponents, alt: 'NELARide component guidelines', label: 'Components' },
    { src: nelaRideTypography, alt: 'NELARide typography guidelines', label: 'Typography' },
    { src: nelaRideIconography, alt: 'NELARide iconography guidelines', label: 'Iconography' },
  ]

  useEffect(() => {
    if (!expandedGuideline) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedGuideline(null)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [expandedGuideline])

  return (
    <div className="project-page nela-case-study">
      {/* This header intentionally mirrors the pre-existing NELARide hero. */}
      <div className="page-header project-page-header">
        <div className="container">
          <div className="project-page-meta">
            <span className="page-header-label">No. {project.num}</span>
            <span className="page-header-label">{project.type}</span>
          </div>
          <h1 className="page-header-title"><ProjectTitle title={project.title} />.</h1>
          <div className="project-page-info">
            <div className="project-page-info-item"><span className="project-page-info-label">{projectPageContent.labels.role}</span><span className="project-page-info-value">{project.role}</span></div>
            <div className="project-page-info-item"><span className="project-page-info-label">{projectPageContent.labels.year}</span><span className="project-page-info-value">{project.year}</span></div>
            <div className="project-page-info-item project-page-info-tags"><span className="project-page-info-label">{projectPageContent.labels.stack}</span><div className="project-page-tags">{project.tags.map((tag) => <span key={tag} className="project-tag">{tag}</span>)}</div></div>
          </div>
        </div>
      </div>

      <main>
        <section className="nela-section nela-project">
          <div className="container nela-intro-grid">
            <div><p className="nela-kicker">01 / The project</p><h2>One company.<br />Multiple experiences.</h2><p className="nela-copy">NELARide operates across a public website and separate Rider and Driver apps. My work began with the website redesign and expanded into helping establish a more consistent design language across the platform.</p></div>
            <dl className="nela-scope"><div><dt>01</dt><dd><strong>Website</strong><span>Visual redesign</span></dd></div><div><dt>02</dt><dd><strong>Rider app</strong><span>User experience</span></dd></div><div><dt>03</dt><dd><strong>Driver app</strong><span>User experience</span></dd></div></dl>
          </div>
        </section>

        <section className="nela-section nela-website">
          <div className="container nela-website-grid">
            <div><p className="nela-kicker">02 / Website &amp; system</p><h2>From website to<br />visual system.</h2><p>The website redesign became the foundation for a shared visual system across the Rider and Driver apps, bringing clearer hierarchy, consistent patterns, and a more cohesive NELARide experience.</p><a href={project.link} target="_blank" rel="noopener noreferrer">View live site <span>→</span></a></div>
            <div className="nela-guideline-cards">
              {guidelines.map((guideline) => <button className="nela-guideline-card" key={guideline.label} type="button" onClick={() => setExpandedGuideline(guideline)} aria-label={`Expand ${guideline.label} guidelines`}><img src={guideline.src} alt={guideline.alt} /><span>{guideline.label}</span></button>)}
            </div>
          </div>
        </section>

        <section className="nela-section nela-evolution">
          <div className="container nela-evolution-grid">
            <div><p className="nela-kicker">03 / From guidelines to experience</p><h2>Consistency shows<br />up in the details.</h2><p className="nela-copy">The Activity screen is one example of how the updated visual language improved hierarchy, clarity, and consistency within the Rider app.</p></div>
            <div className="nela-comparison"><figure><img src={nelaRideBefore} alt="NELARide Rider app interface before the visual update" /><figcaption>Earlier interface</figcaption></figure><span aria-hidden="true">→</span><figure><img src={nelaRideAfter} alt="NELARide Rider app interface after the visual update" /><figcaption>Updated interface</figcaption></figure></div>
          </div>
        </section>

        <section className="nela-section nela-ecosystem">
          <div className="container"><p className="nela-kicker">04 / The outcome</p><h2>Different journeys.<br />The same visual language.</h2><p>The website, Rider app, and Driver app serve different needs, but share a consistent visual foundation. My work grew from redesigning the public website to helping establish clearer guidance for future design decisions and a more cohesive experience for both riders and drivers.</p><div><Link to="/#work">← All projects</Link><a href={project.link} target="_blank" rel="noopener noreferrer">View live site →</a></div></div>
        </section>
      </main>
      {expandedGuideline && <div className="nela-guideline-modal" role="presentation" onMouseDown={() => setExpandedGuideline(null)}><div className="nela-guideline-modal-content" role="dialog" aria-modal="true" aria-label={`${expandedGuideline.label} guidelines`} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="nela-guideline-modal-close" onClick={() => setExpandedGuideline(null)} aria-label="Close guideline preview">×</button><img src={expandedGuideline.src} alt={expandedGuideline.alt} /><p>{expandedGuideline.label}</p></div></div>}
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

  if (project.slug === 'sonus') {
    return <SonusCaseStudy project={project} />
  }

  if (project.slug === 'nelaride') {
    return <NelaRideCaseStudy project={project} />
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
