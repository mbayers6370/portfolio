# My Portfolio Website

This is my personal portfolio site, built with React, TypeScript, and Vite.

## Running it locally

I use Node.js 22 or newer. After cloning the project, I install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite will print a local URL in the terminal (usually `http://localhost:5173`). I open that URL in my browser to view the site. Changes to the source files reload automatically.

## Checking a production build

Before deploying, I run the same verification used in GitHub Actions:

```bash
npm run check
```

The production-ready files are generated in `dist/`. To preview that build locally, I run:

```bash
npm run preview
```

## Main project files

- `src/pages/` contains the top-level pages.
- `src/components/` contains reusable page sections and UI.
- `src/content/` contains the portfolio copy and project data.
- `src/styles/` contains the global styles and page-specific CSS.
- `src/assets/` contains images and other visual assets.

## CSS maintenance

[CSS ownership and conventions](src/styles/README.md) describes stylesheet responsibilities, responsive/state variants, and visual verification. Use `npm run format:css` to format styles. `npm run check` also rejects duplicate declarations, competing stylesheet owners, specificity creep, and unexplained `!important` usage.

## Animation and submission checks

Run `npm run test:browser`, then open `http://localhost:5188/checks/browser.html` in Safari or Chrome. The suite exercises the real components in a resizable iframe: interrupted entrances, breakpoint crossings, navigation reversals, typing cancellation, live motion-preference changes, and 3D front/back hit testing. It reports results as text and takes no screenshots. Visibility and reduced-motion change events are controlled within the tests; viewport changes and CSS compositing run in the browser engine.

Contact tests use local HTTP fixtures for delayed acknowledgement, rejection, disconnection, timeout, retry, and duplicate submission. They send no messages to a real recipient. The fixture endpoint exists only in this check server; the check page is excluded from the production build.

The live contact forms use Netlify Forms. `public/contact.html` supplies the static definitions Netlify needs to discover both React forms. Enable form detection in the site's Netlify settings before deploying. A successful HTTP acknowledgement from the handler is required before showing success; static HTML fallback, rejected requests, network failures, and timeouts show an error and retain the message. Receiving the message in Netlify or by email still needs a deployed end-to-end check.
