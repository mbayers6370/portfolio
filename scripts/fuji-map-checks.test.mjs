import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { transformWithEsbuild } from "vite";

async function loadSource(path) {
  const { code } = await transformWithEsbuild(
    await readFile(new URL(path, import.meta.url), "utf8"),
    path,
    {
      loader: "ts",
      format: "esm",
      target: "es2022",
    },
  );
  return import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
}
const { projection, markerPositions, width, height } = await loadSource(
  "../src/lib/fuji-route-map.ts",
);
const { itineraryDays } = await loadSource("../src/content/kyoto-itinerary.ts");
const { fujiLakeOutlines } = await loadSource("../src/content/fuji-map.ts");

test("Both itinerary days fit their map view with every stop selectable on narrow screens", () => {
  for (const [index, day] of itineraryDays.entries()) {
    const points = day.stops.map((stop) => projection(index)(stop.coordinate));
    for (const [x, y] of points) {
      assert.ok(Number.isFinite(x) && Number.isFinite(y));
      assert.ok(
        x >= 0 && x <= width && y >= 0 && y <= height,
        "Stop outside the map",
      );
    }
    for (const renderedWidth of [180, 188, 240, 390, 600]) {
      const positions = markerPositions(points, renderedWidth);
      const scale = renderedWidth / width;
      assert.equal(positions.length, day.stops.length);
      for (const [i, [x, y]] of positions.entries()) {
        assert.ok(x * scale >= 22 && (width - x) * scale >= 22);
        assert.ok(y * scale >= 22 && (height - y) * scale >= 22);
        for (const [px, py] of positions.slice(i + 1)) {
          assert.ok(
            Math.abs(px - x) * scale >= 44 || Math.abs(py - y) * scale >= 44,
            "Map stop touch targets overlap",
          );
        }
      }
    }
  }
});
test("Local map outlines contain both lakes in the Fuji region", () => {
  assert.deepEqual(Object.keys(fujiLakeOutlines).sort(), [
    "kawaguchi",
    "yamanaka",
  ]);
  for (const rings of Object.values(fujiLakeOutlines)) {
    assert.ok(rings[0].length > 10, "Lake outline is empty");
    for (const ring of rings) {
      assert.deepEqual(ring[0], ring.at(-1), "Lake boundary is not closed");
      for (const [lon, lat] of ring)
        assert.ok(lon > 138.7 && lon < 138.92 && lat > 35.4 && lat < 35.54);
    }
  }
});
