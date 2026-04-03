/**
 * DSA Phase Practice — Frontend Controller
 * ==========================================
 * Senior Engineer Notes:
 *
 * 1. MONACO PERSISTENCE: Editor is created ONCE. Never destroyed.
 *    DOM node #monacoContainer is NEVER replaced via innerHTML.
 *    Question navigation only calls setEditorContent() which swaps the model.
 *
 * 2. SINGLE STATE OBJECT: All mutable state lives in `state`.
 *    No scattered globals. Easy to debug, easy to reset.
 *
 * 3. API LAYER: api.get/post never throws. Returns {ok, data, error}.
 *    All callers handle both success and failure paths.
 *
 * 4. THREE LANGUAGES: Python, JavaScript (Node.js), C via Docker.
 *
 * 5. NO PAGE RELOAD: Run and Submit use fetch() only.
 *    Buttons are locked during execution to prevent double-fire.
 */
"use strict";

// ─── Constants ─────────────────────────────────────────────────
const API_BASE = "http://localhost:5000/api/training";

const PHASE_ORDER = ["objective","codeEditor","jumbledCode","missingCode","optimize"];

const PHASE_LABEL = {
  objective:   "🎯 Objective",
  codeEditor:  "💻 Code Editor",
  jumbledCode: "🔀 Jumbled Code",
  missingCode: "✏️ Fill Blanks",
  optimize:    "⚡ Optimize",
};

const MONACO_LANG = { python:"python", javascript:"javascript", c:"c" };

// ─── URL Params ─────────────────────────────────────────────────
const _p      = new URLSearchParams(location.search);
const TOPIC   = _p.get("topic")    || "Arrays";
const SUBTOPIC= _p.get("subtopic") || "1D Arrays";
const PHASE   = _p.get("phase")    || "objective";

// ─── State ──────────────────────────────────────────────────────
const state = {
  questions:    [],
  currentIndex: 0,
  answers:      {},         // { [index]: { submitted, correct, ... } }
  editor:       null,       // monaco.IStandaloneCodeEditor — ONE instance
  editorReady:  false,
  pendingEdit:  null,       // { code, lang } — queued before Monaco ready
  isRunning:    false,
  isSubmitting: false,
  sortable:     null,
  toastTimer:   null,
  _currentQ:    null,       // current question ref for run/submit
};

// ─── API Layer ──────────────────────────────────────────────────
const api = {
  async call(method, path, body) {
    try {
      const res  = await fetch(`${API_BASE}${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body:    body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      if (!res.ok || !data.success) return { ok:false, data:null, error: data.message || `HTTP ${res.status}` };
      return { ok:true, data, error:null };
    } catch (err) {
      return { ok:false, data:null, error:"Backend offline. Run: cd Backend && npm run dev" };
    }
  },
  get:  (path)       => api.call("GET",  path),
  post: (path, body) => api.call("POST", path, body),
};

// ─── Init ────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Breadcrumb
  document.getElementById("bcTopic").textContent    = TOPIC;
  document.getElementById("bcSubtopic").textContent = SUBTOPIC;
  document.getElementById("bcPhase").textContent    = PHASE_LABEL[PHASE] || PHASE;

  // Wire editor buttons once (they read state at call time)
  document.getElementById("runBtn").addEventListener("click",         handleRun);
  document.getElementById("submitBtn").addEventListener("click",      handleSubmit);
  document.getElementById("resetBtn").addEventListener("click",       handleReset);
  document.getElementById("clearOutputBtn").addEventListener("click", clearOutput);
  document.getElementById("langSelect").addEventListener("change",    handleLangChange);

  initMonaco();       // initialize once
  loadQuestions();
  initResizeHandle();
});

// ─── Load Questions ──────────────────────────────────────────────
async function loadQuestions() {
  const { ok, data, error } = await api.get(
    `/dsa/questions/${encodeURIComponent(TOPIC)}/${encodeURIComponent(SUBTOPIC)}/${PHASE}`
  );

  if (!ok || !data.questions?.length) {
    showRegion("objectiveRegion");
    document.getElementById("objectiveRegion").innerHTML =
      `<div style="padding:40px;text-align:center;color:var(--c-muted)">
        <p>${ok ? "No questions found for this phase." : `⚠️ ${escHtml(error)}`}</p>
       </div>`;
    return;
  }

  state.questions = data.questions;
  renderQNav();
  renderProgressTrack();
  navigateTo(0);
}

// ─── Navigation ──────────────────────────────────────────────────
function navigateTo(index) {
  if (index < 0 || index >= state.questions.length) return;
  state.currentIndex = index;

  document.getElementById("prevBtn").disabled     = index === 0;
  document.getElementById("nextBtn").textContent  = index === state.questions.length-1 ? "Finish ✓" : "Next →";
  document.getElementById("qProgress").textContent = `${index+1} / ${state.questions.length}`;

  updateQNav();
  updateProgressTrack();

  const q = state.questions[index];
  state._currentQ = q;
  renderLeftPanel(q);
  renderPhaseContent(q, index);
}

function prevQuestion() { navigateTo(state.currentIndex - 1); }
function nextQuestion() {
  if (state.currentIndex < state.questions.length - 1) navigateTo(state.currentIndex + 1);
  else showCompletionModal();
}

// ─── Q-Nav Dots ──────────────────────────────────────────────────
function renderQNav() {
  const nav = document.getElementById("qNav");
  nav.innerHTML = "";
  state.questions.forEach((_, i) => {
    const d = document.createElement("div");
    d.className   = "q-dot";
    d.dataset.i   = i;
    d.textContent = i + 1;
    d.addEventListener("click", () => navigateTo(i));
    nav.appendChild(d);
  });
}

function updateQNav() {
  document.querySelectorAll(".q-dot").forEach((d, i) => {
    const a = state.answers[i];
    d.dataset.state = i === state.currentIndex ? "active" : a?.correct===true ? "pass" : a?.correct===false ? "fail" : "";
  });
}

function renderProgressTrack() {
  const t = document.getElementById("progressTrack");
  t.innerHTML = "";
  state.questions.forEach((_, i) => {
    const d = document.createElement("div"); d.className="p-dot"; d.dataset.pi=i; t.appendChild(d);
  });
}

function updateProgressTrack() {
  document.querySelectorAll(".p-dot").forEach((d, i) => {
    const a = state.answers[i];
    d.className = "p-dot" + (i===state.currentIndex?" active":a?.correct===true?" pass":a?.correct===false?" fail":"");
  });
}

// ─── Left Panel ──────────────────────────────────────────────────
function renderLeftPanel(q) {
  let h = `<div class="lp-phase-tag">${PHASE_LABEL[PHASE]}</div>`;
  h += `<div class="lp-q-num">Question ${state.currentIndex+1} of ${state.questions.length}</div>`;
  if (q.title)       h += `<div class="lp-title">${escHtml(q.title)}</div>`;
  if (q.difficulty)  h += `<div class="lp-diff ${q.difficulty}">${q.difficulty}</div>`;
  if (q.scenario)    h += `<div class="lp-scenario">${escHtml(q.scenario)}</div>`;
  if (q.description) h += `<div class="lp-description">${escHtml(q.description)}</div>`;
  if (q.constraints) h += `<div class="lp-constraints"><strong>Constraints</strong>${escHtml(q.constraints)}</div>`;

  if (PHASE === "codeEditor" && q.testCases?.length) {
    h += `<div class="lp-section-label">Example Test Cases</div>`;
    q.testCases.slice(0,2).forEach((tc,i) => {
      h += `<div class="lp-tc-card">
        <div class="lp-tc-label">Example ${i+1}</div>
        <div class="lp-tc-label">Input</div><pre>${escHtml(tc.input)}</pre>
        <div class="lp-tc-label" style="margin-top:5px">Expected</div><pre>${escHtml(tc.expectedOutput)}</pre>
      </div>`;
    });
    if (q.testCases.length > 2) h += `<div style="font-size:0.75rem;color:var(--c-subtle);margin-top:4px">+${q.testCases.length-2} hidden test case(s)</div>`;
  }
  if (PHASE==="jumbledCode" && q.hint) h += `<div class="lp-constraints"><strong>Hint</strong>${escHtml(q.hint)}</div>`;

  document.getElementById("lpScroll").innerHTML = h;
}

// ─── Phase Router ────────────────────────────────────────────────
function renderPhaseContent(q, index) {
  const map = { objective:renderObjective, codeEditor:renderCodeEditor, jumbledCode:renderJumbled, missingCode:renderMissing, optimize:renderOptimize };
  map[PHASE]?.(q, index);
}

function showRegion(id) {
  ["codeEditorRegion","objectiveRegion","jumbledRegion","missingRegion","optimizeRegion"]
    .forEach(r => document.getElementById(r).classList.toggle("hidden", r!==id));
}

// ═══════════════════════════════════════════════════════════════
//  PHASE 1 — OBJECTIVE MCQ
// ═══════════════════════════════════════════════════════════════
function renderObjective(q, index) {
  showRegion("objectiveRegion");
  const r     = document.getElementById("objectiveRegion");
  const saved = state.answers[index];
  const L     = ["A","B","C","D"];

  r.innerHTML = `
    <div class="mcq-question">${escHtml(q.question)}</div>
    <div class="mcq-options" id="mcqOpts"></div>
    <div id="mcqFB"></div>
    ${saved?.submitted ? "" : `<div class="mcq-actions"><button class="btn btn-primary" id="mcqSub">Submit Answer</button></div>`}
  `;

  const optsEl = document.getElementById("mcqOpts");
  (q.options||[]).forEach((text, i) => {
    const d = document.createElement("div");
    d.className = "mcq-option";
    d.dataset.optIdx = i;
    if (saved?.submitted) d.classList.add("locked");
    if (saved?.selectedIdx === i) d.classList.add("selected");
    d.innerHTML = `<span class="mcq-letter">${L[i]}</span><span>${escHtml(text)}</span>`;
    if (!saved?.submitted) d.addEventListener("click", () => selectMCQ(index, i));
    optsEl.appendChild(d);
  });

  if (saved?.submitted) applyMCQVisuals(saved.selectedIdx, q.answer, saved.explanation);

  document.getElementById("mcqSub")?.addEventListener("click", () => submitObjective(index, q));
}

function selectMCQ(qIdx, optIdx) {
  if (!state.answers[qIdx]) state.answers[qIdx] = {};
  state.answers[qIdx].selectedIdx = optIdx;
  document.querySelectorAll(".mcq-option").forEach(o => o.classList.remove("selected"));
  document.querySelector(`.mcq-option[data-opt-idx="${optIdx}"]`)?.classList.add("selected");
}

async function submitObjective(qIdx, q) {
  const sel = state.answers[qIdx]?.selectedIdx;
  if (sel === undefined) { showToast("Select an option first","info"); return; }
  const btn = document.getElementById("mcqSub");
  btn.disabled = true; btn.textContent = "Checking…";

  const { ok, data, error } = await api.post("/dsa/check/objective", { questionId:q.id, selectedIndex:sel });
  let correct, correctIdx, explanation;
  if (ok) { correct=data.correct; correctIdx=data.correctIndex; explanation=data.explanation; }
  else    { correct=(sel===q.answer); correctIdx=q.answer; explanation=q.explanation; if(error) showToast("⚠️ Offline","info"); }

  state.answers[qIdx] = { submitted:true, selectedIdx:sel, correct, explanation };
  applyMCQVisuals(sel, correctIdx, explanation);
  document.querySelector(".mcq-actions")?.remove();
  updateQNav(); updateProgressTrack(); saveProgress();
}

function applyMCQVisuals(sel, correctIdx, explanation) {
  document.querySelectorAll(".mcq-option").forEach((el, i) => {
    el.classList.remove("selected","correct","wrong"); el.classList.add("locked");
    if (i===correctIdx) el.classList.add("correct");
    else if (i===sel && sel!==correctIdx) el.classList.add("wrong");
  });
  const fb = document.getElementById("mcqFB"); if (!fb||!explanation) return;
  fb.innerHTML = `<div class="mcq-feedback ${sel===correctIdx?"correct":"wrong"}">${sel===correctIdx?"✅ Correct! ":"❌ Wrong. "}${escHtml(explanation)}</div>`;
}

// ═══════════════════════════════════════════════════════════════
//  PHASE 2 — CODE EDITOR
//  KEY: showRegion() shows the PERSISTENT editor region.
//       Monaco DOM node is never removed. setEditorContent() swaps model.
// ═══════════════════════════════════════════════════════════════
function renderCodeEditor(q, index) {
  showRegion("codeEditorRegion");

  const saved = state.answers[index] || {};
  const lang  = saved.lang || "python";
  const code  = saved.code || (q.starterCode||{})[lang] || `# Write your ${lang} solution here\n`;

  document.getElementById("langSelect").value = lang;
  setEditorContent(code, lang);

  if (saved.outputHtml) document.getElementById("outputBody").innerHTML = saved.outputHtml;
  else clearOutput();
}

// Monaco: init ONCE on page load
function initMonaco() {
  require.config({ paths:{ vs:"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs" } });
  require(["vs/editor/editor.main"], () => {
    state.editor = monaco.editor.create(document.getElementById("monacoContainer"), {
      value:"", language:"python", theme:"vs-dark",
      automaticLayout:true, minimap:{enabled:false},
      fontSize:14, lineNumbers:"on", scrollBeyondLastLine:false,
      fontFamily:"'JetBrains Mono','Fira Code',monospace",
      tabSize:4,
    });
    state.editorReady = true;
    if (state.pendingEdit) { const {code,lang}=state.pendingEdit; state.pendingEdit=null; setEditorContent(code,lang); }
  });
}

// Swap editor content — safe to call before ready (queues update)
function setEditorContent(code, lang) {
  if (!state.editorReady) { state.pendingEdit={code,lang}; return; }
  const newModel = monaco.editor.createModel(code, MONACO_LANG[lang]||"python");
  const oldModel = state.editor.getModel();
  state.editor.setModel(newModel);
  if (oldModel && !oldModel.isDisposed()) oldModel.dispose();
}

function handleLangChange() {
  const lang = document.getElementById("langSelect").value;
  const q    = state._currentQ;
  const code = (q?.starterCode||{})[lang] || `# Write your ${lang} solution here\n`;
  const idx  = state.currentIndex;
  if (!state.answers[idx]) state.answers[idx]={};
  state.answers[idx].lang=lang; state.answers[idx].code=code;
  setEditorContent(code, lang); clearOutput();
}

function handleReset() {
  const lang = document.getElementById("langSelect").value;
  const code = (state._currentQ?.starterCode||{})[lang] || "";
  setEditorContent(code, lang); clearOutput();
}

// RUN — visible test cases only (first 2), no reload
async function handleRun() {
  if (state.isRunning) return;
  const code = state.editor?.getValue()?.trim()||"";
  const lang = document.getElementById("langSelect").value;
  const q    = state._currentQ;
  if (!code) { showToast("Write some code first","info"); return; }

  state.isRunning=true;
  const runBtn=document.getElementById("runBtn"); runBtn.disabled=true; runBtn.textContent="Running…";
  setOutputHtml(`<span class="spinner"></span> Running visible test cases…`);

  const {ok,data,error} = await api.post("/dsa/run",{questionId:q.id,code,language:lang});
  state.isRunning=false; runBtn.disabled=false; runBtn.textContent="▶ Run";

  if (!ok) { setOutputHtml(`<span style="color:var(--c-orange)">⚠️ ${escHtml(error)}</span>`); return; }

  const html = buildResultsHtml(data.results, {isRun:true});
  setOutputHtml(html);

  const idx = state.currentIndex;
  if (!state.answers[idx]) state.answers[idx]={};
  Object.assign(state.answers[idx], {lang,code,outputHtml:html});
  if (data.allPassed) { state.answers[idx].correct=true; updateQNav(); updateProgressTrack(); saveProgress(); }
}

// SUBMIT — ALL test cases, no reload
async function handleSubmit() {
  if (state.isSubmitting) return;
  const code = state.editor?.getValue()?.trim()||"";
  const lang = document.getElementById("langSelect").value;
  const q    = state._currentQ;
  if (!code) { showToast("Write some code first","info"); return; }

  state.isSubmitting=true;
  const btn=document.getElementById("submitBtn"); btn.disabled=true; btn.textContent="Submitting…";
  setOutputHtml(`<span class="spinner"></span> Submitting against all ${q.testCases?.length||"?"} test cases…`);

  const {ok,data,error} = await api.post("/dsa/submit",{questionId:q.id,code,language:lang});
  state.isSubmitting=false; btn.disabled=false; btn.textContent="✔ Submit";

  if (!ok) { setOutputHtml(`<span style="color:var(--c-orange)">⚠️ ${escHtml(error)}</span>`); return; }

  const html = buildResultsHtml(data.results, {accepted:data.accepted,passCount:data.passCount,total:data.total,score:data.score});
  setOutputHtml(html);

  const idx = state.currentIndex;
  if (!state.answers[idx]) state.answers[idx]={};
  Object.assign(state.answers[idx], {lang,code,outputHtml:html,correct:data.accepted});
  updateQNav(); updateProgressTrack(); saveProgress();
  showToast(data.accepted?`✅ Accepted! ${data.passCount}/${data.total}`:`❌ ${data.passCount}/${data.total} passed`, data.accepted?"pass":"fail");
}

function buildResultsHtml(results, summary) {
  let h="";
  if (summary.isRun) {
    const all = results.every(r=>r.status==="PASS");
    h += `<div class="result-banner ${all?"pass":"fail"}">${all?"✅ All visible tests passed!":"⚠️ Some tests failed"}</div>`;
  } else {
    h += `<div class="result-banner ${summary.accepted?"pass":"fail"}">
      ${summary.accepted?`🎉 Accepted — ${summary.passCount}/${summary.total} (${summary.score}%)`:`❌ Wrong — ${summary.passCount}/${summary.total} passed (${summary.score}%)`}
    </div>`;
  }
  results.forEach((r,i) => {
    h += `<div class="tc-result">
      <div class="tc-status ${r.status}">${r.status==="PASS"?"✔":r.status==="TLE"?"⏱":"✘"} Test ${i+1}: ${r.status}</div>`;
    if (r.status==="FAIL")  h += `<div class="tc-detail">Expected: <code>${escHtml(r.expected)}</code></div><div class="tc-detail">Got:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>${escHtml(r.output)}</code></div>`;
    if (r.status==="ERROR") h += `<div class="tc-detail" style="color:var(--c-orange)">${escHtml(r.output)}</div>`;
    if (r.status==="PASS")  h += `<div class="tc-detail">Output: <code>${escHtml(r.output)}</code></div>`;
    if (r.status==="TLE")   h += `<div class="tc-detail">Time limit exceeded (8s)</div>`;
    h += "</div>";
  });
  return h;
}

function setOutputHtml(h) { document.getElementById("outputBody").innerHTML=h; }
function clearOutput() { setOutputHtml('<span class="output-hint">Click ▶ Run to test visible cases, or ✔ Submit for full verdict</span>'); }

// ═══════════════════════════════════════════════════════════════
//  PHASE 3 — JUMBLED CODE
// ═══════════════════════════════════════════════════════════════
function renderJumbled(q, index) {
  showRegion("jumbledRegion");
  const r = document.getElementById("jumbledRegion");
  r.innerHTML = `<div class="jumbled-list-wrap" id="jList"></div><div id="jFB"></div>
    <div class="phase-actions">
      <button class="btn btn-ghost" id="jReshuffle">🔀 Reshuffle</button>
      <button class="btn btn-primary" id="jCheck">✔ Check Order</button>
    </div>`;

  const list = document.getElementById("jList");
  shuffle([...(q.lines||[]).map((_,i)=>i)]).forEach(origIdx => {
    const el = document.createElement("div");
    el.className = "j-item"; el.dataset.origIdx = origIdx;
    el.innerHTML = `<span class="j-handle" title="Drag">⠿</span><span>${escHtml((q.lines||[])[origIdx]||"")}</span>`;
    list.appendChild(el);
  });

  if (state.sortable) { state.sortable.destroy(); state.sortable=null; }
  state.sortable = Sortable.create(list, { animation:150, ghostClass:"sortable-ghost", chosenClass:"sortable-chosen", handle:".j-handle" });

  const saved = state.answers[index];
  if (saved?.submitted) { applyJumbledVisuals(saved.order, q.correctOrder); renderJumbledFB(saved.correct, saved.firstWrong); }

  document.getElementById("jReshuffle").addEventListener("click", () => {
    shuffle(Array.from(list.children)).forEach(el=>list.appendChild(el));
    document.querySelectorAll(".j-item").forEach(el=>el.classList.remove("j-correct","j-wrong"));
    document.getElementById("jFB").innerHTML="";
  });
  document.getElementById("jCheck").addEventListener("click", () => checkJumbled(index, q));
}

async function checkJumbled(index, q) {
  const items = Array.from(document.querySelectorAll(".j-item"));
  const order = items.map(el=>Number(el.dataset.origIdx));
  const btn   = document.getElementById("jCheck"); btn.disabled=true; btn.textContent="Checking…";

  const {ok,data,error} = await api.post("/dsa/check/jumbled",{questionId:q.id,order});
  btn.disabled=false; btn.textContent="✔ Check Order";

  let isCorrect,firstWrong,correctOrder;
  if (ok) { isCorrect=data.isCorrect; firstWrong=data.firstWrong; correctOrder=data.correctOrder; }
  else    { isCorrect=JSON.stringify(order)===JSON.stringify(q.correctOrder); firstWrong=isCorrect?-1:q.correctOrder.findIndex((v,i)=>order[i]!==v); correctOrder=q.correctOrder; }

  state.answers[index]={submitted:true,order,correct:isCorrect,firstWrong};
  applyJumbledVisuals(order,correctOrder); renderJumbledFB(isCorrect,firstWrong);
  updateQNav(); updateProgressTrack(); saveProgress();
}

function applyJumbledVisuals(order,correctOrder) {
  Array.from(document.querySelectorAll(".j-item")).forEach((el,i) => {
    el.classList.remove("j-correct","j-wrong");
    el.classList.add(order[i]===correctOrder[i]?"j-correct":"j-wrong");
  });
}

function renderJumbledFB(isCorrect,firstWrong) {
  const fb=document.getElementById("jFB"); if(!fb) return;
  fb.innerHTML = isCorrect
    ? `<div class="j-feedback correct">✅ Perfect! Code is in the correct order.</div>`
    : `<div class="j-feedback wrong">❌ First mistake at line ${(firstWrong||0)+1}. Red lines are wrong. Try again!</div>`;
  if (isCorrect) showToast("✅ Correct order!","pass");
}

// ═══════════════════════════════════════════════════════════════
//  PHASE 4 — MISSING CODE
// ═══════════════════════════════════════════════════════════════
function renderMissing(q, index) {
  showRegion("missingRegion");
  const r = document.getElementById("missingRegion");
  r.innerHTML = `<div class="missing-code-area"><pre class="missing-pre" id="missingPre"></pre></div>
    <div id="missingFB"></div>
    <div class="phase-actions">
      <button class="btn btn-ghost" id="mClear">✕ Clear</button>
      <button class="btn btn-primary" id="mCheck">✔ Check Answers</button>
    </div>`;

  const saved = state.answers[index];
  const pre   = document.getElementById("missingPre");
  const parts = (q.template||"").split("____");
  let   bIdx  = 0, html = "";
  parts.forEach((part,i) => {
    html += escHtml(part);
    if (i < parts.length-1) {
      const sv = saved?.userAnswers?.[bIdx]||"";
      html += `<input class="blank-input" data-bi="${bIdx}" value="${escAttr(sv)}" autocomplete="off" spellcheck="false" placeholder="?"/>`;
      bIdx++;
    }
  });
  pre.innerHTML = html;
  if (saved?.submitted) applyMissingVisuals(saved.results);

  document.getElementById("mClear").addEventListener("click",()=>{
    document.querySelectorAll(".blank-input").forEach(i=>{i.value="";i.classList.remove("b-correct","b-wrong");i.title="";});
    document.getElementById("missingFB").innerHTML="";
  });
  document.getElementById("mCheck").addEventListener("click",()=>checkMissing(index,q));
}

async function checkMissing(index, q) {
  const inputs = Array.from(document.querySelectorAll(".blank-input"));
  const userAnswers = inputs.map(i=>i.value);
  const btn=document.getElementById("mCheck"); btn.disabled=true; btn.textContent="Checking…";

  const {ok,data,error} = await api.post("/dsa/check/missing",{questionId:q.id,answers:userAnswers});
  btn.disabled=false; btn.textContent="✔ Check Answers";

  let allCorrect,results;
  if (ok) { allCorrect=data.allCorrect; results=data.results; }
  else    { results=(q.blanks||[]).map((c,i)=>({index:i,correct:(userAnswers[i]||"").trim()===c,hint:q.hints?.[i]||null})); allCorrect=results.every(r=>r.correct); }

  state.answers[index]={submitted:true,userAnswers,correct:allCorrect,results};
  applyMissingVisuals(results);
  const wrong=results.filter(r=>!r.correct).length;
  document.getElementById("missingFB").innerHTML = allCorrect
    ? `<div class="missing-feedback correct">✅ All blanks correct!</div>`
    : `<div class="missing-feedback wrong">❌ ${wrong} blank(s) wrong. Hover for hints.</div>`;
  if (allCorrect) showToast("✅ All correct!","pass");
  updateQNav(); updateProgressTrack(); saveProgress();
}

function applyMissingVisuals(results) {
  document.querySelectorAll(".blank-input").forEach((inp,i)=>{
    const r=results?.[i]; if(!r) return;
    inp.classList.remove("b-correct","b-wrong");
    inp.classList.add(r.correct?"b-correct":"b-wrong");
    if (!r.correct&&r.hint) inp.title=`Hint: ${r.hint}`;
  });
}

// ═══════════════════════════════════════════════════════════════
//  PHASE 5 — OPTIMIZE
// ═══════════════════════════════════════════════════════════════
function renderOptimize(q, index) {
  showRegion("optimizeRegion");
  const r     = document.getElementById("optimizeRegion");
  const saved = state.answers[index];

  r.innerHTML = `
    <div class="opt-insight"><strong>💡 Key Insight</strong>${escHtml(q.hint||q.explanation||"")}</div>
    <div class="complexity-grid">
      <div class="cx-card bad"><div class="cx-label">❌ Naive</div><div class="cx-value">${escHtml(q.currentComplexity||"—")}</div></div>
      <div class="cx-card good"><div class="cx-label">✅ Optimal</div><div class="cx-value">${escHtml(q.optimalComplexity||"—")}</div></div>
    </div>
    <div class="code-compare">
      <div class="cc-block bad"><div class="cc-header">❌ Slow</div><pre>${escHtml(q.badCode||"")}</pre></div>
      <div class="cc-block good"><div class="cc-header">✅ Optimal</div><pre>${escHtml(q.goodCode||"")}</pre></div>
    </div>
    ${q.question?`<div class="opt-question"><strong>🤔 Think About It</strong>${escHtml(q.question)}</div>`:""}
    <div class="phase-actions" style="border-top:none" id="optActions">
      ${saved?.correct
        ? `<span style="color:var(--c-green);font-weight:700">✅ Understood</span>`
        : `<button class="btn btn-success" id="optDone">✅ Got It — Mark Complete</button>`}
    </div>
  `;

  document.getElementById("optDone")?.addEventListener("click", () => {
    state.answers[index]={correct:true,submitted:true};
    document.getElementById("optActions").innerHTML=`<span style="color:var(--c-green);font-weight:700">✅ Understood!</span>`;
    updateQNav(); updateProgressTrack(); saveProgress();
    showToast("✅ Optimization mastered!","pass");
    if (state.currentIndex===state.questions.length-1) setTimeout(showCompletionModal,700);
  });
}

// ─── Completion Modal ────────────────────────────────────────────
function showCompletionModal() {
  const total   = state.questions.length;
  const correct = Object.values(state.answers).filter(a=>a?.correct).length;
  const pct     = total>0 ? Math.round(correct/total*100) : 0;
  document.getElementById("modalEmoji").textContent   = pct>=80?"🎉":"📚";
  document.getElementById("modalTitle").textContent   = pct>=80?"Section Complete!":"Keep Practicing!";
  document.getElementById("modalBody").textContent    = `${correct} of ${total} questions correct`;
  document.getElementById("scoreDisplay").textContent = `${pct}%`;
  document.getElementById("completionModal").classList.remove("hidden");
}
function closeModal() { document.getElementById("completionModal").classList.add("hidden"); }
function goNextPhase() {
  const i = PHASE_ORDER.indexOf(PHASE);
  if (i < PHASE_ORDER.length-1) {
    const p = new URLSearchParams({topic:TOPIC,subtopic:SUBTOPIC,phase:PHASE_ORDER[i+1]});
    location.href=`dsa-phase.html?${p}`;
  } else location.href="training-hub.html";
}

// ─── Theme ───────────────────────────────────────────────────────
function toggleTheme() {
  const dark = !document.body.classList.toggle("light-theme");
  if (state.editor) monaco.editor.setTheme(dark?"vs-dark":"vs");
}

// ─── Resize Handle ───────────────────────────────────────────────
function initResizeHandle() {
  const handle=document.getElementById("resizeHandle"), left=document.getElementById("leftPanel");
  if (!handle||!left) return;
  let drag=false,sx=0,sw=0;
  handle.addEventListener("mousedown",e=>{drag=true;sx=e.clientX;sw=left.offsetWidth;handle.classList.add("dragging");document.body.style.userSelect="none";document.body.style.cursor="col-resize";e.preventDefault();});
  document.addEventListener("mousemove",e=>{if(!drag)return;left.style.width=Math.max(240,Math.min(600,sw+(e.clientX-sx)))+"px";});
  document.addEventListener("mouseup",()=>{if(!drag)return;drag=false;handle.classList.remove("dragging");document.body.style.userSelect="";document.body.style.cursor="";state.editor?.layout();});
}

// ─── Toast ───────────────────────────────────────────────────────
function showToast(msg, type="info") {
  const t=document.getElementById("toast"); t.textContent=msg; t.className=`toast ${type}`;
  clearTimeout(state.toastTimer); state.toastTimer=setTimeout(()=>t.classList.add("hidden"),2800);
}

// ─── Progress ────────────────────────────────────────────────────
function saveProgress() {
  try {
    const all=JSON.parse(localStorage.getItem("ciet_progress")||"{}");
    const done=Object.values(state.answers).filter(a=>a?.correct).length;
    all[`${TOPIC}::${SUBTOPIC}::${PHASE}`]={correct:done,total:state.questions.length,ts:Date.now()};
    localStorage.setItem("ciet_progress",JSON.stringify(all));
  } catch(_) {}
}

// ─── Utilities ───────────────────────────────────────────────────
function escHtml(s) { return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"); }
function escAttr(s) { return escHtml(s).replace(/\n/g,"&#10;"); }
function shuffle(a) { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];} return b; }

