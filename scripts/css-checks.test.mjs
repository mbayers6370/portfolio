import assert from "node:assert/strict";
import test from "node:test";
import stylelint from "stylelint";
import config from "../stylelint.config.mjs";
import { findDuplicateOwners } from "./check-css-ownership.mjs";

const warnings = async (code) =>
  (await stylelint.lint({ code, config })).results[0].warnings;

for (const [name, code, rule] of [
  [
    "duplicate rules",
    ".card { color: red; } .card { color: blue; }",
    "no-duplicate-selectors",
  ],
  [
    "duplicate declarations",
    ".card { color: red; color: blue; }",
    "declaration-block-no-duplicate-properties",
  ],
  [
    "duplicate tokens",
    ".card { --ink: red; --ink: blue; }",
    "declaration-block-no-duplicate-custom-properties",
  ],
  [
    "shorthand resets",
    ".card { margin-top: 1rem; margin: 0; }",
    "declaration-block-no-shorthand-property-overrides",
  ],
  [
    "important patches",
    ".card { color: red !important; }",
    "declaration-no-important",
  ],
  [
    "specificity creep",
    ".page .section .card .body .title { color: red; }",
    "selector-max-specificity",
  ],
  ["ID styling", "#card { color: red; }", "selector-max-id"],
]) {
  test(`CSS lint rejects ${name}`, async () => {
    assert.ok((await warnings(code)).some((warning) => warning.rule === rule));
  });
}

test("responsive, state, and reduced-motion variants remain legitimate", async () => {
  assert.deepEqual(
    await warnings(`
    .card { color: red; }
    .card:hover { color: blue; }
    .card:focus-visible { outline: 2px solid currentColor; }
    .card:disabled { opacity: .5; }
    @media (max-width: 600px) { .card { color: green; } }
    @media (prefers-reduced-motion: reduce) { .card { transition: none; } }
  `),
    [],
  );
});

test("intentional important exceptions need a local explanation", async () => {
  assert.ok(
    (
      await warnings(`
    .preview {
      /* stylelint-disable-next-line declaration-no-important */
      animation: none !important;
    }
  `)
    ).some((warning) => warning.rule === "--report-descriptionless-disables"),
  );
  assert.deepEqual(
    await warnings(`
    .preview * {
      /* stylelint-disable-next-line declaration-no-important -- User motion preference takes priority. */
      animation: none !important;
    }
  `),
    [],
  );
});

test("one selector cannot acquire two stylesheet owners", () => {
  assert.equal(
    findDuplicateOwners([
      { file: "one.css", css: ".card { color: red; }" },
      { file: "two.css", css: ".card { color: blue; }" },
    ]).length,
    1,
  );
});

test("ownership check distinguishes media conditions and selectors containing commas", () => {
  assert.deepEqual(
    findDuplicateOwners([
      { file: "one.css", css: ".card:is(:hover, :focus) { color: red; }" },
      {
        file: "two.css",
        css: "@media (max-width: 600px) { .card:is(:hover, :focus) { color: blue; } }",
      },
    ]),
    [],
  );
});
