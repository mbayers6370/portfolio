import '../styles/project.css'
import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BedDouble, CarFront, ChevronDown, ExternalLink, Plane, Store, X } from 'lucide-react'
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
import schedulerEventsClosed from '../assets/Events_Closed.png'
import schedulerEventsOpenCard from '../assets/Events_open_card.png'
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
import travlrPrebuilt from '../assets/Prebuilt.png'
import travlrRedesign from '../assets/Redesign.png'
import travlrTravelOld from '../assets/Travel_Old.png'
import travlrTravelRedesign from '../assets/Travel_Redesign.png'
import travlrDiningOld from '../assets/Dining.png'
import travlrDiningRedesign from '../assets/Dining_Redesign.png'
import travlrAboutOld from '../assets/About.png'
import travlrAboutRedesign from '../assets/About_Redesign.png'
import travlrRoomsOld from '../assets/Rooms.png'
import travlrRoomsRedesign from '../assets/Rooms_Redesign.png'

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

type SchedulerDecision = {
  body: string
  heading: string
  images: SchedulerScreen[]
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
        <button className="scheduler-carousel-control" type="button" onClick={() => move(-1)} aria-label="Show previous screen"><ArrowLeft aria-hidden="true" /></button>
        <div className="scheduler-carousel-track" aria-live="polite">
          {visibleScreens.map((screen) => (
            <figure className={`scheduler-carousel-slide${screen.offset === 0 ? ' is-active' : ' is-preview'}`} key={`slot-${screen.offset}`}>
              <img src={screen.src} alt={screen.alt} />
              <figcaption>{screen.label}</figcaption>
            </figure>
          ))}
        </div>
        <button className="scheduler-carousel-control" type="button" onClick={() => move(1)} aria-label="Show next screen"><ArrowRight aria-hidden="true" /></button>
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

function SchedulerDecisionCarousel({ decisions }: { decisions: SchedulerDecision[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const decisionCount = decisions.length
  const activeDecision = decisions[activeIndex]

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + decisionCount) % decisionCount)
  }

  return (
    <div
      className="scheduler-decision-carousel"
      aria-label="Scheduler design decisions"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') move(-1)
        if (event.key === 'ArrowRight') move(1)
      }}
      tabIndex={0}
    >
      <div className="scheduler-decision-stage">
        <button className="scheduler-decision-control" type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); move(-1) }} aria-label="Show previous design decision"><ArrowLeft aria-hidden="true" /></button>
        <div className="scheduler-decision-panel">
          <div className="scheduler-decision-copy">
            <h3>{activeDecision.heading}</h3>
            <p>{activeDecision.body}</p>
          </div>
          <figure className={`scheduler-decision-screens${activeDecision.images.length > 1 ? ' has-multiple' : ''}`}>
            {activeDecision.images.map((image) => <img key={image.src} src={image.src} alt={image.alt} />)}
          </figure>
        </div>
        <button className="scheduler-decision-control" type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); move(1) }} aria-label="Show next design decision"><ArrowRight aria-hidden="true" /></button>
      </div>
    </div>
  )
}

function SchedulerCaseStudy({ project }: { project: Project }) {
  const [home, events, collections] = project.gallery || []
  const schedulerScreens = [
    home && { ...home, label: 'Home' },
    events && { ...events, label: 'EVENTS / CARD EXPANDED' },
    collections && { ...collections, label: 'Collections' },
    { src: schedulerSearch, alt: 'Android Scheduler search screen with an empty-state prompt', label: 'Search' },
    { src: schedulerAccount, alt: 'Android Scheduler account screen with profile and preferences', label: 'Account' },
    { src: schedulerArchived, alt: 'Android Scheduler archived items screen', label: 'Archived' },
    { src: schedulerAddEvent, alt: 'Android Scheduler form for adding an event', label: 'Add event' },
    { src: schedulerAddCollection, alt: 'Android Scheduler form for adding a collection', label: 'Add collection' },
  ].filter(Boolean) as SchedulerScreen[]
  const schedulerDecisions = [
    home && {
      heading: 'Navigation & information architecture',
      body: 'Reorganized the interface around four persistent destinations, separating events from collections and reducing reliance on dropdown navigation. Contextual creation controls and a quieter archive establish clearer priorities without removing functionality.',
      images: [home],
    },
    {
      heading: 'Search & interaction',
      body: 'Made search immediately discoverable on the Home screen and replaced the previous overlay with a dedicated experience. Clear empty-state guidance and consistent event interactions support discovery without confusing viewing with editing.',
      images: [{ src: schedulerSearch, alt: 'Android Scheduler search screen with an empty-state prompt', label: 'Search' }],
    },
    events && {
      heading: 'Visual hierarchy & consistency',
      body: 'Refined the existing expandable event cards to prioritize essential information and reveal details progressively. Editing receives primary emphasis, while deletion remains accessible as a tertiary action. Consistent spacing, typography, and card treatments reinforce hierarchy throughout the application.',
      images: [
        { src: schedulerEventsClosed, alt: 'Android Scheduler events screen with event cards closed', label: 'Events closed' },
        { src: schedulerEventsOpenCard, alt: 'Android Scheduler events screen with an expanded event card', label: 'Events card expanded' },
      ],
    },
  ].filter(Boolean) as SchedulerDecision[]

  return (
    <div className="project-page scheduler-case-study">
      <header className="scheduler-hero">
        <div className="container scheduler-hero-grid">
          <div className="scheduler-hero-copy">
            <p className="scheduler-kicker">Android application</p>
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
              <li><span>01</span><strong>Persistent navigation</strong><p>Four visible destinations replace reliance on dropdown navigation, making the application's structure easier to understand.</p></li>
              <li><span>02</span><strong>Clearer content hierarchy</strong><p>Upcoming events and collections are separated into distinct sections, prioritizing scheduled activities while keeping organization accessible.</p></li>
              <li><span>03</span><strong>Discoverable interactions</strong><p>A visible search field and contextual creation controls replace less prominent actions, making common tasks easier to identify.</p></li>
            </ol>
          </div>
        </section>

        <section className="scheduler-section scheduler-decisions">
          <div className="container">
            <div className="scheduler-section-heading scheduler-section-heading--wide"><span>03</span><h2>Design decisions.</h2></div>
            <SchedulerDecisionCarousel decisions={schedulerDecisions} />
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
            <div className="scheduler-prose"><p>This redesign began with an evaluation of the existing interface against established usability principles, followed by implementation in Kotlin and Jetpack Compose. While the changes were informed by UX reasoning rather than formal user research, their effectiveness has not yet been measured.</p><p>Future usability testing would focus on key tasks: finding an upcoming event, creating a new event, searching for an existing entry, and editing its details. Task completion rates, time on task, and points of confusion would help determine whether the redesigned navigation, hierarchy, and interactions improve usability and identify opportunities for further iteration.</p><div className="scheduler-links"><a href="https://mbayers6370.github.io/cs499-eportfolio/" target="_blank" rel="noopener noreferrer">Full technical capstone ↗</a><a href="https://github.com/mbayers6370/scheduler" target="_blank" rel="noopener noreferrer">GitHub repository ↗</a></div></div>
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
        <img className="sonus-hero-topographic" src={sonusTopographicTransparent} alt="" aria-hidden="true" />
        <div className="container">
          <div className="sonus-hero-meta"><span>Independent project</span><span>{project.year}</span></div>
          <div className="sonus-hero-intro">
            <h1>Sonus.</h1>
            <p>A learning experience built around focus, not distraction.</p>
          </div>
          <div className="sonus-hero-spec"><span>Product design / engineering</span><span>React · TypeScript · PostgreSQL</span></div>
        </div>
      </header>

      <main>
        <section className="sonus-section sonus-idea">
          <div className="container">
            <p className="sonus-kicker">01 / The idea</p>
            <h2>Language learning, without the noise.</h2>
            <p className="sonus-lead">Sonus began as an attempt to make language learning feel more deliberate. Structured lessons, meaningful practice, and real-world application take priority over points and streaks.</p>
            <div className="sonus-challenge"><div><p className="sonus-kicker">The challenge</p><h3>Structure over gamification.</h3><p className="sonus-challenge-copy">Build a system that supports retention, progression, and practical language use without overwhelming the learner.</p></div></div>
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
                  <b>Explore Travel Content <em aria-hidden="true">→</em></b>
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
                <b>Continue Learning <em aria-hidden="true">→</em></b>
              </div>
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
      {expandedGuideline && <div className="nela-guideline-modal" role="presentation" onMouseDown={() => setExpandedGuideline(null)}><div className="nela-guideline-modal-content" role="dialog" aria-modal="true" aria-label={`${expandedGuideline.label} guidelines`} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="nela-guideline-modal-close" onClick={() => setExpandedGuideline(null)} aria-label="Close guideline preview"><X aria-hidden="true" /></button><img src={expandedGuideline.src} alt={expandedGuideline.alt} /><p>{expandedGuideline.label}</p></div></div>}
    </div>
  )
}

function TravlrCaseStudy({ project }: { project: Project }) {
  const redesignAreas = [
    ['Navigation', 'Reorganized the experience around recognizable destinations and clear routes between travel packages, accommodations, dining, and supporting information.'],
    ['Hierarchy', 'Replaced crowded layouts and competing visual elements with stronger headings, purposeful spacing, clearer content groupings, and more recognizable calls to action.'],
    ['Cohesion', 'Established a consistent visual language through typography, color, imagery, navigation patterns, and reusable interface treatments across the website.'],
  ]
  const caseStudySections = [
    { id: 'travlr-starting-point', label: 'Starting point' },
    { id: 'travlr-comparison', label: 'Before & after' },
    { id: 'travlr-principles', label: 'Redesign principles' },
    { id: 'travlr-experience', label: 'Across the experience' },
    { id: 'travlr-outcome', label: 'The outcome' },
  ]
  const experiencePages = [
    { id: 'travel', label: 'Travel', description: 'Reorganized destination and package information into more scannable layouts, with clearer headings, imagery, and content groupings.', old: travlrTravelOld, redesign: travlrTravelRedesign },
    { id: 'rooms', label: 'Rooms', description: 'Refined the accommodations experience to make individual stays easier to distinguish and compare through more consistent presentation.', old: travlrRoomsOld, redesign: travlrRoomsRedesign },
    { id: 'dining', label: 'Dining', description: 'Reworked the dining content into a more intentional editorial layout, allowing food imagery and descriptive content to establish hierarchy.', old: travlrDiningOld, redesign: travlrDiningRedesign },
    { id: 'about', label: 'About', description: 'Introduced a clearer structure for the brand story and supporting information, bringing the page into alignment with the rest of the website.', old: travlrAboutOld, redesign: travlrAboutRedesign },
  ]
  const [activeExperience, setActiveExperience] = useState(0)
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false)
  const experienceTriggerRef = useRef<HTMLButtonElement | null>(null)
  const activePage = experiencePages[activeExperience]

  const closeExperienceModal = () => {
    setIsExperienceModalOpen(false)
    window.requestAnimationFrame(() => experienceTriggerRef.current?.focus())
  }

  useEffect(() => {
    if (!isExperienceModalOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeExperienceModal()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isExperienceModalOpen])

  return (
    <div className="project-page travlr-case-study">
      <header className="travlr-hero">
        <div className="container travlr-hero-grid">
          <div className="travlr-hero-copy">
            <p className="travlr-kicker">Travlr Getaways</p>
            <h1>Built to book.<br />Redesigned to <em>navigate.</em></h1>
            <p>A full-stack travel application reimagined through an independent UI/UX redesign, transforming a dated course template into a more cohesive, intuitive, and visually engaging experience.</p>
            <dl className="travlr-hero-meta">
              <div><dt>Role</dt><dd>Full-Stack Developer / UI/UX Designer</dd></div>
              <div><dt>Scope</dt><dd>Visual design, information architecture, navigation, responsive layouts</dd></div>
              <div><dt>Year</dt><dd>2026</dd></div>
            </dl>
          </div>
          <div className="travlr-map" aria-label="Redesign focus areas">
            <div className="travlr-map-head"><span>Case study guide</span><span>05 sections</span></div>
            {caseStudySections.map((section, index) => <a className="travlr-map-stop" href={`#${section.id}`} key={section.id}><b>{String(index + 1).padStart(2, '0')}</b><span>{section.label}</span><ArrowRight aria-hidden="true" /></a>)}
          </div>
        </div>
      </header>

      <main>
        <section className="travlr-section travlr-foundation" id="travlr-starting-point">
          <div className="container travlr-foundation-grid">
            <div><p className="travlr-kicker">01 / Starting point</p><h2>Technical foundation.<br />A new visual direction.</h2></div>
            <div className="travlr-foundation-copy">
              <p>Travlr Getaways began as a full-stack application developed for a computer science course. The assignment focused on building a functional travel website, using a supplied template as the starting point.</p><p>While the original application provided the required technical foundation, its interface felt dated and visually fragmented. Dense content, inconsistent hierarchy, and an overly decorative presentation made it difficult to establish a clear sense of direction.</p><p>The coursework did not require a redesign. I chose to take that on independently, applying UI/UX principles to create a more coherent experience without losing sight of the application's underlying functionality.</p>
              <dl className="travlr-foundation-meta"><div><dt>Foundation</dt><dd>Full-stack course application</dd></div><div><dt>Independent initiative</dt><dd>Complete UI/UX redesign</dd></div></dl>
            </div>
          </div>
        </section>

        <section className="travlr-section travlr-comparison-section" id="travlr-comparison">
          <div className="container">
            <p className="travlr-kicker">02 / Before &amp; after</p>
            <div className="travlr-comparison-heading"><h2>Same foundation.<br />A different experience.</h2><div className="travlr-comparison-copy"><p>The original website relied on a narrow, template-driven layout, competing colors, and dense content blocks. Its navigation and visual presentation offered little distinction between the different parts of the travel experience.</p><p>I replaced that approach with a more intentional visual system: spacious layouts, clearer content hierarchy, restrained colors, consistent navigation, and imagery that gives each destination a stronger sense of place.</p><p>The result is a redesign that changes not just how Travlr looks, but how its content is organized and presented.</p></div></div>
            <div className="travlr-comparison-grid">
              <figure><div><img src={travlrPrebuilt} alt="Travlr Getaways prebuilt course template with crowded navigation and beach imagery" /></div><figcaption><span>Before</span><strong>Original course template</strong></figcaption></figure>
              <ArrowRight className="travlr-comparison-arrow" aria-hidden="true" />
              <figure><div><img src={travlrRedesign} alt="Travlr Getaways redesign with a simplified navigation and mountain-lake hero" /></div><figcaption><span>After</span><strong>Independent UI/UX redesign</strong></figcaption></figure>
            </div>
          </div>
        </section>

        <section className="travlr-section travlr-focus" id="travlr-principles">
          <div className="container">
            <p className="travlr-kicker">03 / Redesign principles</p>
            <div className="travlr-focus-heading"><h2>Every decision needed<br />a clearer purpose.</h2><p>Rather than treating the redesign as a purely visual exercise, I focused on three connected problems: helping visitors find their way, making information easier to understand, and creating consistency across the application.</p></div>
            <div className="travlr-principles">
              {redesignAreas.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="travlr-section travlr-pages" id="travlr-experience">
          <div className="container travlr-pages-grid">
            <div className="travlr-pages-intro"><div><p className="travlr-kicker">04 / Across the experience</p><h2>One system.<br />Four destinations.</h2></div><div><p>A redesign only feels cohesive when its principles carry beyond the homepage. I extended the same approach across Travlr's travel listings, accommodations, dining, and About pages, adapting each layout to its content while maintaining a shared visual identity.</p><p>Visitors encounter different information on each page, but the navigation, typography, spacing, and interface patterns remain familiar.</p></div></div>
            <div className="travlr-experience-viewer">
              <label className="travlr-experience-select">
                <span>Choose a destination</span>
                <select value={activeExperience} onChange={(event) => setActiveExperience(Number(event.target.value))}>
                  {experiencePages.map((page, index) => <option key={page.id} value={index}>{page.label}</option>)}
                </select>
                <ChevronDown aria-hidden="true" />
              </label>
              <div className="travlr-experience-list" role="tablist" aria-label="Travlr redesigned screens">
                {experiencePages.map((page, index) => <button id={`travlr-experience-tab-${page.id}`} key={page.id} type="button" role="tab" aria-selected={activeExperience === index} aria-controls="travlr-experience-panel" className={activeExperience === index ? 'is-active' : ''} onClick={() => setActiveExperience(index)}><strong>{page.label}</strong><ArrowRight aria-hidden="true" /></button>)}
              </div>
              <div className="travlr-experience-preview" id="travlr-experience-panel" role="tabpanel" aria-labelledby={`travlr-experience-tab-${activePage.id}`} aria-live="polite"><button className="travlr-experience-preview-button" ref={experienceTriggerRef} type="button" aria-haspopup="dialog" aria-label={`Expand ${activePage.label} before-and-after comparison`} onClick={() => setIsExperienceModalOpen(true)}>
                <span className="travlr-experience-preview-label"><span>Before / after</span><strong>{activePage.label}</strong><em>Open comparison ↗</em></span>
                <span className="travlr-experience-preview-description">{activePage.description}</span>
                <span className="travlr-experience-preview-grid"><span><img src={activePage.old} alt={`${activePage.label} prebuilt site`} /><span>Prebuilt</span></span><span><img src={activePage.redesign} alt={`${activePage.label} independent redesign`} /><span>Redesign</span></span></span>
              </button></div>
            </div>
          </div>
        </section>

        <section className="travlr-section travlr-outcome" id="travlr-outcome">
          <div className="container"><p className="travlr-kicker">05 / The outcome</p><h2>Beyond the build.</h2><div className="travlr-outcome-copy"><p>Travlr began as a technical assignment, but it became an opportunity to explore what happens when functionality and design receive equal attention.</p><p>I took an existing application and independently reconsidered how people would navigate it, interpret its content, and experience it as a complete product. The redesign introduced a clearer information hierarchy, more consistent interface patterns, and a visual identity that extends across the website.</p><p>The project reinforced an approach I bring to frontend development: building an interface is only part of the work. Understanding how people experience it is what makes the result meaningful.</p></div><p className="travlr-outcome-statement">Good interfaces should do more than function.<br />They should make the next step feel obvious.</p><div className="travlr-actions"><Link to="/#work" className="travlr-back">Back to all projects <ArrowRight aria-hidden="true" /></Link><a href={project.link} target="_blank" rel="noopener noreferrer" className="travlr-back">View GitHub repository <ExternalLink aria-hidden="true" /></a></div></div>
        </section>
      </main>
      {isExperienceModalOpen && <div className="travlr-comparison-modal" role="presentation" onMouseDown={closeExperienceModal}><div className="travlr-comparison-modal-content" role="dialog" aria-modal="true" aria-labelledby="travlr-comparison-modal-title" onMouseDown={(event) => event.stopPropagation()}><button autoFocus type="button" className="travlr-comparison-modal-close" onClick={closeExperienceModal} aria-label="Close comparison"><X aria-hidden="true" /></button><div className="travlr-comparison-modal-heading"><span>Before / after</span><h2 id="travlr-comparison-modal-title">{activePage.label}</h2></div><div className="travlr-comparison-modal-grid"><figure><img src={activePage.old} alt={`${activePage.label} prebuilt site`} /><figcaption>Original template</figcaption></figure><figure><img src={activePage.redesign} alt={`${activePage.label} independent redesign`} /><figcaption>Independent redesign</figcaption></figure></div></div></div>}
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

  if (project.slug === 'travlr') {
    return <TravlrCaseStudy project={project} />
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
          {project.link !== '#' && (
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
