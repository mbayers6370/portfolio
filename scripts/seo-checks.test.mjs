import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const origin = "https://matthewbayers.com";
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
const titles = new Set();
const descriptions = new Set();
const expectedContent = {
  "/": ["Frontend Developer", "Technical skills", "NELARide", "Sonus"],
  "/books": ["The Shape Sequence", "The Shape", "author"],
  "/art": ["Oil &amp; Acrylic Paintings", "Copper &amp; Shadow"],
  "/design": ["Collected Curiosities", "Cayucos", "Kyoto to Tokyo"],
  "/work/sonus": ["Sonus", "Three ways to learn"],
  "/work/cs499-eportfolio": ["Scheduler", "Reflection"],
  "/work/nelaride": ["NELARide", "Design"],
  "/work/margin": ["Margin: The Concept", "My role"],
  "/design/an-overcast-afternoon": [
    "An Overcast Afternoon",
    "From palette to interface",
  ],
  "/design/cayucos": ["Cayucos", "Typography"],
  "/design/kyoto-to-tokyo": ["Kyoto to Tokyo", "Typography"],
};

test("sitemap lists every public page once, using the production origin", () => {
  assert.equal(new Set(urls).size, urls.length);
  assert.deepEqual(
    urls.map((url) => new URL(url).pathname).sort(),
    Object.keys(expectedContent).sort(),
  );
  for (const url of urls) assert.equal(new URL(url).origin, origin);
});

for (const url of urls) {
  const path = new URL(url).pathname;
  test(`${path} has readable HTML, unique metadata, and working assets`, async () => {
    const file = path === "/" ? "dist/index.html" : `dist${path}.html`;
    const html = await readFile(file, "utf8");
    const head = html.split("</head>")[0];
    const body = html.split("<body>")[1];
    assert.match(body, /<h1[\s>]/);
    for (const text of expectedContent[path]) {
      assert.ok(body.includes(text), `Missing rendered content: ${text}`);
    }
    const titleMatches = [...head.matchAll(/<title[^>]*>(.*?)<\/title>/g)];
    assert.equal(titleMatches.length, 1);
    const title = titleMatches[0][1];
    assert.ok(!titles.has(title), `Duplicate title: ${title}`);
    titles.add(title);
    const descriptionMatches = [
      ...head.matchAll(/<meta[^>]+name="description"[^>]+content="([^"]+)"/g),
    ];
    assert.equal(descriptionMatches.length, 1);
    const description = descriptionMatches[0][1];
    assert.ok(!descriptions.has(description), "Duplicate description");
    descriptions.add(description);
    const canonicals = [...head.matchAll(/rel="canonical" href="([^"]+)"/g)];
    assert.equal(canonicals.length, 1);
    assert.equal(canonicals[0][1], url);
    assert.ok(head.includes(`property="og:url" content="${url}"`));
    assert.match(head, /name="twitter:card" content="summary_large_image"/);
    assert.doesNotMatch(head, /noindex/);
    const schema = JSON.parse(
      head.match(/type="application\/ld\+json">(.*?)<\/script>/s)[1],
    );
    assert.equal(schema["@context"], "https://schema.org");
    const person = schema["@graph"].find((item) => item["@type"] === "Person");
    assert.equal(person.jobTitle, "Frontend Developer");
    const webpage = schema["@graph"].find(
      (item) =>
        item.url === url && ["ProfilePage", "WebPage"].includes(item["@type"]),
    );
    assert.ok(webpage, "Structured page URL must match its canonical URL");
    if (path === "/") {
      assert.equal(webpage["@type"], "ProfilePage");
      assert.equal(webpage.mainEntity["@id"], person["@id"]);
    }
    const assets = new Set(
      [
        ...html.matchAll(
          /(?:src|href|content)="(?:https:\/\/matthewbayers\.com)?(\/assets\/[^"?#]+)"/g,
        ),
      ].map((match) => match[1]),
    );
    assert.ok(assets.size > 0);
    for (const asset of assets)
      await access(`dist${decodeURIComponent(asset)}`);
    assert.doesNotMatch(html, /<!--seo:|\/src\/main\.tsx/);
  });
}

test("error and form pages stay out of search, and aliases redirect permanently", async () => {
  const error = await readFile("dist/404.html", "utf8");
  assert.match(error, /<h1>Page not found\.<\/h1>/);
  assert.match(error, /name="robots" content="noindex, follow"/);
  assert.doesNotMatch(error, /rel="canonical"/);
  const contact = await readFile("dist/contact.html", "utf8");
  assert.match(contact, /name="robots" content="noindex"/);
  assert.match(contact, /name="desktop-contact"/);
  const redirects = await readFile("dist/_redirects", "utf8");
  for (const url of urls) {
    const path = new URL(url).pathname;
    if (path !== "/") {
      assert.ok(
        redirects.includes(`${path} ${path}.html 200\n`),
        `Missing static route rewrite: ${path}`,
      );
    }
  }
  assert.match(redirects, /\/design\/after-dark \/design\/cayucos 301/);
  assert.match(
    redirects,
    /\/design\/fuji-in-the-distance \/design\/kyoto-to-tokyo 301/,
  );
  assert.match(redirects, /\/\* \/404\.html 404/);
  const config = await readFile("netlify.toml", "utf8");
  assert.doesNotMatch(config, /status\s*=\s*200/);
  const robots = await readFile("dist/robots.txt", "utf8");
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.match(robots, /Allow: \//);
  await assert.rejects(access("dist/entry-server.mjs"));
});

test("agent text profiles match public candidate facts and link to real evidence", async () => {
  const homepage = await readFile("dist/index.html", "utf8");
  const schema = JSON.parse(
    homepage.match(/type="application\/ld\+json">(.*?)<\/script>/s)[1],
  );
  const person = schema["@graph"].find((item) => item["@type"] === "Person");
  const profile = await readFile("dist/profile.md", "utf8");
  const index = await readFile("dist/llms.txt", "utf8");
  assert.ok(profile.startsWith(`# ${person.name} | ${person.jobTitle}\n`));
  assert.ok(profile.includes(person.description));
  assert.ok(profile.includes(person.email));
  for (const skill of person.knowsAbout) assert.ok(profile.includes(skill));
  for (const link of person.sameAs) {
    assert.ok(profile.includes(link));
    assert.ok(index.includes(link));
  }
  const availability = profile.match(/## Availability\n\n([^\n]+)/)[1];
  assert.ok(homepage.split("<body>")[1].includes(availability));
  assert.ok(index.includes(availability));
  assert.ok(homepage.includes('rel="alternate" type="text/markdown"'));
  assert.ok(homepage.includes(`rel="describedby" href="${origin}/llms.txt"`));
  assert.equal(person.subjectOf.length, 4);

  const texts = [index, profile];
  for (const evidence of person.subjectOf) {
    const path = new URL(evidence.url).pathname;
    const markdownUrl = `${evidence.url}.md`;
    const content = await readFile(`dist${path}.md`, "utf8");
    const html = await readFile(`dist${path}.html`, "utf8");
    assert.match(content, /Role on this project: .+/);
    assert.match(content, /## Overview\n\n\S/);
    assert.ok(content.includes(evidence.url));
    assert.ok(profile.includes(markdownUrl));
    assert.ok(index.includes(markdownUrl));
    assert.ok(html.includes(`type="text/markdown" href="${markdownUrl}"`));
    texts.push(content);
  }
  for (const content of texts) {
    for (const [, target] of content.matchAll(
      /\]\((https:\/\/matthewbayers\.com[^)]+)\)/g,
    )) {
      const path = new URL(target).pathname;
      const file =
        path === "/"
          ? "dist/index.html"
          : path.endsWith(".md") || path.endsWith(".txt")
            ? `dist${path}`
            : `dist${path}.html`;
      await access(file);
    }
  }
});
