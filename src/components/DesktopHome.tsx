import { useState } from 'react'
import ContactForm from './ContactForm'
import ContactSocials from './ContactSocials'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Plane, TrainFront, Volume2 } from 'lucide-react'
import headshot from '../assets/headshot-cutout.png'
import NelaWorkPreview from './NelaWorkPreview'
import schedulerPreview from '../assets/Scheduler_Hero.png'
import MarginWorkPreview from './margin/MarginWorkPreview'
import useWorkEntrance from '../hooks/useWorkEntrance'
import '../styles/margin-brand.css'
import '../styles/nela-brand.css'
import '../styles/scheduler-brand.css'
import '../styles/sonus-brand.css'
import '../styles/home-desktop.css'
import '../styles/work-entrance.css'
import { aboutContent } from '../content/about'
import { contactContent } from '../content/contact'
import { heroContent } from '../content/hero'
import { workContent } from '../content/work'
import projects from '../content/projects'

const nelaRideProject = projects.find((project) => project.slug === 'nelaride')!
const schedulerProject = projects.find((project) => project.slug === 'cs499-eportfolio')!
const sonusProject = projects.find((project) => project.slug === 'sonus')!
const marginProject = projects.find((project) => project.slug === 'margin')!

export default function DesktopHome() {
  const location = useLocation()
  const selectedHash = location.hash.slice(1)
  const { phase: workLayout, shellRef } = useWorkEntrance(selectedHash === 'about' || selectedHash === 'contact')
  const [nelaHovered, setNelaHovered] = useState(false)
  const [nelaFocused, setNelaFocused] = useState(false)

  return (
    <main className="desktop-home" data-section="work" data-work-layout={workLayout}>
      <div className="desktop-home-shell" ref={shellRef}>
        <aside className="desktop-profile">
          <div className="desktop-profile-photo"><img src={headshot} alt={heroContent.alt} /></div>
          <div className="desktop-profile-copy">
            <h1>{heroContent.firstName}<br />{heroContent.lastName}</h1>
            <p>{heroContent.tagline}</p>
          </div>
        </aside>

          <section id="desktop-work" className="desktop-panel desktop-panel--showcase" aria-label="Selected work">
            <div className="desktop-showcase-projects">
              <Link to={`/work/${nelaRideProject.slug}`} className="desktop-showcase-card desktop-showcase-card--nela nela-brand" onPointerEnter={() => setNelaHovered(true)} onPointerLeave={() => setNelaHovered(false)} onFocus={() => setNelaFocused(true)} onBlur={() => setNelaFocused(false)}>
                <div className="desktop-showcase-card-header">
                  <div>
                    <p>{nelaRideProject.type}</p>
                    <h2>{nelaRideProject.title}</h2>
                  </div>
                  <span aria-hidden="true"><ChevronRight className="link-chevron" aria-hidden="true" /></span>
                </div>
                <div className="desktop-showcase-visual desktop-showcase-visual--nela">
                  <div className="desktop-nela-preview-stage"><NelaWorkPreview active={nelaHovered || nelaFocused} /></div>
                  <div className="desktop-nela-preview-copy">
                    <h3>Different platforms.<br />One experience.</h3>
                    <p>Brought NELA Ride&apos;s website into closer alignment with its existing mobile app, unifying typography, color, visual hierarchy, and interaction patterns to create a more recognizable product experience.</p>
                    <div className="desktop-nela-preview-labels">
                      <span>01 / Shared visual language</span>
                      <span>02 / Consistent interactions</span>
                      <span>03 / Connected brand identity</span>
                    </div>
                  </div>
                  <div className="desktop-project-spec">
                    <span>Product design intern</span>
                    <span>Website redesign / design system</span>
                    <span>Branding · UI design · UX audit</span>
                  </div>
                </div>
              </Link>

              <Link to={`/work/${marginProject.slug}`} className="desktop-showcase-card desktop-showcase-card--margin margin-brand" aria-label="Explore Margin, a social feed with an ending">
                <div className="desktop-showcase-card-header">
                  <div>
                    <p>{marginProject.type}</p>
                    <h2>{marginProject.title}</h2>
                  </div>
                  <span aria-hidden="true"><ChevronRight className="link-chevron" aria-hidden="true" /></span>
                </div>
                <div className="desktop-showcase-visual desktop-showcase-visual--margin">
                  <MarginWorkPreview />
                  <div className="desktop-margin-preview-copy">
                    <h3 className="desktop-margin-hook">{workContent.marginCard.hook}</h3>
                    <p>{workContent.marginCard.description}</p>
                    <p className="desktop-margin-craft">{workContent.marginCard.craft}</p>
                  </div>
                  <div className="desktop-project-spec">
                    <span>Independent project</span>
                    <span>Product design / full-stack development</span>
                    <span>Next.js · TypeScript · PostgreSQL</span>
                  </div>
                </div>
              </Link>

              <Link to={`/work/${schedulerProject.slug}`} className="desktop-showcase-card desktop-showcase-card--scheduler scheduler-brand">
                <div className="desktop-showcase-card-header">
                  <div>
                    <p>{schedulerProject.type}</p>
                    <h2>{schedulerProject.title}</h2>
                  </div>
                  <span aria-hidden="true"><ChevronRight className="link-chevron" aria-hidden="true" /></span>
                </div>
                <div className="desktop-showcase-visual desktop-showcase-visual--scheduler">
                  <div className="desktop-scheduler-preview-stage"><div className="desktop-scheduler-preview-crop"><img src={schedulerPreview} alt="Android Scheduler interface preview" /></div></div>
                  <div className="desktop-scheduler-preview-copy">
                    <h3>A clearer path through<br />the day.</h3>
                    <p>Reorganized the home screen to prioritize upcoming events, make search more accessible, and give collections a dedicated space. Simplified secondary controls and introduced persistent bottom navigation to make moving through the app more intuitive.</p>
                    <div className="desktop-scheduler-preview-labels">
                      <span><b>Before</b> · Competing controls and mixed content</span>
                      <span><b>After</b> · Clearer priorities and persistent navigation</span>
                    </div>
                  </div>
                  <div className="desktop-project-spec">
                    <span>Android application</span>
                    <span>UI/UX design &amp; development</span>
                    <span>Kotlin · Jetpack Compose · Android</span>
                  </div>
                </div>
              </Link>

              <Link to={`/work/${sonusProject.slug}`} className="desktop-showcase-card desktop-showcase-card--sonus sonus-brand">
                <div className="desktop-showcase-card-header">
                  <div>
                    <p>{sonusProject.type}</p>
                    <h2>{sonusProject.title}</h2>
                  </div>
                  <span aria-hidden="true"><ChevronRight className="link-chevron" aria-hidden="true" /></span>
                </div>
                <div className="desktop-showcase-visual desktop-showcase-visual--sonus">
                  <div className="desktop-sonus-preview-stage">
                    <div className="desktop-sonus-ui-head"><span>Learn / Practice / Travel</span></div>
                    <div className="desktop-sonus-ui-panels">
                      <div className="desktop-sonus-unit">
                        <span>Unit 1</span><strong>四</strong><small>よん · yon</small><div><span>Listen <Volume2 aria-hidden="true" /></span></div>
                      </div>
                      <div className="desktop-sonus-travel">
                        <span>Travel Sprint</span><Plane aria-hidden="true" /><strong>Leaving Soon?</strong><div><span><Plane aria-hidden="true" /></span><span><TrainFront aria-hidden="true" /></span></div>
                      </div>
                    </div>
                  </div>
                  <div className="desktop-sonus-preview-copy">
                    <h3>Language learning,<br />without the noise.</h3>
                    <p>Structured lessons, meaningful practice, and practical language use take priority over points and streaks.</p>
                    <div className="desktop-sonus-paths"><span>Learn</span><span>Practice</span><span>Travel</span></div>
                    <div className="desktop-sonus-swatches" aria-label="Sonus color palette"><span /><span /><span /><span /></div>
                  </div>
                  <div className="desktop-project-spec desktop-sonus-spec">
                    <span>Independent project</span>
                    <span>{sonusProject.role}</span>
                    <span>React · TypeScript · PostgreSQL</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
      </div>
      {workLayout === 'expanded' && (
        <>
          <div className="desktop-home-after-work">
            <section id="desktop-about" className="desktop-panel desktop-home-about" aria-labelledby="desktop-about-title">
              <div className="desktop-about">
                <div><h2 id="desktop-about-title">{aboutContent.title[0]}<br />{aboutContent.title[1]}</h2></div>
                <div className="desktop-about-copy">
                  {aboutContent.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <div className="desktop-skills">
                    {Object.entries(aboutContent.skills).map(([group, items]) => (
                      <div key={group}><h3>{group}</h3><p>{items.join(' · ')}</p></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section id="desktop-contact" className="desktop-home-contact" aria-labelledby="desktop-contact-title">
            <div className="desktop-contact">
              <div className="desktop-home-contact-intro">
                <h2 id="desktop-contact-title">{contactContent.heading}</h2>
                <p>{contactContent.availability}</p>
                <ContactSocials desktop />
              </div>
              <ContactForm desktop />
            </div>
          </section>
        </>
      )}
    </main>
  )
}
