import { useEffect, useRef, useState, type FormEvent } from 'react'
import { contactContent } from '../content/contact'

export default function useContactSubmission() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'sent' | 'error'>('idle')
  const request = useRef<AbortController | null>(null)

  useEffect(() => () => {
    request.current?.abort()
    request.current = null
  }, [])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (request.current || !form.reportValidity()) return

    const controller = new AbortController()
    request.current = controller
    const body = new URLSearchParams()
    new FormData(form).forEach((value, name) => body.append(name, String(value)))
    setStatus('pending')
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch('/contact.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: controller.signal,
      })
      if (!response.ok) throw new Error('Submission rejected')
      // An unconfigured host can serve the static form definition with HTTP 200
      // for POST. That is not an acknowledgement from the form handler.
      const html = await response.text()
      if (html.includes('portfolio-form-definition') || html.includes('id="root"')) {
        throw new Error('Form handler unavailable')
      }
      if (request.current === controller && !controller.signal.aborted) setStatus('sent')
    } catch {
      if (request.current === controller) setStatus('error')
    } finally {
      window.clearTimeout(timeout)
      if (request.current === controller) request.current = null
    }
  }

  return { status, submit, error: status === 'error' ? contactContent.errorLabel : undefined }
}
