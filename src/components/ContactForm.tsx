import { useState, type ChangeEvent } from 'react'
import { contactContent } from '../content/contact'
import useContactSubmission from '../hooks/useContactSubmission'
import '../styles/contact-form.css'

export default function ContactForm({ desktop = false }: { desktop?: boolean }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const { status, submit, error } = useContactSubmission()
  const prefix = desktop ? 'desktop-' : ''
  const formName = desktop ? 'desktop-contact' : 'contact'
  const pending = status === 'pending'
  const change = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  if (status === 'sent') {
    return desktop
      ? <div className="desktop-form-success" role="status"><strong>{contactContent.success.title}</strong><p>{contactContent.success.subtitle}</p></div>
      : <div className="form-success" role="status"><p className="form-success-title">{contactContent.success.title}</p><p className="form-success-sub">{contactContent.success.subtitle}</p></div>
  }

  return (
    <form onSubmit={submit} name={formName} method="POST" action="/contact.html" data-netlify="true" aria-busy={pending} aria-describedby={error ? `${prefix}contact-error` : undefined}>
      <input type="hidden" name="form-name" value={formName} />
      {(['name', 'email', 'message'] as const).map(field => (
        <div className={desktop ? `desktop-form-field${field === 'message' ? ' desktop-form-field--message' : ''}` : 'form-group'} key={field}>
          <label htmlFor={`${prefix}${field}`}>{contactContent.fields[field].label}</label>
          {field === 'message'
            ? <textarea id={`${prefix}${field}`} name={field} placeholder={contactContent.fields[field].placeholder} value={form[field]} onChange={change} required readOnly={pending} />
            : <input id={`${prefix}${field}`} type={field === 'email' ? 'email' : 'text'} name={field} placeholder={contactContent.fields[field].placeholder} value={form[field]} onChange={change} required readOnly={pending} />}
        </div>
      ))}
      {error && <p className="contact-form-error" id={`${prefix}contact-error`} role="alert">{error}</p>}
      <button type="submit" className={desktop ? undefined : 'form-submit'} disabled={pending}>
        {pending ? contactContent.pendingLabel : contactContent.submitLabel}
      </button>
    </form>
  )
}
