import '../styles/footer.css'
import { footerContent } from '../content/footer'
import { useLocation } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { designStudyBarThemes } from '../content/design-studies'

export default function Footer() {
  const { pathname } = useLocation()
  const barTheme = designStudyBarThemes[pathname]
  const theme = barTheme ? {
    '--footer-background': barTheme.background,
    '--footer-text': barTheme.text,
    '--footer-border': `color-mix(in srgb, ${barTheme.text} 18%, transparent)`,
  } as CSSProperties : undefined

  return (
    <footer className="footer" style={theme}>
      <span className="footer-left">{footerContent.left}</span>
      <span className="footer-right">{footerContent.right}</span>
    </footer>
  )
}
