import type { CSSProperties } from 'react'
import StudyLayout, { InspirationStudy, PaletteStudy, TypographyStudy } from '../components/design/StudyLayout'
import BurgerMenus from '../components/design/BurgerMenus'
import { cayucosStudy } from '../content/design-studies'
import '../styles/cayucos.css'

const [orange, midnight, blue, sand] = cayucosStudy.palette
const studyFont = '"Syne", sans-serif'
const studyTheme = {
  backgroundColor: blue.hex,
  '--hero-title-color': orange.hex,
  '--study-description-color': sand.hex,
  '--study-back-color': sand.hex,
  '--study-card-border': `1px solid ${orange.hex}`,
  '--menu-orange': orange.hex,
  '--menu-midnight': midnight.hex,
  '--menu-blue': blue.hex,
  '--menu-sand': sand.hex,
  '--menu-font': 'var(--font-body)',
  '--menu-title-font': studyFont,
  '--menu-title-weight': 700,
  '--type-surface': sand.hex,
  '--type-text': midnight.hex,
  '--type-accent': orange.hex,
  '--type-display': studyFont,
  '--type-display-weight': 700,
} as CSSProperties

const typeSpecimens = [
  { role: 'Display', family: studyFont, style: 'normal', name: 'Syne Bold', text: 'One more stop.', size: 48, leading: 48, weight: 700 },
  { role: 'Emphasis', family: 'var(--font-body)', style: 'normal', name: 'Atkinson Hyperlegible Bold', text: 'Good food. No rush.', size: 22, leading: 30, weight: 700 },
  { role: 'Body & interface', family: 'var(--font-body)', style: 'normal', name: 'Atkinson Hyperlegible Regular', text: 'Pick a burger, take a seat, and stay a little longer.', size: 16, leading: 26 },
] as const

export default function Cayucos() {
  return (
    <StudyLayout study={cayucosStudy} className="cayucos-study" style={studyTheme}>
      <InspirationStudy study={cayucosStudy} title="Downtown after dark">
        I took this walking through downtown Cayucos at night, after a beautiful
        day at the beach and shops. It was nice to see everything lit up like this.
        One of my favorite shots from the vacation.
      </InspirationStudy>
      <PaletteStudy study={cayucosStudy} title="Warm light, deep shadows" label="Burnt orange, midnight, deep blue, and warm ivory color palette">
        Four colors from the scene: burnt orange for a small accent, two deep
        blues for contrast, and warm ivory. A palette that feels equally
        at home on a counter menu or a set of individual menu cards.
      </PaletteStudy>
      <TypographyStudy name="Syne" specimens={typeSpecimens} />
      <article className="curiosity-card interaction-study">
        <h2 className="interface-section-title">From palette to menu</h2>
        <p className="interface-study-note">A full counter menu and a featured burger, using the same four colors. Browse the menu, make it yours, and try a sample order. Names, prices, and orders are examples.</p>
        <div className="interface-variations burger-menu-pair">
          <BurgerMenus />
        </div>
      </article>
    </StudyLayout>
  )
}
