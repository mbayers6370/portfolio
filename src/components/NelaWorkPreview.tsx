import { useEffect, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import '../styles/nela-work-preview.css'

const sampleAddress = '1234 Address Dr'

/** Decorative interface excerpt inside the work card's project link. */
export default function NelaWorkPreview({ active }: { active: boolean }) {
  const [typedAddress, setTypedAddress] = useState('')

  useEffect(() => {
    setTypedAddress('')
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedAddress(sampleAddress)
      return
    }

    let nextCharacter = 0
    let timer: ReturnType<typeof setTimeout>
    const typeNext = () => {
      nextCharacter += 1
      setTypedAddress(sampleAddress.slice(0, nextCharacter))
      if (nextCharacter < sampleAddress.length) timer = setTimeout(typeNext, 85)
    }
    timer = setTimeout(typeNext, 250)
    return () => clearTimeout(timer)
  }, [active])

  return (
    <div className="nela-work-preview" aria-hidden="true">
      <div className="nela-work-rides">
        <div className="nela-work-period"><span /></div>
        <p className="nela-work-ride-total">All Rides: <em>n</em> Rides</p>
        <p className="nela-work-chart-caption">Rides By Month (Last <em>n</em> Months)</p>
        <div className="nela-work-chart">
          <div className="nela-work-chart-bars">{Array.from({ length: 6 }, (_, index) => <span key={index} />)}</div>
          <div className="nela-work-chart-grid"><span /><span /><span /></div>
        </div>
      </div>
      <div className="nela-work-swatches"><span /><span /><span /></div>
      <div className="nela-work-search">
        <Search />
        <div className="nela-work-destination">
          <strong>Where to?</strong>
          <span className="nela-work-address" data-typing={active && typedAddress.length < sampleAddress.length ? 'true' : undefined}>
            {active ? typedAddress || '\u00a0' : sampleAddress}
          </span>
        </div>
        <span className="nela-work-time"><svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="currentColor" /><path d="M8 4v4l2 1.5" fill="none" stroke="#fafafa" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg> Now <ChevronDown /></span>
      </div>
    </div>
  )
}
