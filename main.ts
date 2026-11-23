// How Many Tabs Do You Have Open?
// Entry: a single honest number — the count of open browser tabs.
//
// The number: 137.
// Why 137: it is the count of someone who opens a tab for every
// half-finished thing — a recipe, a docs page, three half-read
// articles, a dozen "I'll get back to this" links — and never
// closes any of them. High enough to surprise, low enough to be
// a real person's real browser right now, and odd enough that
// nobody would pick it as a round-number guess. It is not a
// house-text cliché (0, 1, 5, 10, 100) and not a shock figure:
// just the tab bar of a person who treats "close tab" as a
// rumor they have heard of but never tried.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TAB_COUNT = "137";

// Guard first: the entry must be digits only, 1-5 characters.
// Validate before writing anything, so a bad value can never
// produce a file.
if (!/^\d{1,5}$/.test(TAB_COUNT)) {
  throw new Error("entry must be 1-5 digits, got: " + JSON.stringify(TAB_COUNT));
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, TAB_COUNT + "\n", "utf8");

// Guard second: re-read what was written and confirm the file
// itself holds exactly the digits plus one trailing newline.
const written = readFileSync(outPath, "utf8");
if (written !== TAB_COUNT + "\n") {
  throw new Error("entry.txt mismatch, got: " + JSON.stringify(written));
}

console.log("wrote " + outPath);
