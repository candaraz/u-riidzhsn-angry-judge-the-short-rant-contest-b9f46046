// Angry Judge: The Short Rant Contest — entrypoint.
// Copies this repository's entry.txt into MAKEFUN_OUTPUT_DIR, byte for byte.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(scriptDir, "out");

// Create the output directory if needed, then clear only what is inside it:
// the grader mounts /output read-only, so the directory itself must stay.
mkdirSync(outputDir, { recursive: true });
for (const entryName of readdirSync(outputDir)) {
  rmSync(join(outputDir, entryName), { force: true, recursive: true });
}

// Read the rant from beside this script (never from the caller's cwd) and
// write it out unchanged, so repeated runs produce identical bytes.
const rant = readFileSync(join(scriptDir, "entry.txt"), "utf8");
writeFileSync(join(outputDir, "entry.txt"), rant, "utf8");
