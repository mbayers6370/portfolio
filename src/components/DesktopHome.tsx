import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import headshot from '../assets/headshot-cutout.png'
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

const sortedProjects = [...projects].sort((a, b) => Number(a.num) - Number(b.num))
const projectSummaries: Record<string, string> = {
  nelaride: 'Designing cohesive rider and driver experiences across web and mobile.',
  'cs499-eportfolio': 'Simplifying event creation and schedule management through intuitive interactions.',
  sonus: 'Building a language-learning experience focused on clarity and thoughtful progression.',
}
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
            {activeTab === 'work' && (
              <section id="desktop-work" role="tabpanel" aria-labelledby="desktop-tab-work" className="desktop-work">
                <div className="desktop-project-list">
                  {sortedProjects.map((project) => (
                    <Link to={`/work/${project.slug}`} className="desktop-project" data-number={project.num} key={project.slug}>
                      <div><h3>{project.title}</h3><b aria-hidden="true">↗</b></div>
                      <p className="desktop-project-type">{project.type}</p>
                      <p className="desktop-project-description">{projectSummaries[project.slug]}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

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
                <div><h2>{contactContent.heading}</h2></div>
                {sent ? <div className="desktop-form-success"><strong>{contactContent.success.title}</strong><p>{contactContent.success.subtitle}</p></div> : (
                  <form onSubmit={submitForm} name="desktop-contact" data-netlify="true">
                    <input type="hidden" name="form-name" value="desktop-contact" />
                    <label htmlFor="desktop-name">{contactContent.fields.name.label}</label>
                    <input id="desktop-name" name="name" placeholder={contactContent.fields.name.placeholder} value={form.name} onChange={updateForm} required />
                    <label htmlFor="desktop-email">{contactContent.fields.email.label}</label>
                    <input id="desktop-email" type="email" name="email" placeholder={contactContent.fields.email.placeholder} value={form.email} onChange={updateForm} required />
                    <label htmlFor="desktop-message">{contactContent.fields.message.label}</label>
                    <textarea id="desktop-message" name="message" placeholder={contactContent.fields.message.placeholder} value={form.message} onChange={updateForm} required />
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
      </div>
    </main>
  )
}
