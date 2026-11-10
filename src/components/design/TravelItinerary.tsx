import { useId, useRef, useState } from "react";
import { Check } from "lucide-react";
import { itineraryDays as days } from "../../content/kyoto-itinerary";
import FujiRouteMap from "./FujiRouteMap";

function TripOverview() {
  const [selected, setSelected] = useState(0);
  const [activeStops, setActiveStops] = useState([0, 0]);
  const stopsId = useId();
  const active = activeStops[selected];

  function chooseStop(index: number) {
    setActiveStops((current) =>
      current.map((value, dayIndex) => (dayIndex === selected ? index : value)),
    );
  }

  return (
    <section
      className="fuji-trip-overview"
      aria-label="Fuji Five Lakes route map"
    >
      <FujiRouteMap
        id={stopsId}
        dayIndex={selected}
        activeStop={active}
        onSelect={chooseStop}
        onDayChange={setSelected}
      />
    </section>
  );
}

function DaySchedule() {
  const [active, chooseStop] = useState(1);
  const [done, setDone] = useState<number[]>([0]);
  const scheduleId = useId();
  const markDoneCheckbox = useRef<HTMLInputElement>(null);
  const resetButton = useRef<HTMLButtonElement>(null);
  const day = days[0];
  const allDone = done.length === day.stops.length;
  const nextStop =
    day.stops.find((_, index) => index > active && !done.includes(index)) ??
    day.stops.find((_, index) => index !== active && !done.includes(index));

  function markDone() {
    const nextDone = [...new Set([...done, active])];
    setDone(nextDone);
    const next = day.stops.findIndex(
      (_, index) => index > active && !nextDone.includes(index),
    );
    const remaining =
      next === -1
        ? day.stops.findIndex((_, index) => !nextDone.includes(index))
        : next;
    if (remaining !== -1) chooseStop(remaining);
    requestAnimationFrame(() =>
      (remaining === -1 ? resetButton : markDoneCheckbox).current?.focus({
        preventScroll: true,
      }),
    );
  }

  function resetDay() {
    setDone([]);
    chooseStop(0);
    requestAnimationFrame(() =>
      markDoneCheckbox.current?.focus({ preventScroll: true }),
    );
  }

  return (
    <section className="fuji-day-schedule" aria-labelledby={scheduleId}>
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
          const isDone = done.includes(index);
          const isActive = active === index && !isDone;
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
                <time dateTime={stop.time.padStart(5, "0")}>{stop.time}</time>
                <span className="fuji-stop-copy">
                  <span className="fuji-stop-title">{stop.title}</span>
                  {isActive && (
                    <span className="fuji-stop-detail">{stop.note}</span>
                  )}
                </span>
                {isDone && <Check aria-label="Completed" />}
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
                </>
              )}
            </li>
          );
        })}
      </ol>
      <footer className="fuji-day-footer">
        <p className="fuji-next-up" role="status">
          {allDone ? (
            "Day complete."
          ) : nextStop ? (
            <>
              Next up: <strong>{nextStop.title}</strong>
            </>
          ) : (
            <>
              Last stop: <strong>{day.stops[active].title}</strong>
            </>
          )}
        </p>
        {done.length > 0 && (
          <button type="button" ref={resetButton} onClick={resetDay}>
            Reset
          </button>
        )}
      </footer>
    </section>
  );
}

export default function TravelItinerary() {
  return (
    <>
      <TripOverview />
      <DaySchedule />
    </>
  );
}
