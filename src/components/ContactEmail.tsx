import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { contactContent } from '../content/contact'
import '../styles/contact-email.css'

export default function ContactEmail() {
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const reset = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(reset.current), [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactContent.email)
      clearTimeout(reset.current)
      setCopied(true)
      setMessage('Email address copied.')
      reset.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      setMessage('Copy the address manually or select it to open your email app.')
    }
  }

  return (
    <div className="contact-email">
      <div className="contact-email-actions">
        <a href={`mailto:${contactContent.email}`}>{contactContent.email}</a>
        <button type="button" onClick={copyEmail} aria-label="Copy email address" title={copied ? 'Copied' : 'Copy email address'}>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        </button>
      </div>
      <p className="contact-email-status" role="status">{message}</p>
    </div>
  )
}
