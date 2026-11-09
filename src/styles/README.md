# CSS ownership and cascade

Change the rule that owns a component. Before adding a selector, search `src/styles` for the class and read its base, state, and responsive rules. Replace superseded declarations instead of adding a later block to win the cascade.

## Ownership

| Stylesheet | Responsibility |
| --- | --- |
| `globals.css` | Reset, site tokens, shared text/layout primitives, document motion preference |
| `nav.css`, `footer.css` | Shared navigation and footer; navigation themes and breakpoints stay with navigation |
| `contact-email.css` | Public email link, copy control, and clipboard feedback |
| `contact-form.css` | Shared contact submission feedback and disabled controls; layout remains with the home variant |
| `page-hero.css`, `project-navigation.css` | Shared page heroes and project navigation |
| `home.css` | Mobile/tablet home sections |
| `home-desktop.css` | Desktop shell, project showcases, about, contact |
| `work-entrance.css` | Desktop intro/opening/expanded layout states and their motion preferences |
| `art.css`, `books.css`, `design.css` | Collection pages and shared design-study layouts |
| `cayucos.css` | Cayucos burger-menu examples |
| `fuji-study.css` | Fuji itinerary overview and day schedule |
| `project.css` | Shared case-study scaffold |
| `project-scheduler.css`, `project-sonus.css`, `project-nela.css`, `margin.css` | Individual case-study components and responsive variants |
| `*-brand.css` | Scoped project fonts, brand tokens, and brand primitives |
| `*-preview.css`, `*-work-preview.css` | Interactive specimens and their work-card previews |

Component stylesheets are imported by their component/page. Shared document styles load first. Do not depend on another page's stylesheet to size an icon or style a shared component. Route themes and work-layout states are intentional variants, not new component owners.

## Rules

- Keep one base declaration block per selector and condition. Group selectors with identical declarations when it improves clarity.
- Keep state rules next to their base owner. Keep breakpoint groups together within that stylesheet; combine identical media conditions without changing cascade order between overlapping conditions.
- Prefer a component class or a short child selector. IDs identify navigation targets, not styling hooks. The specificity ceiling is `0,4,2`; stay below it whenever possible.
- Use existing site/brand tokens for shared values. Keep project tokens scoped to elements where they exist; a shared rule must not depend on a token from only one brand.
- Remove dead markup-specific rules when the markup is removed. Verify dynamic class names, route variants, and interaction states before treating a selector as unused.
- Preserve `:focus-visible`, hover/active/disabled styles, responsive `clamp()` values, and reduced-motion behavior. State and media-query overrides are legitimate.
- Avoid `!important`. The existing Margin animation opt-out and reduced-motion descendant resets need it to override descendant animations. Each exception has a local Stylelint comment explaining why; do not disable the rule for an entire file.
- Do not add a late “fixes” section or increase specificity to repair a conflict. Find the competing owner and correct or remove its declaration.

## Verification

Run `npm run check` before merging. It checks CSS formatting, duplicate selectors/declarations, shorthand resets, specificity, IDs, accidental `!important`, cross-file ownership, the guardrails themselves, TypeScript, and the production build. `npm run format:css` formats the CSS and checking scripts.

The ownership check compares selectors under the same at-rule conditions. It permits responsive and state variants. A conflict means the declarations should be merged into the owning stylesheet, rather than ignored or hidden behind a wrapper.

For structural refactors, preserve an original build and compare full-page screenshots at desktop (1440 × 900), tablet (768 × 1024), and mobile (390 × 844). Check the 600/900px layout transitions when affected. Exercise menus, modals, carousels, saved/expanded states, focus, hover, active, disabled controls, and reduced motion. Compare settled content as well as animated transitions; animation frames and image compositing can produce small pixel differences. Correct regressions in the owning rules and repeat the affected comparisons.
