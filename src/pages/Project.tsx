import '../styles/project.css'
import '../styles/project-scheduler.css'
import '../styles/project-sonus.css'
import '../styles/project-nela.css'
import '../styles/nela-brand.css'
import '../styles/scheduler-brand.css'
import '../styles/sonus-brand.css'
import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, BedDouble, CarFront, Plane, Store, X } from 'lucide-react'
import ProjectTitle from '../components/ProjectTitle'
import ProjectNavigation from '../components/ProjectNavigation'
import { projectPageContent } from '../content/project-page'
import projects from '../content/projects'
import type { Project } from '../types/content'
import MarginCaseStudy from './MarginCaseStudy'
import schedulerOriginalHome from '../assets/Old-Home-Screen-Scheduler.png'
import schedulerSearch from '../assets/Search.png'
import sonusTopographicTransparent from '../assets/Topographic_Transparent.png'
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
}

function ProjectDetail({ body, heading }: ProjectDetailProps) {
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
      <div className="project-page-detail-body">
        <h2 className="project-page-detail-heading">{heading}</h2>
        <p className="project-page-detail-text">{body}</p>
      </div>
    </div>
  )
}

type SchedulerScreen = {
  alt: string
  src: string
}

type SchedulerDecision = {
  body: string
  heading: string
  screen: SchedulerScreen
}

function SchedulerDecisionCarousel({ decisions }: { decisions: SchedulerDecision[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const decisionCount = decisions.length

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + decisionCount) % decisionCount)
  }

  return (
    <div
      className="scheduler-decision-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Scheduler design decisions"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          move(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}
      tabIndex={0}
    >
      <div className="scheduler-decision-stage">
        <div className="scheduler-decision-panels" aria-live="polite">
          {decisions.map((decision, index) => (
            <div className={`scheduler-decision-panel${index === activeIndex ? ' is-active' : ''}`} key={decision.heading} role="group" aria-roledescription="slide" aria-label={decision.heading} aria-hidden={index !== activeIndex}>
              <div className="scheduler-decision-copy">
                <h3>{decision.heading}</h3>
                <p>{decision.body}</p>
              </div>
              <figure className="scheduler-decision-screens">
                <img src={decision.screen.src} alt={decision.screen.alt} width={1080} height={2400} />
              </figure>
            </div>
          ))}
        </div>
        <div className="scheduler-decision-controls" role="group" aria-label="Change design decision">
          <button className="scheduler-decision-control" type="button" onClick={() => move(-1)} aria-label="Show previous design decision"><ChevronLeft aria-hidden="true" /></button>
          <button className="scheduler-decision-control" type="button" onClick={() => move(1)} aria-label="Show next design decision"><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  )
}

function SchedulerCaseStudy({ project }: { project: Project }) {
  const [home, events] = project.gallery || []
  const schedulerDecisions = [
    home && {
      heading: 'Navigation & information architecture',
      body: 'Reorganized the interface around four persistent destinations, separating events from collections and reducing reliance on dropdown navigation. Contextual creation controls and a quieter archive establish clearer priorities without removing functionality.',
      screen: home,
    },
    {
      heading: 'Search & interaction',
      body: 'Made search immediately discoverable on the Home screen and replaced the previous overlay with a dedicated experience. Clear empty-state guidance and consistent event interactions support discovery without confusing viewing with editing.',
      screen: { src: schedulerSearch, alt: 'Android Scheduler search screen with an empty-state prompt' },
    },
    events && {
      heading: 'Visual hierarchy & consistency',
      body: 'Refined the existing expandable event cards to prioritize essential information and reveal details progressively. Editing receives primary emphasis, while deletion remains accessible as a tertiary action. Consistent spacing, typography, and card treatments reinforce hierarchy throughout the application.',
      screen: events,
    },
  ].filter(Boolean) as SchedulerDecision[]

  return (
    <div className="project-page scheduler-case-study scheduler-brand">
      <header className="scheduler-hero">
        <div className="container scheduler-hero-grid">
          <div className="scheduler-hero-copy">
            <p className="scheduler-kicker">Android application</p>
            <h1>Android<br />Scheduler</h1>
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
            <div className="scheduler-section-heading"><h2>The starting point.</h2></div>
            <div className="scheduler-prose">
              <p>The original application was a functional starting point. The redesign focused on making its organization, destinations, and interactions easier to discover, without treating the earlier work as something to dismiss.</p>
              <p>Its evolution centers on a simpler question: can the interface make the next useful action obvious?</p>
            </div>
          </div>
        </section>

        <section className="scheduler-section scheduler-comparison-section">
          <div className="container">
            <div className="scheduler-section-heading scheduler-section-heading--wide"><h2>From functional<br />to findable.</h2></div>
            <div className="scheduler-comparison">
              <figure className="scheduler-comparison-item"><img src={schedulerOriginalHome} alt="Original Android Scheduler home interface with mixed events and collections" /><figcaption>Original home / mixed event list, dropdown navigation, and floating action button</figcaption></figure>
              {home && <figure className="scheduler-comparison-item"><img src={home.src} alt={home.alt} /><figcaption>Redesigned home / visible search, distinct sections, persistent navigation</figcaption></figure>}
            </div>
            <ol className="scheduler-notes">
              <li><strong>Persistent navigation</strong><p>Four visible destinations replace reliance on dropdown navigation, making the application's structure easier to understand.</p></li>
              <li><strong>Clearer content hierarchy</strong><p>Upcoming events and collections are separated into distinct sections, prioritizing scheduled activities while keeping organization accessible.</p></li>
              <li><strong>Discoverable interactions</strong><p>A visible search field and contextual creation controls replace less prominent actions, making common tasks easier to identify.</p></li>
            </ol>
          </div>
        </section>

        <section className="scheduler-section scheduler-decisions">
          <div className="container">
            <div className="scheduler-section-heading scheduler-section-heading--wide"><h2>Design decisions.</h2></div>
            <SchedulerDecisionCarousel decisions={schedulerDecisions} />
          </div>
        </section>

        <section className="scheduler-section scheduler-reflection">
          <div className="container scheduler-split">
            <div className="scheduler-section-heading"><h2>Reflection &amp;<br />next steps.</h2></div>
            <div className="scheduler-prose"><p>This redesign began with an evaluation of the existing interface against established usability principles, followed by implementation in Kotlin and Jetpack Compose. While the changes were informed by UX reasoning rather than formal user research, their effectiveness has not yet been measured.</p><p>Future usability testing would focus on key tasks: finding an upcoming event, creating a new event, searching for an existing entry, and editing its details. Task completion rates, time on task, and points of confusion would help determine whether the redesigned navigation, hierarchy, and interactions improve usability and identify opportunities for further iteration.</p><div className="scheduler-links"><a href="https://mbayers6370.github.io/cs499-eportfolio/" target="_blank" rel="noopener noreferrer">Full technical capstone <ChevronRight className="link-chevron" aria-hidden="true" /></a><a href="https://github.com/mbayers6370/scheduler" target="_blank" rel="noopener noreferrer">GitHub repository <ChevronRight className="link-chevron" aria-hidden="true" /></a></div></div>
          </div>
        </section>
      </main>
      <footer className="container project-page-footer"><ProjectNavigation liveHref={project.link} liveLabel="View ePortfolio" /></footer>
    </div>
  )
}

function SonusCaseStudy({ project }: { project: Project }) {
  return (
    <div className="project-page sonus-case-study sonus-brand">
      <header className="sonus-hero">
        <img className="sonus-hero-topographic" src={sonusTopographicTransparent} alt="" aria-hidden="true" />
        <div className="container">
          <div className="sonus-hero-meta"><span>Independent project</span><span>{project.year}</span></div>
          <div className="sonus-hero-intro">
            <h1>Sonus</h1>
            <p>A learning experience built around focus, not distraction.</p>
          </div>
          <div className="sonus-hero-spec"><span>{project.role}</span><span>React · TypeScript · PostgreSQL</span></div>
        </div>
      </header>

      <main>
        <section className="sonus-section sonus-idea">
          <div className="container">
            <p className="sonus-kicker">The idea</p>
            <h2>Language learning, without the noise.</h2>
            <p className="sonus-lead">Sonus began as an attempt to make language learning feel more deliberate. Structured lessons, meaningful practice, and real-world application take priority over points and streaks.</p>
            <div className="sonus-challenge"><div><p className="sonus-kicker">The challenge</p><h3>Structure over gamification.</h3><p className="sonus-challenge-copy">Build a system that supports retention, progression, and practical language use without overwhelming the learner.</p></div></div>
          </div>
        </section>

        <section className="sonus-section sonus-product">
          <div className="container">
            <p className="sonus-kicker">The product</p>
            <h2>Three ways to learn.</h2>
            <div className="sonus-paths">
              <article><div><h3>Learn</h3><p>Guided units and structured progression.</p></div><figure className="sonus-phone-frame"><img src={sonusLearn} alt="Sonus Learn mobile experience" /></figure></article>
              <article><div><h3>Practice</h3><p>Listening, speaking, and review.</p></div><figure className="sonus-phone-frame"><img src={sonusPractice} alt="Sonus Practice mobile experience" /></figure></article>
              <article><div><h3>Travel</h3><p>Useful language for real situations.</p></div><figure className="sonus-phone-frame"><img src={sonusTravel} alt="Sonus Travel mobile experience" /></figure></article>
            </div>
            <figure className="sonus-home-showcase">
              <figcaption><span>Home / Desktop</span><span>The full learning dashboard</span></figcaption>
              <div><img src={sonusDesktopHome} alt="Sonus desktop home screen" /></div>
            </figure>
          </div>
        </section>

        <section className="sonus-section sonus-system">
          <div className="container">
            <p className="sonus-kicker">The design system</p>
            <h2>A system discovered through building.</h2>
            <p className="sonus-lead">The interface came first. As Sonus evolved, its recurring patterns became the foundation for a formal visual identity.</p>
            <div className="sonus-swatches" aria-label="Sonus color palette"><span /><span /><span /><span /></div>
            <div className="sonus-showcase-grid">
            <div className="sonus-system-grid">
              <div className="sonus-type-sample">
                <div>
                  <strong>Aa</strong>
                  <p className="sonus-type-name">Tenor Sans</p>
                  <p className="sonus-type-role">Display / Headlines</p>
                </div>
                <div className="sonus-type-specimen">
                  <p className="sonus-type-line">Speak with clarity.<br />Learn with structure.</p>
                </div>
                <div className="sonus-type-roles">
                  <span>Source Sans 3 <small>Body / Interface</small></span>
                  <span>Monoist <small>Captions / Metadata</small></span>
                  <span className="sonus-type-scale">48 / 28 / 16 / 12</span>
                </div>
              </div>
            </div>
            <div className="sonus-component-library">
              <div className="sonus-component sonus-component--travel">
                <div className="sonus-travel-preview">
                  <h3>Travel Sprint</h3>
                  <p>Short on time? Practice essential travel phrases before you go.</p>
                  <div>
                    <span><Plane aria-hidden="true" /> Airport</span>
                    <span><BedDouble aria-hidden="true" /> Hotel</span>
                    <span><Store aria-hidden="true" /> Konbini</span>
                  </div>
                  <b>Explore Travel Content <em aria-hidden="true"><ChevronRight className="link-chevron" aria-hidden="true" /></em></b>
                </div>
              </div>
              <div className="sonus-component sonus-component--travel-feature">
                <div className="sonus-travel-feature-preview">
                  <div className="sonus-travel-feature-head"><b aria-hidden="true">‹</b><span>Travel Sprint</span></div>
                  <div className="sonus-travel-feature-body">
                    <p><Plane aria-hidden="true" /> Travel Sprint</p>
                    <h3>Leaving Soon?</h3>
                    <p>Travel Sprint prepares you for real-world Japanese with essential phrases for your trip.</p>
                    <strong>Pick a situation, practice the lines, and get day-one confidence fast.</strong>
                  </div>
                  <div className="sonus-travel-feature-meta"><span>8 scenarios</span><span>Audio + rapid recall</span></div>
                  <div className="sonus-travel-feature-scenarios">
                    <div><Plane aria-hidden="true" /><strong>Airport</strong><small>&amp; Arrival</small></div>
                    <div><CarFront aria-hidden="true" /><strong>Transport</strong><small>&amp; Getting Around</small></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sonus-component sonus-component--resume sonus-resume-after-travel">
              <div className="sonus-resume-preview">
                <p>Welcome, Matt</p>
                <strong>N5</strong>
                <span>Unit 3 · Lesson 1</span>
                <b>Continue Learning <em aria-hidden="true"><ChevronRight className="link-chevron" aria-hidden="true" /></em></b>
              </div>
            </div>
            </div>
          </div>
        </section>

        <section className="sonus-section sonus-outcome">
          <div className="container">
            <p className="sonus-kicker">The outcome</p>
            <h2>One product. One coherent language.</h2>
            <p>A working learning platform supported by a reusable design system, with clearer visual patterns and room for future growth.</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">Explore Sonus <span aria-hidden="true"><ChevronRight className="link-chevron" aria-hidden="true" /></span></a>
          </div>
        </section>
      </main>
      <footer className="container project-page-footer sonus-footer"><ProjectNavigation liveHref={project.link} sourceHref={project.sourceLink} /></footer>
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
    <div className="project-page nela-case-study nela-brand">
      {/* This header intentionally mirrors the pre-existing NELARide hero. */}
      <div className="page-header project-page-header">
        <div className="container">
          <div className="project-page-meta">
            <span className="page-header-label">{project.type}</span>
          </div>
          <h1 className="page-header-title"><ProjectTitle title={project.title} /></h1>
          <div className="project-page-info">
            <div className="project-page-info-item"><span className="project-page-info-label">{projectPageContent.labels.role}</span><span className="project-page-info-value">{project.role}</span></div>
            <div className="project-page-info-item"><span className="project-page-info-label">{projectPageContent.labels.year}</span><span className="project-page-info-value">{project.year}</span></div>
            <div className="project-page-info-item project-page-info-tags"><span className="project-page-info-label">{projectPageContent.labels.stack}</span><div className="project-page-tags">{project.tags.map((tag) => <span key={tag} className="project-tag">{tag}</span>)}</div></div>
          </div>
        </div>
      </div>

      <main>
        <section className="nela-section nela-project">
          <div className="container nela-project-layout">
            <div className="nela-section-intro">
              <p className="nela-kicker">The project</p>
              <h2>One company.<br />Multiple experiences.</h2>
              <p className="nela-copy">NELARide operates across a public website and separate Rider and Driver apps. My work began with the website redesign and expanded into helping establish a more consistent design language across the platform.</p>
            </div>
            <dl className="nela-scope" aria-label="Project scope">
              <div><dt>Website</dt><dd>Visual redesign</dd></div>
              <div><dt>Rider app</dt><dd>User experience</dd></div>
              <div><dt>Driver app</dt><dd>User experience</dd></div>
            </dl>
          </div>
        </section>

        <section className="nela-section nela-website">
          <div className="container nela-website-grid">
            <div className="nela-section-intro">
              <p className="nela-kicker">Website &amp; system</p>
              <h2>From website to<br />visual system.</h2>
              <p className="nela-copy">The website redesign became the foundation for a shared visual system across the Rider and Driver apps, bringing clearer hierarchy, consistent patterns, and a more cohesive NELARide experience.</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">View live site <span aria-hidden="true"><ChevronRight className="link-chevron" aria-hidden="true" /></span></a>
            </div>
            <div className="nela-guideline-cards">
              {guidelines.map((guideline) => (
                <button className="nela-guideline-card" key={guideline.label} type="button" onClick={() => setExpandedGuideline(guideline)} aria-label={`Expand ${guideline.label} guidelines`} aria-haspopup="dialog">
                  <img src={guideline.src} alt={guideline.alt} width={1920} height={1080} loading="lazy" />
                  <span className="nela-guideline-caption"><strong>{guideline.label}</strong><span aria-hidden="true">Expand</span></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="nela-section nela-evolution">
          <div className="container nela-evolution-grid">
            <div><p className="nela-kicker">From guidelines to experience</p><h2>Consistency shows<br />up in the details.</h2><p className="nela-copy">The Activity screen is one example of how the updated visual language improved hierarchy, clarity, and consistency within the Rider app.</p></div>
            <div className="nela-comparison"><figure><img src={nelaRideBefore} alt="NELARide Rider app interface before the visual update" /><figcaption>Earlier interface</figcaption></figure><span aria-hidden="true"><ChevronRight className="link-chevron" aria-hidden="true" /></span><figure><img src={nelaRideAfter} alt="NELARide Rider app interface after the visual update" /><figcaption>Updated interface</figcaption></figure></div>
          </div>
        </section>

        <section className="nela-section nela-ecosystem">
          <div className="container"><p className="nela-kicker">The outcome</p><h2>Different journeys.<br />The same visual language.</h2><p>The website, Rider app, and Driver app serve different needs, but share a consistent visual foundation. My work grew from redesigning the public website to helping establish clearer guidance for future design decisions and a more cohesive experience for both riders and drivers.</p></div>
        </section>
      </main>
      <footer className="container project-page-footer"><ProjectNavigation liveHref={project.link} /></footer>
      {expandedGuideline && <div className="nela-guideline-modal" role="presentation" onMouseDown={() => setExpandedGuideline(null)}><div className="nela-guideline-modal-content" role="dialog" aria-modal="true" aria-label={`${expandedGuideline.label} guidelines`} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="nela-guideline-modal-close" onClick={() => setExpandedGuideline(null)} aria-label="Close guideline preview"><X aria-hidden="true" /></button><img src={expandedGuideline.src} alt={expandedGuideline.alt} /><p>{expandedGuideline.label}</p></div></div>}
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
          <Link to="/" className="books-back"><ChevronLeft className="link-chevron" aria-hidden="true" />{projectPageContent.notFound.backLabel}</Link>
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

  if (project.slug === 'margin') {
    return <MarginCaseStudy project={project} />
  }

  return (
    <div className="project-page">
      <div className="page-header project-page-header">
        <div className="container">
          <div className="project-page-meta">
            <span className="page-header-label">{project.type}</span>
          </div>
          <h1 className="page-header-title">
            <ProjectTitle title={project.title} />
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
          {project.details.map((d) => (
            <ProjectDetail
              body={d.body}
              heading={d.heading}
              key={`${project.slug}-${d.heading}`}
            />
          ))}
        </div>

        <footer className="project-page-footer">
          <ProjectNavigation liveHref={project.link} sourceHref={project.sourceLink} />
        </footer>
      </div>
    </div>
  )
}
