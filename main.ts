// Funniest One-Line Out-of-Office Reply
// make.fun bounty: u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8
//
// Writes the entry text to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback: local output/ when unset). Never a hardcoded absolute path.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ENTRY =
  "I'm away until Monday; my auto-reply has taken over and, frankly, it's outperforming me.";

function resolveOutputPath(): string {
  if (process.env.MAKEFUN_OUTPUT_DIR) return resolve(process.env.MAKEFUN_OUTPUT_DIR);
  if (process.env.OUTPUT_PATH) return resolve(process.env.OUTPUT_PATH);
  if (process.env.MAKEFUN_BOT_DIR) return "/output";
  return resolve("output");
}

const outDir = resolveOutputPath();
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
