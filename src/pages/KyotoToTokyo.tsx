import type { CSSProperties } from 'react'
import StudyLayout, { InspirationStudy, PaletteStudy, TypographyStudy } from '../components/design/StudyLayout'
import TravelItinerary from '../components/design/TravelItinerary'
import { kyotoTokyoStudy } from '../content/design-studies'
import '../styles/fuji-study.css'

const [blue, sage, rust] = kyotoTokyoStudy.palette
const studyFont = '"Anton", sans-serif'
const studyTheme = {
  backgroundColor: sage.hex,
  '--hero-title-color': 'var(--study-ink)',
  '--study-description-color': 'var(--study-ink)',
  '--study-back-color': 'var(--study-ink)',
  '--study-card-border': '1px solid var(--white)',
  '--font-display': studyFont,
  '--trip-blue': blue.hex,
  '--trip-sage': sage.hex,
  '--trip-rust': rust.hex,
  '--trip-ink': 'var(--study-ink)',
  '--hero-title-weight': 400,
  '--type-surface': blue.hex,
  '--type-text': 'var(--study-ink)',
  '--type-accent': 'var(--study-ink)',
  '--type-display': studyFont,
} as CSSProperties

const typeSpecimens = [
  { role: 'Display', family: studyFont, style: 'normal', name: 'Anton Regular', text: 'A little further.', size: 48, leading: 48 },
  { role: 'Emphasis', family: studyFont, style: 'normal', name: 'Anton Regular', text: 'Leave room for the view.', size: 22, leading: 30 },
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
      <PaletteStudy study={kyotoTokyoStudy} title="Mountain, siding & roof" label="Smoky mountain blue, light sage green, and deep oxide rust color palette">
        A smoky blue sampled from Fuji, a lighter sage adapted from the building’s
        painted siding, and a deep oxide rust adapted from the roof vents. The rust warms the two
        cooler colors without overpowering them.
      </PaletteStudy>
      <TypographyStudy name="Anton" specimens={typeSpecimens} />
      <article className="curiosity-card interaction-study">
        <h2 className="interface-section-title">From palette to itinerary</h2>
        <p className="interface-study-note">Two independent takes on the same trip. Explore the stops on the map, or choose a day and mark stops done in the detailed schedule. This is a sample itinerary; locations and times are illustrative.</p>
        <div className="interface-variations"><TravelItinerary /></div>
      </article>
    </StudyLayout>
  )
}
