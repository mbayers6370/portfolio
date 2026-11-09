import { useId, useRef, useState, type CSSProperties } from 'react'
import { Check, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

type Stop = {
  time: string
  title: string
  duration: string
  note: string
}
const days: { label: string; weekday: string; title: string; stops: Stop[] }[] = [
  {
    label: 'Lakes',
    weekday: 'Saturday',
    title: 'The lake & the mountain',
    stops: [
      {
        time: '7:40',
        title: 'Early train in',
        duration: '1 h 50',
        note: 'Arrive at Kawaguchiko Station and take the morning slowly.',
      },
      {
        time: '9:30',
        title: 'Lakeside walk',
        duration: '1 h',
        note: 'An hour along the north shore while the clouds are still low. The best view of the day.',
      },
      {
        time: '12:15',
        title: 'Noodles for lunch',
        duration: '45 min',
        note: 'Find a warm bowl of hōtō and a little time away from the lake.',
      },
      {
        time: '15:00',
        title: 'Pagoda steps',
        duration: '1 h 30',
        note: 'Take the steps at your own pace, with room to stop for the view.',
      },
      {
        time: '18:30',
        title: 'Hot spring, early night',
        duration: 'Evening',
        note: 'A quiet end to the day. Leave the rest of the evening open.',
      },
    ],
  },
  {
    label: 'Old town',
    weekday: 'Sunday',
    title: 'Streets worth slowing for',
    stops: [
      {
        time: '8:30',
        title: 'Coffee in Yoshida',
        duration: '45 min',
        note: 'Start with coffee and breakfast before the streets get busy.',
      },
      {
        time: '10:00',
        title: 'Honcho Street',
        duration: '1 h',
        note: 'Walk the old shopping street, with Fuji at the end of the road.',
      },
      {
        time: '11:45',
        title: 'Under the cedar trees',
        duration: '1 h',
        note: 'A quieter walk along the approach to the shrine.',
      },
      {
        time: '14:00',
        title: 'One more lake',
        duration: '1 h 30',
        note: 'Make a last stop at Yamanaka and look back toward the mountain.',
      },
      {
        time: '16:30',
        title: 'Back before dark',
        duration: 'Evening',
        note: 'Pick up something for the ride and head back with a few new photographs.',
      },
    ],
  },
]

export default function TravelItinerary() {
  const [selected, setSelected] = useState(0)
  const [activeStops, setActiveStops] = useState([1, 0])
  const [completed, setCompleted] = useState<number[][]>([[0], []])
  const overviewId = useId()
  const scheduleId = useId()
  const detailId = useId()
  const overview = useRef<HTMLElement>(null)
  const detail = useRef<HTMLElement>(null)
  const markDoneCheckbox = useRef<HTMLInputElement>(null)
  const resetButton = useRef<HTMLButtonElement>(null)
  const day = days[selected]
  const active = activeStops[selected]
  const done = completed[selected]
  const allDone = done.length === day.stops.length
  const nextStop =
    day.stops.find((_, index) => index > active && !done.includes(index)) ??
    day.stops.find((_, index) => index !== active && !done.includes(index))

  function chooseStop(index: number) {
    setActiveStops((current) =>
      current.map((value, dayIndex) => (dayIndex === selected ? index : value))
    )
  }

  function markDone() {
    const nextDone = [...new Set([...done, active])]
    setCompleted((current) =>
      current.map((value, index) => (index === selected ? nextDone : value))
    )
    const next = day.stops.findIndex((_, index) => index > active && !nextDone.includes(index))
    const remaining =
      next === -1 ? day.stops.findIndex((_, index) => !nextDone.includes(index)) : next
    if (remaining !== -1) chooseStop(remaining)
    requestAnimationFrame(() =>
      (remaining === -1 ? resetButton : markDoneCheckbox).current?.focus({ preventScroll: true })
    )
  }

  function resetDay() {
    setCompleted((current) => current.map((value, index) => (index === selected ? [] : value)))
    chooseStop(0)
    requestAnimationFrame(() => markDoneCheckbox.current?.focus({ preventScroll: true }))
  }

  function openDay() {
    detail.current?.focus({ preventScroll: true })
    detail.current?.scrollIntoView({ block: 'nearest' })
  }

  return (
    <>
      <section
        className="fuji-trip-overview"
        ref={overview}
        tabIndex={-1}
        aria-labelledby={overviewId}
      >
        <header className="fuji-trip-meta">
          <span>
            <MapPin aria-hidden="true" />
            Fuji Five Lakes
          </span>
        </header>
        <h3 id={overviewId}>Two days. one view</h3>
        <dl className="fuji-trip-stats">
          <div>
            <dt>stops</dt>
            <dd>10</dd>
          </div>
          <div>
            <dt>lakes</dt>
            <dd>2</dd>
          </div>
          <div>
            <dt>mountain</dt>
            <dd>1</dd>
          </div>
        </dl>
        <div
          className="fuji-trip-days"
          role="group"
          aria-label="Choose a day"
          style={{ '--trip-day-index': selected } as CSSProperties}
        >
          {days.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={selected === index}
              aria-controls={detailId}
              onClick={() => setSelected(index)}
            >
              Day {index + 1} · {item.label}
            </button>
          ))}
        </div>
        <ol className="fuji-trip-stops" aria-label={`${day.weekday} overview`}>
          {day.stops.map((stop, index) => (
            <li key={stop.title}>
              <button
                type="button"
                aria-pressed={active === index}
                onClick={() => chooseStop(index)}
              >
                <time dateTime={stop.time.padStart(5, '0')}>{stop.time}</time>
                <span>{stop.title}</span>
                <span className="fuji-trip-stop-end">
                  <span className="fuji-stop-duration">{stop.duration}</span>
                  <ChevronRight className="fuji-trip-stop-chevron" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ol>
        <button className="fuji-open-day" type="button" onClick={openDay}>
          Open day {selected + 1}
          <ChevronRight aria-hidden="true" />
        </button>
      </section>
      <section
        className="fuji-day-schedule"
        id={detailId}
        ref={detail}
        tabIndex={-1}
        aria-labelledby={scheduleId}
      >
        <header className="fuji-day-nav">
          <button
            type="button"
            onClick={() => {
              overview.current?.focus({ preventScroll: true })
              overview.current?.scrollIntoView({ block: 'nearest' })
            }}
          >
            <ChevronLeft aria-hidden="true" />
            Overview
          </button>
          <button
            type="button"
            onClick={() => setSelected((current) => (current + 1) % days.length)}
          >
            Day {selected === 0 ? 2 : 1}
            <ChevronRight aria-hidden="true" />
          </button>
        </header>
        <h3 id={scheduleId} aria-live="polite">
          {day.title}
        </h3>
        <div
          className="fuji-day-progress"
          role="progressbar"
          aria-label="Stops completed"
          aria-valuemin={0}
          aria-valuemax={day.stops.length}
          aria-valuenow={done.length}
        >
          {day.stops.map((stop, index) => (
            <span
              key={stop.title}
              aria-hidden="true"
              data-complete={done.includes(index) || undefined}
              data-current={(!allDone && active === index) || undefined}
            />
          ))}
        </div>
        <ol className="fuji-day-stops">
          {day.stops.map((stop, index) => {
            const isDone = done.includes(index)
            const isActive = active === index && !isDone
            return (
              <li
                key={stop.title}
                data-complete={isDone || undefined}
                data-current={isActive || undefined}
              >
                <button
                  className="fuji-stop-select"
                  type="button"
                  aria-expanded={isActive}
                  disabled={isDone}
                  onClick={() => chooseStop(index)}
                >
                  <time dateTime={stop.time.padStart(5, '0')}>{stop.time}</time>
                  <span>{stop.title}</span>
                  {isDone ? (
                    <Check aria-label="Completed" />
                  ) : (
                    !isActive && <span className="fuji-stop-duration">{stop.duration}</span>
                  )}
                </button>
                {isActive && (
                  <>
                    <label className="fuji-stop-complete" title="Mark done">
                      <input
                        type="checkbox"
                        ref={markDoneCheckbox}
                        checked={isDone}
                        aria-label={`Mark ${stop.title} done`}
                        onChange={markDone}
                      />
                      <Check aria-hidden="true" />
                    </label>
                    <div className="fuji-stop-detail">
                      <p>{stop.note}</p>
                    </div>
                  </>
                )}
              </li>
            )
          })}
        </ol>
        <footer className="fuji-day-footer">
          <p className="fuji-next-up" role="status">
            {allDone ? (
              'Day complete.'
            ) : nextStop ? (
              <>
                Next up: <strong>{nextStop.title}</strong> · {nextStop.time}
              </>
            ) : (
              <>
                Last stop: <strong>{day.stops[active].title}</strong>
              </>
            )}
          </p>
          {done.length > 0 && (
            <button type="button" ref={resetButton} onClick={resetDay}>
              Reset day
            </button>
          )}
        </footer>
      </section>
    </>
  )
}
