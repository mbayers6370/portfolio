import type { CSSProperties } from 'react'
import StudyLayout, { InspirationStudy, PaletteStudy, TypographyStudy } from '../components/design/StudyLayout'
import TravelItinerary from '../components/design/TravelItinerary'
import { kyotoTokyoStudy } from '../content/design-studies'
import '../styles/fuji-study.css'

const [blue, sage, brown] = kyotoTokyoStudy.palette
const studyFont = '"Knewave", cursive'
const studyTheme = {
  '--font-display': studyFont,
  '--trip-blue': blue.hex,
  '--trip-sage': sage.hex,
  '--trip-brown': brown.hex,
  '--trip-ink': brown.hex,
  '--hero-title-weight': 400,
  '--type-surface': sage.hex,
  '--type-text': blue.ink,
  '--type-accent': brown.hex,
  '--type-display': studyFont,
} as CSSProperties

const typeSpecimens = [
  { role: 'Display', family: studyFont, style: 'normal', name: 'Knewave Regular', text: 'A little further.', size: 48, leading: 48 },
  { role: 'Emphasis', family: studyFont, style: 'normal', name: 'Knewave Regular', text: 'Leave room for the view.', size: 22, leading: 30 },
  { role: 'Body & interface', family: 'var(--font-body)', style: 'normal', name: 'Atkinson Hyperlegible Regular', text: 'A few places to go, with time in between.', size: 16, leading: 26 },
] as const

export default function KyotoToTokyo() {
  return (
    <StudyLayout study={kyotoTokyoStudy} className="fuji-study" style={studyTheme}>
      <InspirationStudy study={kyotoTokyoStudy} title="Finally, in person">
        I took this on the Shinkansen from Kyoto to Tokyo, with a dear friend from
        Australia I’d known since I was a kid. It was our first time together in
        person. After all those years, we were finally sharing a train ride, with
        Fuji in the distance.
      </InspirationStudy>
      <PaletteStudy study={kyotoTokyoStudy} title="Mountain, siding & roof" label="Smoky mountain blue, light sage green, and weathered roof brown color palette">
        A smoky blue sampled from Fuji, a lighter sage adapted from the building’s
        painted siding, and a warm brown from the roof. The brown grounds the two
        cooler colors without overpowering them.
      </PaletteStudy>
      <TypographyStudy name="Knewave" specimens={typeSpecimens} />
      <article className="curiosity-card interaction-study">
        <h2 className="interface-section-title">From palette to itinerary</h2>
        <p className="interface-study-note">A two-day overview and a detailed schedule. Choose a day, explore its stops, and mark them done as you go. This is a sample itinerary; times are illustrative.</p>
        <div className="interface-variations"><TravelItinerary /></div>
      </article>
    </StudyLayout>
  )
}
