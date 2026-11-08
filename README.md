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
