// Funniest One-Line Out-of-Office Reply
// make.fun bounty: u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8
//
// Writes the entry text to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback: local output/ when unset). Never a hardcoded absolute path.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ENTRY =
  "I'm away until Monday; my auto-reply has taken over and, frankly, it's outperforming me.";

// The sealed scorer accepts UTF-8 text of 1 to 160 characters, not only
// white space, in a single line. Validate the gate here so a bad entry
// fails loudly at build time instead of scoring 0.
const GATE = { MIN_CHARS: 1, MAX_CHARS: 160 };

function buildEntryLine(): string {
  const chars = [...ENTRY].length;
  if (chars < GATE.MIN_CHARS || chars > GATE.MAX_CHARS) {
    throw new Error(
      `entry must be ${GATE.MIN_CHARS}-${GATE.MAX_CHARS} characters, got ${chars}`,
    );
  }
  if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
  return ENTRY;
}

function resolveOutputPath(): string {
  if (process.env.MAKEFUN_OUTPUT_DIR) return resolve(process.env.MAKEFUN_OUTPUT_DIR);
  if (process.env.OUTPUT_PATH) return resolve(process.env.OUTPUT_PATH);
  if (process.env.MAKEFUN_BOT_DIR) return "/output";
  return resolve("output");
}

function main(): void {
  const entry = buildEntryLine();
  const outDir = resolveOutputPath();
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate counts every character in the file.
  writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
}

main();
