import { footerContent } from '../content/footer'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-left">{footerContent.left}</span>
      <span className="footer-right">{footerContent.right}</span>
    </footer>
  )
}
