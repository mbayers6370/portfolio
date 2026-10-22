import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plane, TrainFront, Volume2 } from 'lucide-react'
import headshot from '../assets/headshot-cutout.png'
import nelaWorkPreview from '../assets/NELA_Work.png'
import schedulerPreview from '../assets/Scheduler_Hero.png'
import travlrWorkPreview from '../assets/Travlr_Work.png'
import travlrLogos from '../assets/Travlr_Logos.png'
import { aboutContent } from '../content/about'
import { booksArtContent } from '../content/books-art'
import { contactContent } from '../content/contact'
import { heroContent } from '../content/hero'
import projects from '../content/projects'

const tabs = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'beyond', label: 'Beyond Code' },
] as const

type TabId = (typeof tabs)[number]['id']
type ContactForm = { name: string; email: string; message: string }

const nelaRideProject = projects.find((project) => project.slug === 'nelaride')!
const schedulerProject = projects.find((project) => project.slug === 'cs499-eportfolio')!
const sonusProject = projects.find((project) => project.slug === 'sonus')!
const travlrProject = projects.find((project) => project.slug === 'travlr')!
const designSkills = {
  'Experience Design': ['Interaction design', 'Information architecture', 'Wireframing & prototyping'],
  'Evaluation': ['Usability evaluation', 'User flows', 'Design critique'],
  'Visual Systems': ['Visual systems', 'Design systems', 'UI patterns'],
  'Technical Foundation': ['Front-end implementation', 'React & TypeScript', 'HTML / CSS'],
}

export default function DesktopHome() {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedHash = location.hash.slice(1) as TabId
  const activeTab = tabs.some((tab) => tab.id === selectedHash) ? selectedHash : 'work'
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const changeTab = (tab: TabId) => navigate({ pathname: '/', hash: `#${tab}` })
  const updateForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = event.target.name as keyof ContactForm
    setForm((current) => ({ ...current, [key]: event.target.value }))
  }
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <main className="desktop-home">
      <div className="desktop-home-shell">
        <aside className="desktop-profile">
          <div className="desktop-profile-photo"><img src={headshot} alt={heroContent.alt} /></div>
          <div className="desktop-profile-copy">
            <h1>{heroContent.firstName}<br />{heroContent.lastName}</h1>
            <p>UI/UX Designer</p>
          </div>
        </aside>

        {activeTab === 'work' ? (
          <section className="desktop-panel desktop-panel--showcase" aria-label="Selected work">
            <div className="desktop-showcase-projects">
              <Link to={`/work/${nelaRideProject.slug}`} className="desktop-showcase-card desktop-showcase-card--nela">
                <div className="desktop-showcase-card-header">
                  <div>
                    <p>{nelaRideProject.type}</p>
                    <h2>{nelaRideProject.title}</h2>
                  </div>
                  <span aria-hidden="true">↗</span>
                </div>
                <div className="desktop-showcase-visual desktop-showcase-visual--nela">
                  <div className="desktop-nela-preview-placeholder">
                    <img src={nelaWorkPreview} alt="NELARide work preview" />
                  </div>
                  <div className="desktop-nela-preview-copy">
                    <h3>Different platforms. One experience.</h3>
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

              <Link to={`/work/${schedulerProject.slug}`} className="desktop-showcase-card desktop-showcase-card--scheduler">
                <div className="desktop-showcase-card-header">
                  <div>
                    <p>{schedulerProject.type}</p>
                    <h2>{schedulerProject.title}</h2>
                  </div>
                  <span aria-hidden="true">↗</span>
                </div>
                <div className="desktop-showcase-visual desktop-showcase-visual--scheduler">
                  <img src={schedulerPreview} alt="Android Scheduler interface preview" />
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

              <Link to={`/work/${sonusProject.slug}`} className="desktop-showcase-card desktop-showcase-card--sonus">
                <div className="desktop-showcase-card-header">
                  <div>
                    <p>{sonusProject.type}</p>
                    <h2>{sonusProject.title}</h2>
                  </div>
                  <span aria-hidden="true">↗</span>
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
                    <p className="desktop-sonus-kicker">A learning experience built around focus, not distraction.</p>
                    <h3>Language learning,<br />without the noise.</h3>
                    <p>Structured lessons, meaningful practice, and practical language use take priority over points and streaks.</p>
                    <div className="desktop-sonus-paths"><span>Learn</span><span>Practice</span><span>Travel</span></div>
                    <div className="desktop-sonus-swatches" aria-label="Sonus color palette"><span /><span /><span /><span /></div>
                  </div>
                  <div className="desktop-project-spec desktop-sonus-spec">
                    <span>Independent project</span>
                    <span>Product design / engineering</span>
                    <span>React · TypeScript · PostgreSQL</span>
                  </div>
                </div>
              </Link>

              <Link to={`/work/${travlrProject.slug}`} className="desktop-showcase-card desktop-showcase-card--travlr">
                <div className="desktop-showcase-card-header">
                  <div>
                    <p>{travlrProject.type}</p>
                    <h2>{travlrProject.title}</h2>
                  </div>
                  <span aria-hidden="true">↗</span>
                </div>
                <div className="desktop-showcase-visual desktop-showcase-visual--travlr">
                  <div className="desktop-travlr-image-slot">
                    <img className="desktop-travlr-work-preview" src={travlrWorkPreview} alt="Travlr visual system preview" />
                    <img className="desktop-travlr-logos" src={travlrLogos} alt="Travlr logo variations" />
                  </div>
                  <div className="desktop-travlr-preview-copy">
                    <h3>Travel<br />beautifully<br />arranged.</h3>
                    <p>Reimagined a travel website with clearer navigation, stronger visual hierarchy, and a cohesive editorial identity across the experience.</p>
                    <div className="desktop-travlr-preview-labels">
                      <span>01 / Typography</span>
                      <span>02 / Components</span>
                      <span>03 / Visual system</span>
                      <span>04 / Full site redesign</span>
                    </div>
                  </div>
                  <div className="desktop-project-spec">
                    <span>Independent redesign</span>
                    <span>Full-stack developer &amp; UI/UX designer</span>
                    <span>Responsive design · UX design · Development</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        ) : (
        <section className="desktop-panel" aria-label="Portfolio sections">
          <div className="desktop-tabs" role="tablist" aria-label="Portfolio sections">
            <span className="desktop-tab-indicator" style={{ transform: `translateX(${tabs.findIndex((tab) => tab.id === activeTab) * 100}%)` }} />
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`desktop-${tab.id}`}
                id={`desktop-tab-${tab.id}`}
                onClick={() => changeTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="desktop-panel-content">
            {activeTab === 'about' && (
              <section id="desktop-about" role="tabpanel" aria-labelledby="desktop-tab-about" className="desktop-about">
                <div><h2>{aboutContent.title[0]} {aboutContent.title[1]}</h2></div>
                <div className="desktop-about-copy">
                  <p>I’m a UI/UX Designer who turns complex product needs into clear, useful digital experiences. I work across interaction design, visual systems, and front-end implementation, using my engineering background to make thoughtful ideas practical and durable.</p>
                  <div className="desktop-skills">
                    {Object.entries(designSkills).map(([group, items]) => (
                      <div key={group}><h3>{group}</h3><p>{items.slice(0, 3).join(' · ')}</p></div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'contact' && (
              <section id="desktop-contact" role="tabpanel" aria-labelledby="desktop-tab-contact" className="desktop-contact">
                <div><h2>Let&apos;s Work<br />Together</h2></div>
                {sent ? <div className="desktop-form-success"><strong>{contactContent.success.title}</strong><p>{contactContent.success.subtitle}</p></div> : (
                  <form onSubmit={submitForm} name="desktop-contact" data-netlify="true">
                    <input type="hidden" name="form-name" value="desktop-contact" />
                    <div className="desktop-form-field">
                      <label htmlFor="desktop-name">{contactContent.fields.name.label}</label>
                      <input id="desktop-name" name="name" placeholder={contactContent.fields.name.placeholder} value={form.name} onChange={updateForm} required />
                    </div>
                    <div className="desktop-form-field">
                      <label htmlFor="desktop-email">{contactContent.fields.email.label}</label>
                      <input id="desktop-email" type="email" name="email" placeholder={contactContent.fields.email.placeholder} value={form.email} onChange={updateForm} required />
                    </div>
                    <div className="desktop-form-field desktop-form-field--message">
                      <label htmlFor="desktop-message">{contactContent.fields.message.label}</label>
                      <textarea id="desktop-message" name="message" placeholder={contactContent.fields.message.placeholder} value={form.message} onChange={updateForm} required />
                    </div>
                    <button type="submit">{contactContent.submitLabel}</button>
                  </form>
                )}
                <p className="desktop-contact-availability">{contactContent.availability}</p>
              </section>
            )}

            {activeTab === 'beyond' && (
              <section id="desktop-beyond" role="tabpanel" aria-labelledby="desktop-tab-beyond" className="desktop-beyond">
                <div className="desktop-beyond-copy"><h2>{booksArtContent.title}</h2><p>{booksArtContent.description}</p></div>
                <div className="desktop-beyond-links">
                  {booksArtContent.cards.map((card) => <Link key={card.to} to={card.to} className={`desktop-beyond-card desktop-beyond-card--${card.theme}`}><span>{card.number} / {card.label}</span><h3>{card.title}</h3><p>{card.description}</p><b aria-hidden="true">↗</b></Link>)}
                </div>
              </section>
            )}
          </div>
        </section>
        )}
      </div>
    </main>
  )
}
