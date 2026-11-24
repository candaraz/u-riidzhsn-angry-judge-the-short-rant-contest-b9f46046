// Angry Judge: The Short Rant Contest — one short rant about a small
// everyday annoyance, written to /output/entry.txt.
// Node 22, standard library only, no network.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RANT =
  "I signed up for a free trial and they demanded my card. " +
  "It charged me at 3 a.m. the night before the trial ended, " +
  "like a burglar with a calendar. " +
  "The trial was free. The exit was not.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, RANT, "utf8");

// Read it back and verify: the file must be exactly the rant, UTF-8 text
// of 1 to 400 characters, not only whitespace, with no trailing newline.
const written = readFileSync(outPath, "utf8");
if (written !== RANT) {
  console.error("entry.txt does not match the rant");
  process.exit(1);
}
if (written.length < 1 || written.length > 400 || written.trim().length === 0) {
  console.error("entry.txt fails the 1-400 character gate");
  process.exit(1);
}
console.log(`wrote ${outPath}`);
