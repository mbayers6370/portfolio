import ContactForm from './ContactForm'
import { contactContent } from '../content/contact'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{contactContent.sectionTitle}</h2>
        </div>

        <h3 className="contact-heading">{contactContent.heading}</h3>

        <div className="contact-inner">
          <ContactForm />

          <div className="contact-info">
            <div className="contact-info-label">{contactContent.socialsLabel}</div>
            <div className="contact-socials">
              <a
                href="https://www.linkedin.com/in/matthew-bayers"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-icon"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://github.com/mbayers6370"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-icon"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
            <p className="contact-availability">{contactContent.availability}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
