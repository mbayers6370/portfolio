import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const target = process.argv[2];
if (!target) {
  throw new Error(
    "Run npm run build, then npm run check:deployed:seo -- https://your-domain.com",
  );
}
const origin = new URL(target).origin;
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => new URL(match[1]).pathname,
);
assert.ok(paths.length, "The built sitemap has no public pages.");

const title = (html) => html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1];
const canonical = (html) =>
  html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
const schemas = (html) =>
  [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
    ),
  ].map((match) => JSON.parse(match[1]));

let failed = 0;
async function check(path, verify) {
  try {
    // Inspect the HTTP body directly; JavaScript is never executed.
    const response = await fetch(new URL(path, origin), {
      signal: AbortSignal.timeout(20000),
      headers: { "User-Agent": "Portfolio-SEO-Check/1.0" },
    });
    const html = await response.text();
    await verify(response.status, html);
    console.log(`PASS ${path}`);
  } catch (error) {
    failed++;
    console.error(`FAIL ${path}: ${error.message}`);
  }
}

for (const path of paths) {
  const expected = await readFile(
    path === "/" ? "dist/index.html" : `dist${path}.html`,
    "utf8",
  );
  await check(path, (status, html) => {
    assert.equal(status, 200, `Expected HTTP 200, received ${status}`);
    const data = schemas(html);
    assert.ok(data.length, "JSON-LD missing from the raw HTML response");
    for (const item of data)
      assert.equal(item["@context"], "https://schema.org");
    assert.equal(
      title(html),
      title(expected),
      "Deployed page title differs from the local build",
    );
    assert.equal(
      canonical(html),
      canonical(expected),
      "Deployed canonical URL differs from the local build",
    );
    assert.match(
      html.split("<body>")[1] ?? "",
      /<h1[\s>]/,
      "Page content missing from the raw HTML response",
    );
  });
}

for (const path of [
  "/api-keys",
  "/seo-check-page-does-not-exist",
  "/work/seo-check-project-does-not-exist",
]) {
  await check(path, (status, html) => {
    assert.equal(status, 404, `Expected HTTP 404, received ${status}`);
    assert.match(
      html,
      /name="robots"[^>]*content="[^"]*noindex/,
      "404 response must contain noindex metadata",
    );
    assert.equal(
      canonical(html),
      undefined,
      "404 response must not have a canonical URL",
    );
  });
}

if (failed) {
  console.error(`${failed} deployed SEO checks failed.`);
  process.exitCode = 1;
} else {
  console.log("Deployed HTML metadata and HTTP 404 checks passed.");
}
