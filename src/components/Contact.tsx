import ContactForm from './ContactForm'
import ContactSocials from './ContactSocials'
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
            <ContactSocials />
            <p className="contact-availability">{contactContent.availability}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
