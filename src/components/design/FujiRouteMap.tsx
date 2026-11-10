import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fujiLakeOutlines } from "../../content/fuji-map";
import { itineraryDays } from "../../content/kyoto-itinerary";
import {
  width,
  height,
  projection,
  markerPositions,
  type Point,
} from "../../lib/fuji-route-map";

export default function FujiRouteMap({
  id,
  dayIndex,
  activeStop,
  onSelect,
  onDayChange,
}: {
  id: string;
  dayIndex: number;
  activeStop: number;
  onSelect: (index: number) => void;
  onDayChange: (index: number) => void;
}) {
  const canvas = useRef<HTMLDivElement>(null);
  const [renderedWidth, setRenderedWidth] = useState(400);
  useEffect(() => {
    const node = canvas.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) =>
      setRenderedWidth(Math.max(180, entry.contentRect.width)),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const day = itineraryDays[dayIndex];
  const stop = day.stops[activeStop];
  const project = projection(dayIndex);
  const points = day.stops.map((item) => project(item.coordinate));
  const markers = markerPositions(points, renderedWidth);
  const visibleStops = day.stops.slice(0, activeStop + 1);
  const visiblePoints = points.slice(0, activeStop + 1);
  const lakeLabels = [
    { name: "Lake Kawaguchi", coordinate: [138.7445, 35.513] as Point },
    { name: "Lake Yamanaka", coordinate: [138.876, 35.419] as Point },
  ];
  const path = (ring: readonly Point[]) =>
    ring
      .map(
        (point, index) =>
          `${index ? "L" : "M"}${project(point)
            .map((value) => value.toFixed(2))
            .join(",")}`,
      )
      .join(" ") + " Z";

  return (
    <div className="fuji-map-overview" id={id}>
      <figure className="fuji-route-map">
        <div
          className="fuji-trip-days"
          role="group"
          aria-label="Choose an overview day"
        >
          {itineraryDays.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={dayIndex === index}
              aria-controls={id}
              onClick={() => onDayChange(index)}
            >
              Day {index + 1}
            </button>
          ))}
        </div>
        <span className="fuji-map-region">Fuji Five Lakes</span>
        <div
          className="fuji-map-canvas"
          ref={canvas}
          role="group"
          aria-label={`${day.weekday} route map`}
        >
          <svg
            className="fuji-map-artwork"
            viewBox={`0 0 ${width} ${height}`}
            aria-hidden="true"
          >
            {Object.entries(fujiLakeOutlines).map(([name, rings]) => (
              <path
                className="fuji-map-water"
                key={name}
                d={rings.map(path).join(" ")}
                fillRule="evenodd"
              />
            ))}
            {visiblePoints.length > 1 && (
              <polyline
                className="fuji-map-route"
                points={visiblePoints.map((point) => point.join(",")).join(" ")}
              />
            )}
            {lakeLabels.map((label) => {
              const [x, y] = project(label.coordinate);
              return x > 30 && x < width - 30 && y > 20 && y < height - 20 ? (
                <text
                  className="fuji-map-label"
                  key={label.name}
                  x={x}
                  y={y}
                  style={{ fontSize: `${(12 * width) / renderedWidth}px` }}
                >
                  {label.name}
                </text>
              ) : null;
            })}
            {visiblePoints.map(([x, y], index) => (
              <g key={index}>
                <line
                  className="fuji-map-leader"
                  x1={x}
                  y1={y}
                  x2={markers[index][0]}
                  y2={markers[index][1]}
                />
                <circle className="fuji-map-anchor" cx={x} cy={y} r="3" />
              </g>
            ))}
          </svg>
          {visibleStops.map((item, index) => (
            <button
              className="fuji-map-marker"
              key={item.title}
              type="button"
              aria-label={`Stop ${index + 1}: ${item.title}`}
              aria-pressed={activeStop === index}
              aria-controls={`${id}-detail`}
              style={{
                left: `${(markers[index][0] / width) * 100}%`,
                top: `${(markers[index][1] / height) * 100}%`,
              }}
              onClick={() => onSelect(index)}
            >
              <span>{index + 1}</span>
            </button>
          ))}
        </div>
        <figcaption className="fuji-map-credit">
          <span>Sample route · approximate stops</span>
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
          >
            © OpenStreetMap
          </a>
        </figcaption>
      </figure>
      <div className="fuji-map-navigation" aria-label="Map stops">
        <button
          type="button"
          aria-label="Previous map stop"
          disabled={activeStop === 0}
          onClick={() => onSelect(activeStop - 1)}
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <div
          className="fuji-map-stop"
          id={`${id}-detail`}
          role="status"
          aria-label={`Stop ${activeStop + 1} of ${day.stops.length}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="fuji-map-stop-heading">
            <h4>{stop.title}</h4>
            <time dateTime={stop.time.padStart(5, "0")}>{stop.time}</time>
          </div>
          <p>{stop.note}</p>
        </div>
        <button
          type="button"
          aria-label="Next map stop"
          disabled={activeStop === day.stops.length - 1}
          onClick={() => onSelect(activeStop + 1)}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
