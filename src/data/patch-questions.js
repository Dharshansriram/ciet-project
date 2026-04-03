/**
 * patch-questions.js
 * ------------------
 * Patches the DSA question bank:
 * 1. Removes Java starter/solution code
 * 2. Adds JavaScript (Node.js) starter code
 * 3. Writes patched file to dsaQuestions.patched.js
 *
 * Run once: node patch-questions.js
 */

"use strict";

const fs       = require("fs");
const path     = require("path");
const JS_STARTERS = require("./jsStarters");

// Read the original questions module
const srcPath  = path.join(__dirname, "dsaQuestions.js");
const destPath = path.join(__dirname, "dsaQuestions.js");

// We'll load the module, mutate in memory, then re-serialize key parts
// Because the file uses template literals, we do targeted string replacement

let source = fs.readFileSync(srcPath, "utf8");

// ── Step 1: Remove java: entries from starterCode ──────────────
// Pattern: java: `...`,  (between backticks, possibly multiline)
// We replace with nothing, then clean up double commas
source = source.replace(/\s*java:\s*`[^`]*`,?/gs, "");

// ── Step 2: Inject javascript: entries into starterCode blocks ──
// For each known question id, find its starterCode block and add js
for (const [qid, jsCode] of Object.entries(JS_STARTERS)) {
  // Find the pattern: id: "qid", ... starterCode: { ... }
  // We look for the starterCode block of the matching question
  // Strategy: find `id: "${qid}"` and then the next `starterCode: {`
  // and inject before the closing `}`

  const idMarker  = `id: "${qid}"`;
  const idPos     = source.indexOf(idMarker);
  if (idPos === -1) { console.warn(`[SKIP] Question not found: ${qid}`); continue; }

  // Find `starterCode: {` after this position
  const scMarker = "starterCode: {";
  const scPos    = source.indexOf(scMarker, idPos);
  if (scPos === -1) { console.warn(`[SKIP] No starterCode for: ${qid}`); continue; }

  // Find the closing `}` of starterCode
  let depth = 0, closePos = -1;
  for (let i = scPos + scMarker.length - 1; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) { closePos = i; break; }
    }
  }

  if (closePos === -1) { console.warn(`[SKIP] Can't find closing brace: ${qid}`); continue; }

  // Insert javascript entry before closing brace
  const escaped     = jsCode.replace(/`/g, "\\`").replace(/\${/g, "\\${");
  const injection   = `\n              javascript: \`${escaped}\`\n            `;

  source = source.slice(0, closePos) + "," + injection + source.slice(closePos);

  console.log(`[OK] Added JS starter: ${qid}`);
}

// ── Step 3: Clean up any trailing commas before closing braces ──
source = source.replace(/,\s*\}/g, (m) => m.replace(",", "").replace(/\s*\}/, "\n            }"));

fs.writeFileSync(destPath, source, "utf8");
console.log(`\n✅ Patched: ${destPath}`);
console.log(`   Processed ${Object.keys(JS_STARTERS).length} questions`);
