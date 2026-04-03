/**
 * codeRunner.service.js
 * ----------------------
 * Executes user code, returns structured test results.
 *
 * TWO MODES (auto-detected):
 *   docker — isolated containers (production / Docker Desktop)
 *   direct — runs gcc/python/node directly on host (Windows dev, no Docker)
 *
 * Set RUNNER_MODE=direct in .env to force direct mode.
 * Set RUNNER_MODE=docker in .env to force docker mode.
 */
"use strict";

const { exec, execSync } = require("child_process");
const fs   = require("fs");
const path = require("path");
const os   = require("os");

const TLE_MS = parseInt(process.env.TLE_MS || "10000", 10);

// ── Mode Detection ─────────────────────────────────────────────────
function detectMode() {
  if (process.env.RUNNER_MODE) return process.env.RUNNER_MODE;
  try {
    execSync("docker info", { timeout: 3000, stdio: "pipe" });
    return "docker";
  } catch (_) {
    console.log("[CodeRunner] Docker not available → DIRECT mode (dev)");
    return "direct";
  }
}
const MODE = detectMode();
console.log(`[CodeRunner] Running in ${MODE.toUpperCase()} mode`);

// ── Language Config ─────────────────────────────────────────────────
const LANG = {
  c: {
    file:        "main.c",
    dockerImage: "c-sandbox",
    dockerShell: "gcc -O2 -o main main.c 2>&1 && ./main < input.txt",
    getDirectCmds(dir) {
      const src = path.join(dir, "main.c");
      const bin = path.join(dir, os.platform() === "win32" ? "main.exe" : "main");
      return { compile: `gcc -O2 -o "${bin}" "${src}"`, run: `"${bin}"` };
    },
  },
  python: {
    file:        "solution.py",
    dockerImage: "python-sandbox",
    dockerShell: "python3 solution.py < input.txt",
    getDirectCmds(dir) {
      // "python" on Windows, "python3" on Linux/Mac
      const py = os.platform() === "win32" ? "python" : "python3";
      return { compile: null, run: `${py} "${path.join(dir, "solution.py")}"` };
    },
  },
  javascript: {
    file:        "solution.js",
    dockerImage: "node-sandbox",
    dockerShell: "node solution.js < input.txt",
    getDirectCmds(dir) {
      return { compile: null, run: `node "${path.join(dir, "solution.js")}"` };
    },
  },
};

const SUPPORTED_LANGS = Object.keys(LANG);

// ── Utilities ───────────────────────────────────────────────────────
function normalize(s) {
  return (s || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trimEnd();
}

function makeTempDir() {
  const base = path.join(os.tmpdir(), "ciet_runner");
  fs.mkdirSync(base, { recursive: true });
  return fs.mkdtempSync(path.join(base, "run_"));
}

function cleanup(dir) {
  try { fs.rmSync(dir, { recursive: true, force: true }); } catch (_) {}
}

function execp(cmd, opts) {
  return new Promise(resolve => {
    exec(cmd, { timeout: TLE_MS, ...opts }, (err, stdout, stderr) => {
      if (err) {
        if (err.killed || err.signal === "SIGTERM" || err.code === "ETIMEDOUT")
          return resolve({ tle: true });
        return resolve({ error: (stderr || stdout || err.message || "Runtime Error").trim() });
      }
      resolve({ stdout: stdout || "" });
    });
  });
}

function makeResult(raw, testCase) {
  if (raw.tle)   return { status:"TLE",   output:"Time Limit Exceeded (10s)",     expected:normalize(testCase.expectedOutput), input:testCase.input };
  if (raw.error) return { status:"ERROR", output:raw.error,                       expected:normalize(testCase.expectedOutput), input:testCase.input };
  const got = normalize(raw.stdout), expected = normalize(testCase.expectedOutput);
  return { status: got===expected?"PASS":"FAIL", output:got, expected, input:testCase.input };
}

// ── Docker Execution ────────────────────────────────────────────────
async function runDocker(code, lang, tc) {
  const cfg = LANG[lang];
  const dir = makeTempDir();
  try {
    fs.writeFileSync(path.join(dir, cfg.file), code, "utf8");
    fs.writeFileSync(path.join(dir, "input.txt"), tc.input || "", "utf8");
    // Convert Windows C:\path → //c/path for Docker volume mount
    const mount = dir.replace(/\\/g, "/").replace(/^([A-Z]):/, (_, d) => `//${d.toLowerCase()}`);
    const cmd = `docker run --rm --network=none --memory=128m --cpus=0.5 -v "${mount}:/app" ${cfg.dockerImage} sh -c "cd /app && ${cfg.dockerShell}"`;
    return makeResult(await execp(cmd, {}), tc);
  } finally { cleanup(dir); }
}

// ── Direct Execution (no Docker — Windows dev) ──────────────────────
async function runDirect(code, lang, tc) {
  const cfg  = LANG[lang];
  const dir  = makeTempDir();
  const inp  = path.join(dir, "input.txt");
  try {
    fs.writeFileSync(path.join(dir, cfg.file), code, "utf8");
    fs.writeFileSync(inp, tc.input || "", "utf8");
    const { compile, run } = cfg.getDirectCmds(dir);
    // Compile step (C only)
    if (compile) {
      const cr = await execp(compile, { cwd: dir });
      if (cr.error || cr.tle) return makeResult(cr.tle ? { error:"Compile timeout" } : { error: cr.error }, tc);
    }
    // Run with stdin redirect — works on both Windows cmd and bash
    const raw = await execp(`${run} < "${inp}"`, { cwd: dir });
    return makeResult(raw, tc);
  } finally { cleanup(dir); }
}

// ── Core ────────────────────────────────────────────────────────────
function runSingle(code, lang, tc) {
  if (!LANG[lang]) return Promise.resolve({ status:"ERROR", output:`Unsupported: ${lang}`, expected:normalize(tc.expectedOutput), input:tc.input });
  return MODE === "docker" ? runDocker(code, lang, tc) : runDirect(code, lang, tc);
}

// ── Public API ──────────────────────────────────────────────────────

/** Used by ▶ Run — only first 2 test cases */
async function runVisible(code, lang, testCases) {
  const visible = (testCases || []).slice(0, 2);
  if (!visible.length) return { results:[], allPassed:true };
  const results = await Promise.all(visible.map(tc => runSingle(code, lang, tc)));
  return { results, allPassed: results.every(r => r.status === "PASS") };
}

/** Used by ✔ Submit — all test cases, sequential */
async function runAll(code, lang, testCases) {
  if (!testCases?.length) return { accepted:false, passCount:0, total:0, score:0, results:[] };
  const results = [];
  for (const tc of testCases) results.push(await runSingle(code, lang, tc));
  const passCount = results.filter(r => r.status==="PASS").length;
  const total     = results.length;
  return { accepted: passCount===total, passCount, total, score: Math.round(passCount/total*100), results };
}

module.exports = { runVisible, runAll, SUPPORTED_LANGS, MODE };
