# My Portfolio Website

This is my personal portfolio site, built with React, TypeScript, and Vite.

## Running it locally

I use Node.js 18 or newer. After cloning the project, I install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite will print a local URL in the terminal (usually `http://localhost:5173`). I open that URL in my browser to view the site. Changes to the source files reload automatically.

## Checking a production build

Before deploying, I make sure the project type-checks and builds successfully:

```bash
npm run typecheck
npm run build
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
