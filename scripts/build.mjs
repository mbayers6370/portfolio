import { build } from "vite";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

// Use Vite for both bundles so server-rendered asset URLs match client assets.
const serverDirectory = resolve(".vite/prerender");
await build();
try {
  await build({
    build: {
      ssr: "src/entry-server.tsx",
      outDir: serverDirectory,
      copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: "entry-server.mjs" } },
    },
  });
  const { render, renderAgentFiles, seoPages, routeAliases, siteOrigin } =
    await import(
      pathToFileURL(resolve(serverDirectory, "entry-server.mjs")).href
    );
  const template = await readFile("dist/index.html", "utf8");
  if (
    !template.includes("<!--seo:start-->") ||
    !template.includes('<div id="root"></div>')
  ) {
    throw new Error("The HTML template is missing its SEO or content marker.");
  }

  const writePage = async (path, destination) => {
    const { head, body } = render(path);
    const html = template
      .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => head)
      .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
    await mkdir(resolve(destination, ".."), { recursive: true });
    await writeFile(destination, html);
  };
  for (const page of seoPages) {
    // Explicit rewrites below serve these files at extensionless paths.
    await writePage(
      page.path,
      page.path === "/" ? "dist/index.html" : `dist${page.path}.html`,
    );
  }
  await writePage("/404", "dist/404.html");
  for (const [path, content] of Object.entries(renderAgentFiles())) {
    const destination = resolve("dist", path);
    await mkdir(resolve(destination, ".."), { recursive: true });
    await writeFile(destination, content);
  }

  const locations = seoPages.map(
    ({ path }) => `  <url><loc>${new URL(path, siteOrigin).href}</loc></url>`,
  );
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.join("\n")}\n</urlset>\n`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`,
  );
  const redirects = Object.entries(routeAliases).map(
    ([from, to]) => `${from} ${to} 301`,
  );
  redirects.push(
    ...seoPages
      .filter(({ path }) => path !== "/")
      .map(({ path }) => `${path} ${path}.html 200`),
  );
  redirects.push("/* /404.html 404");
  await writeFile("dist/_redirects", `${redirects.join("\n")}\n`);
  console.log(`Prerendered ${seoPages.length} pages and a 404 page.`);
} finally {
  await rm(serverDirectory, { recursive: true, force: true });
}
