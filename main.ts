import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(dir, "entry.txt");
const dest = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);
const { size } = statSync(dest);
if (size === 0 || size > 200) throw new Error(`entry.txt must be 1-200 bytes, got ${size}`);
console.log(`wrote ${dest} (${size} bytes)`);
