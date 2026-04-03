/**
 * add-js-starters.js
 * ------------------
 * Reads dsaQuestions.js, adds JavaScript (Node.js) starter code
 * to every codeEditor question, removes Java, saves output.
 *
 * JavaScript I/O pattern used:
 *   const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
 *
 * Run: node add-js-starters.js
 */

"use strict";

// JavaScript starter templates keyed by question id
// Manually written for the questions that have explicit c/java/python starters
const JS_STARTERS = {

  // ── Arrays / 1D Arrays ──────────────────────────────────────
  "arr-code-1": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

// TODO: find first zero index
let result = -1;
// your code here

console.log(result);`,

  "arr-code-2": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const temps = lines[1].split(' ').map(Number);

// Find and print the maximum temperature
console.log(Math.max(...temps));`,

  "arr-code-3": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

// Print the sum
console.log(arr.reduce((a, b) => a + b, 0));`,

  "arr-code-4": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

// Print array reversed
console.log(arr.reverse().join(' '));`,

  "arr-code-5": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const scores = [...new Set(lines[1].split(' ').map(Number))].sort((a, b) => b - a);

console.log(scores.length >= 2 ? scores[1] : -1);`,

  // ── Arrays / 2D Arrays ──────────────────────────────────────
  "mat-code-1": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const matrix = [];
for (let i = 0; i < n; i++) {
  matrix.push(lines[i + 1].split(' ').map(Number));
}

let total = 0;
for (let i = 0; i < n; i++) {
  total += matrix[i][i];
  if (i !== n - 1 - i) total += matrix[i][n - 1 - i];
}
console.log(total);`,

  "mat-code-2": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const matrix = [];
for (let i = 0; i < n; i++) {
  matrix.push(lines[i + 1].split(' ').map(Number));
}

for (let j = 0; j < n; j++) {
  console.log(matrix.map(row => row[j]).join(' '));
}`,

  "mat-code-3": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const [n, m] = lines[0].split(' ').map(Number);
let bestRow = 0, bestCount = -1;
for (let i = 0; i < n; i++) {
  const cnt = lines[i + 1].split(' ').map(Number).filter(x => x === 1).length;
  if (cnt > bestCount) { bestCount = cnt; bestRow = i; }
}
console.log(bestRow);`,

  "mat-code-4": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const matrix = [];
for (let i = 0; i < n; i++) {
  matrix.push(lines[i + 1].split(' ').map(Number));
}

// Transpose then reverse each row → 90° clockwise
for (let i = 0; i < n; i++)
  for (let j = i + 1; j < n; j++)
    [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];

for (const row of matrix) {
  row.reverse();
  console.log(row.join(' '));
}`,

  "mat-code-5": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const [m, n] = lines[0].split(' ').map(Number);
const mat = [];
for (let i = 0; i < m; i++) mat.push(lines[i + 1].split(' ').map(Number));

const rows = new Set(), cols = new Set();
for (let i = 0; i < m; i++)
  for (let j = 0; j < n; j++)
    if (mat[i][j] === 0) { rows.add(i); cols.add(j); }

for (let i = 0; i < m; i++) {
  const row = [];
  for (let j = 0; j < n; j++)
    row.push(rows.has(i) || cols.has(j) ? 0 : mat[i][j]);
  console.log(row.join(' '));
}`,

  // ── Strings / String Basics ─────────────────────────────────
  "str-code-1": `const username = require('fs').readFileSync('/dev/stdin','utf8').trim();
console.log(/^[A-Za-z][A-Za-z0-9_]{2,19}$/.test(username) ? 'VALID' : 'INVALID');`,

  "str-code-2": `const sentence = require('fs').readFileSync('/dev/stdin','utf8').trim().toLowerCase().split(/\\s+/);
const freq = {};
for (const w of sentence) freq[w] = (freq[w] || 0) + 1;
for (const w of Object.keys(freq).sort()) console.log(w + ' ' + freq[w]);`,

  "str-code-3": `const s = require('fs').readFileSync('/dev/stdin','utf8').trim().toLowerCase().replace(/\\s+/g,'');
console.log(s === s.split('').reverse().join('') ? 'YES' : 'NO');`,

  "str-code-4": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const groups = {};
for (let i = 1; i <= n; i++) {
  const w = lines[i];
  const key = w.split('').sort().join('');
  if (!groups[key]) groups[key] = [];
  groups[key].push(w);
}
for (const key of Object.keys(groups).sort())
  console.log(groups[key].sort().join(' '));`,

  "str-code-5": `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();
let left = 0, maxLen = 0;
const seen = {};
for (let right = 0; right < s.length; right++) {
  if (seen[s[right]] !== undefined && seen[s[right]] >= left)
    left = seen[s[right]] + 1;
  seen[s[right]] = right;
  maxLen = Math.max(maxLen, right - left + 1);
}
console.log(maxLen);`,

  // ── Strings / Pattern Matching ──────────────────────────────
  "pat-code-1": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const text = lines[0], pattern = lines[1];
let count = 0, start = 0, pos;
while ((pos = text.indexOf(pattern, start)) !== -1) { count++; start = pos + 1; }
console.log(count);`,

  "pat-code-2": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const s = lines[0], p = lines[1], k = p.length;
const need = {}, win = {};
for (const c of p) need[c] = (need[c] || 0) + 1;
let formed = 0, required = Object.keys(need).length, res = [];
for (let r = 0; r < s.length; r++) {
  const c = s[r]; win[c] = (win[c] || 0) + 1;
  if (need[c] && win[c] === need[c]) formed++;
  if (r >= k) { const o = s[r-k]; if (win[o] === 1) delete win[o]; else win[o]--; if (need[o] && (win[o]||0) < need[o]) formed--; }
  if (formed === required) res.push(r - k + 1);
}
console.log(res.join(' '));`,

  "pat-code-3": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const s = lines[0], p = lines[1], m = s.length, n = p.length;
const dp = Array.from({length:m+1},()=>new Array(n+1).fill(false));
dp[0][0] = true;
for (let j = 1; j <= n; j++) if (p[j-1] === '*') dp[0][j] = dp[0][j-1];
for (let i = 1; i <= m; i++)
  for (let j = 1; j <= n; j++)
    if (p[j-1] === '*') dp[i][j] = dp[i-1][j] || dp[i][j-1];
    else if (p[j-1] === '?' || p[j-1] === s[i-1]) dp[i][j] = dp[i-1][j-1];
console.log(dp[m][n] ? 'YES' : 'NO');`,

  "pat-code-4": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const a = lines[0], b = lines[1];
const t = Math.ceil(b.length / a.length) + 1;
const rep = a.repeat(t);
if (rep.includes(b)) console.log(t - 1);
else if ((a + rep).includes(b)) console.log(t);
else console.log(-1);`,

  "pat-code-5": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const s = lines[0], t = lines[1];
const need = {}, have = {};
for (const c of t) need[c] = (need[c] || 0) + 1;
let formed = 0, required = Object.keys(need).length;
let l = 0, res = '', minLen = Infinity;
for (let r = 0; r < s.length; r++) {
  const c = s[r]; have[c] = (have[c] || 0) + 1;
  if (need[c] && have[c] === need[c]) formed++;
  while (formed === required) {
    if (r - l + 1 < minLen) { minLen = r - l + 1; res = s.slice(l, r + 1); }
    const lc = s[l]; have[lc]--; if (need[lc] && have[lc] < need[lc]) formed--;
    l++;
  }
}
console.log(res);`,

  // ── Linked List ─────────────────────────────────────────────
  "sll-code-1": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const [n, m] = lines[0].split(' ').map(Number);
const adj = Array.from({length: n + 1}, () => []);
for (let i = 1; i <= m; i++) {
  const [u, v] = lines[i].split(' ').map(Number);
  adj[u].push(v);
}
const visited = new Set(), recStack = new Set();
function dfs(v) {
  visited.add(v); recStack.add(v);
  for (const nb of adj[v]) {
    if (!visited.has(nb) && dfs(nb)) return true;
    if (recStack.has(nb)) return true;
  }
  recStack.delete(v); return false;
}
let hasCycle = false;
for (let v = 1; v <= n; v++) if (!visited.has(v) && dfs(v)) { hasCycle = true; break; }
console.log(hasCycle ? 'YES' : 'NO');`,

  "sll-code-2": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);
console.log(arr[Math.floor(n / 2)]);`,

  "sll-code-3": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);
console.log(arr.reverse().join(' '));`,

  "sll-code-4": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const a = lines[1].split(' ').map(Number);
const m = parseInt(lines[2]);
const b = lines[3].split(' ').map(Number);
console.log([...a, ...b].sort((x, y) => x - y).join(' '));`,

  "sll-code-5": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const size = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);
const n = parseInt(lines[2]);
arr.splice(size - n, 1);
console.log(arr.join(' '));`,

  // ── Stack ────────────────────────────────────────────────────
  "stk-code-1": `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();
const stack = [], pairs = {')':'(',']':'[','}':'{'};
for (const c of s) {
  if ('([{'.includes(c)) stack.push(c);
  else if (')]}'.includes(c)) {
    if (!stack.length || stack[stack.length-1] !== pairs[c]) { console.log('NO'); process.exit(); }
    stack.pop();
  }
}
console.log(stack.length === 0 ? 'YES' : 'NO');`,

  "stk-code-2": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);
const result = new Array(n).fill(-1);
const stack = [];
for (let i = 0; i < n; i++) {
  while (stack.length && arr[stack[stack.length-1]] < arr[i])
    result[stack.pop()] = arr[i];
  stack.push(i);
}
console.log(result.join(' '));`,

  "stk-code-3": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const q = parseInt(lines[0]);
const stack = [], minStack = [];
for (let i = 1; i <= q; i++) {
  const parts = lines[i].split(' ');
  if (parts[0] === 'push') {
    const v = parseInt(parts[1]); stack.push(v);
    minStack.push(Math.min(v, minStack.length ? minStack[minStack.length-1] : v));
  } else if (parts[0] === 'pop') { stack.pop(); minStack.pop(); }
  else if (parts[0] === 'getMin') console.log(minStack[minStack.length-1]);
}`,

  "stk-code-4": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const heights = lines[1].split(' ').map(Number);
heights.push(0);
const stack = []; let maxArea = 0;
for (let i = 0; i < heights.length; i++) {
  while (stack.length && heights[stack[stack.length-1]] >= heights[i]) {
    const h = heights[stack.pop()];
    const w = stack.length ? i - stack[stack.length-1] - 1 : i;
    maxArea = Math.max(maxArea, h * w);
  }
  stack.push(i);
}
console.log(maxArea);`,

  "stk-code-5": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = parseInt(lines[0]);
const temps = lines[1].split(' ').map(Number);
const result = new Array(n).fill(0);
const stack = [];
for (let i = 0; i < n; i++) {
  while (stack.length && temps[stack[stack.length-1]] < temps[i])
    result[stack.pop()] = i - stack[stack.length]; // bug-fix: recalc after pop
  stack.push(i);
}
// Recalculate correctly
const result2 = new Array(n).fill(0);
const st2 = [];
for (let i = 0; i < n; i++) {
  while (st2.length && temps[st2[st2.length-1]] < temps[i]) {
    const idx = st2.pop();
    result2[idx] = i - idx;
  }
  st2.push(i);
}
console.log(result2.join(' '));`,

  // ── Queue ────────────────────────────────────────────────────
  "q-code-1": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const q = parseInt(lines[0]);
const queue = [];
for (let i = 1; i <= q; i++) {
  const parts = lines[i].split(' ');
  if (parts[0] === 'enqueue') queue.push(parts[1]);
  else if (parts[0] === 'dequeue') { if (!queue.length) console.log('EMPTY'); else queue.shift(); }
  else if (parts[0] === 'front') console.log(queue.length ? queue[0] : 'EMPTY');
}`,

  "q-code-2": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const [n, k] = lines[0].split(' ').map(Number);
const arr = lines[1].split(' ').map(Number);
const dq = [], result = [];
for (let i = 0; i < n; i++) {
  while (dq.length && dq[0] < i - k + 1) dq.shift();
  while (dq.length && arr[dq[dq.length-1]] < arr[i]) dq.pop();
  dq.push(i);
  if (i >= k - 1) result.push(arr[dq[0]]);
}
console.log(result.join(' '));`,

  "q-code-3": `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();
const freq = {}, queue = [];
let out = '';
for (const c of s) {
  freq[c] = (freq[c] || 0) + 1;
  queue.push(c);
  while (queue.length && freq[queue[0]] > 1) queue.shift();
  out += queue.length ? queue[0] : '#';
}
console.log(out);`,

  "q-code-4": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const [n, m] = lines[0].split(' ').map(Number);
const adj = Array.from({length: n + 1}, () => []);
for (let i = 1; i <= m; i++) {
  const [u, v] = lines[i].split(' ').map(Number);
  adj[u].push(v); adj[v].push(u);
}
const dist = new Array(n + 1).fill(-1);
dist[1] = 0;
const queue = [1];
while (queue.length) {
  const u = queue.shift();
  for (const v of adj[u]) {
    if (dist[v] === -1) { dist[v] = dist[u] + 1; queue.push(v); }
  }
}
console.log(dist.slice(1).join(' '));`,

  "q-code-5": `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const [m, n] = lines[0].split(' ').map(Number);
const grid = [];
for (let i = 0; i < m; i++) grid.push(lines[i + 1].split(' ').map(Number));
const queue = []; let fresh = 0;
for (let i = 0; i < m; i++)
  for (let j = 0; j < n; j++) {
    if (grid[i][j] === 2) queue.push([i, j, 0]);
    else if (grid[i][j] === 1) fresh++;
  }
let time = 0;
while (queue.length) {
  const [r, c, t] = queue.shift(); time = t;
  for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
    const nr = r+dr, nc = c+dc;
    if (nr>=0&&nr<m&&nc>=0&&nc<n&&grid[nr][nc]===1) {
      grid[nr][nc]=2; fresh--; queue.push([nr,nc,t+1]);
    }
  }
}
console.log(fresh===0 ? time : -1);`,
};

module.exports = JS_STARTERS;
