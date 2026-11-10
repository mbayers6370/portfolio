export type Point = readonly [number, number];
export const width = 600;
export const height = 320;
const views = [
  [138.703, 35.471, 138.817, 35.535],
  [138.77, 35.4, 138.914, 35.514],
] as const;
const latitude = (value: number) =>
  (Math.asinh(Math.tan((value * Math.PI) / 180)) * 180) / Math.PI;

export function projection(dayIndex: number) {
  const [west, south, east, north] = views[dayIndex];
  const top = latitude(north);
  const vertical = top - latitude(south);
  const scale = Math.min(
    (width - 64) / (east - west),
    (height - 64) / vertical,
  );
  const left = (width - (east - west) * scale) / 2;
  const paddingTop = (height - vertical * scale) / 2;
  return ([lon, lat]: Point): Point => [
    left + (lon - west) * scale,
    paddingTop + (top - latitude(lat)) * scale,
  ];
}

// Use separated callout positions, connected back to the actual geographic anchors.
export function markerPositions(
  points: Point[],
  renderedWidth: number,
): Point[] {
  const distance = (52 * width) / renderedWidth;
  const padding = (24 * width) / renderedWidth;
  const columns = Math.max(2, Math.floor((width - padding * 2) / distance) + 1);
  const rows = Math.max(2, Math.floor((height - padding * 2) / distance) + 1);
  const available: Point[] = [];
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      available.push([
        padding + (x * (width - padding * 2)) / (columns - 1),
        padding + (y * (height - padding * 2)) / (rows - 1),
      ]);
    }
  }
  return points.map((point) => {
    available.sort(
      (a, b) =>
        Math.hypot(a[0] - point[0], a[1] - point[1]) -
        Math.hypot(b[0] - point[0], b[1] - point[1]),
    );
    return available.shift()!;
  });
}
