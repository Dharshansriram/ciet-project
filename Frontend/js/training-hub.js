"use strict";

const API = "http://localhost:5000";

const PHASE_META = {
  objective:   { num:"1", label:"Objective MCQ",   icon:"🎯", color:"#2f81f7" },
  codeEditor:  { num:"2", label:"Code Editor",     icon:"💻", color:"#3fb950" },
  jumbledCode: { num:"3", label:"Jumbled Code",    icon:"🔀", color:"#f59e0b" },
  missingCode: { num:"4", label:"Fill Blanks",     icon:"✏️", color:"#8b5cf6" },
  optimize:    { num:"5", label:"Optimize",        icon:"⚡", color:"#ef4444" }
};

let activeTab = "dsa";
let dsaTopics = [];
let aptTopics = [];
const progress = JSON.parse(localStorage.getItem("ciet_progress")||"{}");

// ── Init ──────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadDSATopics();
  loadAptTopics();
  renderHeroStats();
});

// ── Theme ─────────────────────────────────
function toggleTheme() {
  document.body.classList.toggle("light");
  const btn = document.querySelector(".btn-icon[onclick='toggleTheme()']");
  btn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
}

// ── Tab Switch ────────────────────────────
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
  document.getElementById("dsa-section").classList.toggle("hidden", tab !== "dsa");
  document.getElementById("aptitude-section").classList.toggle("hidden", tab !== "aptitude");
}

// ── Hero Stats ────────────────────────────
function renderHeroStats() {
  const el = document.getElementById("heroStats");
  el.innerHTML = `
    <div class="stat-card"><div class="stat-num">11+</div><div class="stat-label">DSA Topics</div></div>
    <div class="stat-card"><div class="stat-num">5</div><div class="stat-label">Phases/Topic</div></div>
    <div class="stat-card"><div class="stat-num">50+</div><div class="stat-label">Coding Q's</div></div>
    <div class="stat-card"><div class="stat-num">60+</div><div class="stat-label">Aptitude Q's</div></div>
  `;
}

// ── Load DSA Topics ───────────────────────
async function loadDSATopics() {
  try {
    const res  = await fetch(`${API}/api/training/dsa/topics`);
    const data = await res.json();
    dsaTopics  = data.topics || [];
  } catch(_) {
    dsaTopics = getFallbackDSATopics();
  }
  renderDSAGrid();
}

function getFallbackDSATopics() {
  return [
    { name:"Arrays",       icon:"📦", color:"#3b82f6", subtopics:["1D Arrays","2D Arrays / Matrix"] },
    { name:"Strings",      icon:"🔤", color:"#10b981", subtopics:["String Basics","Pattern Matching"] },
    { name:"Linked List",  icon:"🔗", color:"#f59e0b", subtopics:["Singly Linked List"] },
    { name:"Stack & Queue",icon:"📚", color:"#8b5cf6", subtopics:["Stack","Queue"] },
    { name:"Trees",        icon:"🌳", color:"#22c55e", subtopics:["Binary Trees","BST","Heap"] },
    { name:"Graphs",       icon:"🕸️", color:"#f97316", subtopics:["Graph Basics","DFS/BFS","Shortest Path"] },
    { name:"Sorting",      icon:"🔃", color:"#06b6d4", subtopics:["Comparison Sort","Non-Comparison Sort"] },
    { name:"Searching",    icon:"🔍", color:"#a855f7", subtopics:["Linear Search","Binary Search"] },
    { name:"Dynamic Programming", icon:"🧩", color:"#ec4899", subtopics:["1D DP","2D DP","DP on Strings"] },
    { name:"Hashing",      icon:"#️⃣", color:"#84cc16", subtopics:["Hash Map","Hash Set"] },
    { name:"Recursion",    icon:"🔄", color:"#14b8a6", subtopics:["Basic Recursion","Backtracking"] }
  ];
}

function renderDSAGrid() {
  const grid = document.getElementById("dsaGrid");
  grid.innerHTML = "";
  dsaTopics.forEach(topic => {
    const done = getTopicProgress(topic.name);
    const card = document.createElement("div");
    card.className = "topic-card";
    card.style.setProperty("--card-color", topic.color);
    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon">${topic.icon||"💡"}</div>
        <div>
          <div class="card-name">${escHtml(topic.name)}</div>
          <div class="card-sub">${(topic.subtopics||[]).length} subtopic${(topic.subtopics||[]).length!==1?"s":""}</div>
        </div>
      </div>
      <div class="card-chips">
        ${Object.entries(PHASE_META).map(([k,m])=>`<div class="chip">${m.icon} ${m.label}</div>`).join("")}
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width:${done}%;background:${topic.color}"></div>
      </div>
      <div class="card-footer">
        <span class="card-count">${done}% complete</span>
        <span class="card-arrow">→</span>
      </div>
    `;
    card.onclick = () => openDSADrawer(topic);
    grid.appendChild(card);
  });
}

function getTopicProgress(topicName) {
  const keys = Object.keys(progress).filter(k => k.startsWith(`dsa-${topicName}-`));
  // rough estimate
  return keys.length > 0 ? Math.min(100, keys.length * 5) : 0;
}

// ── Load Apt Topics ───────────────────────
async function loadAptTopics() {
  try {
    const res  = await fetch(`${API}/api/training/aptitude/topics`);
    const data = await res.json();
    aptTopics  = data.topics || [];
  } catch(_) {
    aptTopics = getFallbackAptTopics();
  }
  renderAptGrid();
}

function getFallbackAptTopics() {
  return [
    { name:"Ratio & Proportion",        icon:"⚖️", color:"#f59e0b", questionCount:5 },
    { name:"Time & Distance",           icon:"🚗", color:"#3b82f6", questionCount:5 },
    { name:"Time & Work",               icon:"⚒️", color:"#10b981", questionCount:5 },
    { name:"Percentage",                icon:"%",  color:"#8b5cf6", questionCount:5 },
    { name:"Profit & Loss",             icon:"💰", color:"#ef4444", questionCount:5 },
    { name:"Simple & Compound Interest",icon:"🏦", color:"#0ea5e9", questionCount:5 },
    { name:"Number System",             icon:"🔢", color:"#f97316", questionCount:5 },
    { name:"Averages",                  icon:"📊", color:"#22c55e", questionCount:5 },
    { name:"Permutation & Combination", icon:"🎲", color:"#a855f7", questionCount:5 },
    { name:"Probability",               icon:"🎯", color:"#06b6d4", questionCount:5 },
    { name:"Mensuration",               icon:"📐", color:"#84cc16", questionCount:5 },
    { name:"Data Interpretation",       icon:"📈", color:"#ec4899", questionCount:5 },
    { name:"Logical Reasoning",         icon:"🧠", color:"#6366f1", questionCount:5 }
  ];
}

function renderAptGrid() {
  const grid = document.getElementById("aptGrid");
  grid.innerHTML = "";
  aptTopics.forEach(topic => {
    const card = document.createElement("div");
    card.className = "topic-card";
    card.style.setProperty("--card-color", topic.color);
    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon">${topic.icon||"📝"}</div>
        <div>
          <div class="card-name">${escHtml(topic.name)}</div>
          <div class="card-sub">${topic.questionCount||5} questions</div>
        </div>
      </div>
      <div class="card-chips">
        <div class="chip">🎯 MCQ</div>
        <div class="chip">📖 Explanations</div>
        <div class="chip">⏱️ Timed</div>
      </div>
      <div class="card-footer">
        <span class="card-count">Scenario-based</span>
        <span class="card-arrow">→</span>
      </div>
    `;
    card.onclick = () => openAptDrawer(topic);
    grid.appendChild(card);
  });
}

// ── DSA Drawer ────────────────────────────
async function openDSADrawer(topic) {
  document.getElementById("drawerIcon").textContent  = topic.icon;
  document.getElementById("drawerTitle").textContent = topic.name;
  document.getElementById("drawerDesc").textContent  = "Select a subtopic and phase to start";
  document.getElementById("drawerBody").innerHTML    = '<div class="loading-placeholder">Loading...</div>';
  showDrawer();

  let subtopics = topic.subtopics || [];
  // Try loading full subtopic details
  try {
    const res  = await fetch(`${API}/api/training/dsa/topics/${encodeURIComponent(topic.name)}`);
    const data = await res.json();
    if (data.success) subtopics = data.subtopics || subtopics;
  } catch(_) {}

  renderDSADrawerBody(topic, subtopics);
}

function renderDSADrawerBody(topic, subtopics) {
  const body = document.getElementById("drawerBody");
  body.innerHTML = "";

  (Array.isArray(subtopics) && typeof subtopics[0] === "string"
    ? subtopics.map(s => ({ name:s, phases:Object.entries(PHASE_META).map(([k,m])=>({phase:k,count:5})) }))
    : subtopics
  ).forEach(sub => {
    const group = document.createElement("div");
    group.className = "subtopic-group";

    const header = document.createElement("div");
    header.className = "subtopic-header";
    header.innerHTML = `<span>${escHtml(sub.name)}</span><span class="arrow">▶</span>`;
    header.onclick = () => {
      header.classList.toggle("open");
      phases.style.display = header.classList.contains("open") ? "block" : "none";
    };

    const phases = document.createElement("div");
    phases.className = "subtopic-phases";
    phases.style.display = "none";

    Object.entries(PHASE_META).forEach(([phaseKey, meta]) => {
      const phaseInfo = sub.phases ? sub.phases.find(p => p.phase === phaseKey) : null;
      const count = phaseInfo ? phaseInfo.count : 5;
      const btn = document.createElement("button");
      btn.className = "phase-btn";
      btn.innerHTML = `
        <div class="phase-num">${meta.num}</div>
        <div class="phase-label">${meta.icon} ${meta.label}</div>
        <div class="phase-count">${count} questions</div>
      `;
      btn.onclick = () => {
        closeDrawer();
        launchDSAPhase(topic.name, sub.name, phaseKey);
      };
      phases.appendChild(btn);
    });

    group.appendChild(header);
    group.appendChild(phases);
    body.appendChild(group);
  });
}

// ── Aptitude Drawer ───────────────────────
function openAptDrawer(topic) {
  document.getElementById("drawerIcon").textContent  = topic.icon;
  document.getElementById("drawerTitle").textContent = topic.name;
  document.getElementById("drawerDesc").textContent  = `${topic.questionCount||5} scenario-based MCQ questions`;
  document.getElementById("drawerBody").innerHTML    = '';
  showDrawer();

  const body = document.getElementById("drawerBody");

  // Start all button
  const startBtn = document.createElement("button");
  startBtn.className = "apt-start-btn";
  startBtn.textContent = "▶ Start All 5 Questions";
  startBtn.onclick = () => { closeDrawer(); launchAptitude(topic.name); };
  body.appendChild(startBtn);

  // Divider
  const div = document.createElement("p");
  div.style.cssText = "font-size:0.75rem;color:var(--muted);text-align:center;margin:8px 0;text-transform:uppercase;letter-spacing:0.5px";
  div.textContent = "Questions preview";
  body.appendChild(div);
}

// ── Launch ────────────────────────────────
function launchDSAPhase(topic, subtopic, phase) {
  const params = new URLSearchParams({ topic, subtopic, phase });
  window.location.href = `dsa-phase.html?${params}`;
}

function launchAptitude(topicName) {
  const params = new URLSearchParams({ topic: topicName });
  window.location.href = `aptitude-quiz.html?${params}`;
}

// ── Drawer helpers ────────────────────────
function showDrawer() {
  document.getElementById("drawerOverlay").classList.remove("hidden");
  document.getElementById("subtopicDrawer").classList.remove("hidden");
}
function closeDrawer() {
  document.getElementById("drawerOverlay").classList.add("hidden");
  document.getElementById("subtopicDrawer").classList.add("hidden");
}

function escHtml(s) {
  return String(s||"")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// Handle URL param tab
window.addEventListener('load', () => {
  const t = new URLSearchParams(location.search).get('tab');
  if (t === 'aptitude') switchTab('aptitude');
});
