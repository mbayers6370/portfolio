import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import postcss from "postcss";

// Stylelint catches duplicates within one stylesheet. This catches the same
// owner being redefined in another stylesheet under the same conditions.
export function findDuplicateOwners(stylesheets) {
  const owners = new Map();
  const errors = [];
  for (const { file, css } of stylesheets) {
    const root = postcss.parse(css, { from: file });
    root.walkRules((rule) => {
      const conditions = [];
      for (
        let parent = rule.parent;
        parent?.type !== "root";
        parent = parent.parent
      ) {
        if (parent.type === "atrule") {
          if (parent.name.endsWith("keyframes")) return;
          conditions.unshift(`@${parent.name} ${parent.params}`);
        }
      }
      for (const selector of rule.selectors) {
        const key = [...conditions, selector.replace(/\s+/g, " ").trim()].join(
          " | ",
        );
        const previous = owners.get(key);
        if (previous && previous.file !== file) {
          errors.push(
            `${file}:${rule.source.start.line}: ${selector} already belongs to ${previous.file}:${previous.line}`,
          );
        } else {
          owners.set(key, { file, line: rule.source.start.line });
        }
      }
    });
  }
  return errors;
}

async function checkStylesheets() {
  const directory = new URL("../src/styles/", import.meta.url);
  const files = (await readdir(directory))
    .filter((file) => file.endsWith(".css"))
    .sort();
  const stylesheets = await Promise.all(
    files.map(async (file) => ({
      file: `src/styles/${file}`,
      css: await readFile(new URL(file, directory), "utf8"),
    })),
  );
  const errors = findDuplicateOwners(stylesheets);
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`CSS ownership: ${files.length} stylesheets checked.`);
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await checkStylesheets();
}
