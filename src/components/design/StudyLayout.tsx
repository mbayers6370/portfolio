import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronLeft, Copy } from 'lucide-react'
import PageHero from '../PageHero'
import type { DesignStudyMetadata } from '../../content/design-studies'
import '../../styles/design.css'

type StudyLayoutProps = {
  study: DesignStudyMetadata
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function StudyLayout({ study, children, className = '', style }: StudyLayoutProps) {
  return (
    <div className={`curiosities-page ${className}`} style={style}>
      <div className="curiosities-main">
        <PageHero className="curiosities-intro" title={study.title} description={study.description} />
        <div className="container">
          <Link className="design-study-back" to="/design"><ChevronLeft className="link-chevron" aria-hidden="true" />Collected Curiosities</Link>
        </div>
        <section className="container curiosities-grid" aria-label="Design study">{children}</section>
      </div>
    </div>
  )
}

function PaletteSwatch({ hex, ink }: { hex: string; ink: string }) {
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timeout)
  }, [copied])

  async function copyColor() {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(true)
      setMessage(`${hex} copied to clipboard`)
    } catch {
      setMessage(`Select ${hex} to copy it manually`)
    }
  }

  return (
    <div className="palette-swatch" style={{ backgroundColor: hex, color: ink }}>
      <button type="button" className="palette-copy" onClick={copyColor} aria-label={`Copy ${hex}`} title={copied ? 'Copied!' : `Copy ${hex}`}>
        <code>{hex}</code>
        {copied ? <Check key="copied" className="palette-copy-check" aria-hidden="true" /> : <Copy key="copy" aria-hidden="true" />}
      </button>
      <span className="palette-copy-status" role="status">{message}</span>
    </div>
  )
}

export function InspirationStudy({ study, title = 'Everyday inspirations', children }: { study: DesignStudyMetadata; title?: string; children: ReactNode }) {
  return (
    <article className="curiosity-card photo-study">
      <div className="photo-study-image"><img src={study.image} decoding="async" alt={study.imageAlt} /></div>
      <div className="curiosity-card-caption"><h2>{title}</h2><p className="inspiration-note">{children}</p></div>
    </article>
  )
}

export function PaletteStudy({ study, title, label, children }: { study: DesignStudyMetadata; title: string; label: string; children: ReactNode }) {
  return (
    <article className="curiosity-card color-study">
      <div className="color-study-swatches" style={{ '--palette-columns': study.palette.length } as CSSProperties} aria-label={label}>
        {study.palette.map(color => <PaletteSwatch key={color.hex} {...color} />)}
      </div>
      <div className="curiosity-card-caption"><h2>{title}</h2><p className="color-study-note">{children}</p></div>
    </article>
  )
}

type TypeSpecimen = {
  role: string
  family: string
  style: CSSProperties['fontStyle']
  name: string
  text: string
  size: number
  leading: number
  weight?: number
}

export function TypographyStudy({ name, specimens }: { name: string; specimens: readonly TypeSpecimen[] }) {
  return (
    <article className="curiosity-card type-study">
      <header className="type-study-heading">
        <div className="type-study-letter" aria-hidden="true">Ag</div>
        <div><h2>{name}</h2><p>Typography &amp; pairing</p></div>
      </header>
      <div className="type-guidelines">
        {specimens.map(specimen => (
          <div className="type-guideline-row" key={specimen.role}>
            <span className="type-guideline-role">{specimen.role}</span>
            <p className="type-guideline-specimen" style={{ fontFamily: specimen.family, fontStyle: specimen.style, fontWeight: specimen.weight ?? 400, fontSize: specimen.size, lineHeight: `${specimen.leading}px` }}>{specimen.text}</p>
            <small>{specimen.name} · {specimen.size}px / {specimen.leading}px</small>
          </div>
        ))}
      </div>
    </article>
  )
}
