/*************************************************
 * LEADERBOARD PAGE
 *************************************************/

let leaderboardData = [];

function LeaderboardPage() {

  // Load leaderboard after page render
  setTimeout(loadLeaderboard, 100);

  return `
    <div class="leaderboard-page">

      <!-- HERO -->
      <div class="lb-hero">
        <div>
          <h2>Leaderboard</h2>
          <p>Top performers based on assessment score</p>
        </div>

        <div class="lb-actions">
          <select id="deptFilter" class="lb-select" onchange="applyLeaderboardFilters()">
            <option value="all">All Departments</option>
            <option value="cse">CSE</option>
            <option value="it">IT</option>
            <option value="aids">AI&amp;DS</option>
            <option value="aiml">AIML</option>
            <option value="cyber security">Cyber Security</option>
            <option value="ece">ECE</option>
            <option value="eee">EEE</option>
          </select>

          <input
            id="lbSearch"
            class="lb-search"
            placeholder="Search student…"
            oninput="applyLeaderboardFilters()"
          />
        </div>
      </div>

      <!-- PODIUM -->
      <div class="lb-podium" id="lbPodium"></div>

      <!-- TABLE -->
      <div class="lb-card">
        <div class="lb-card-head">
          <h3>Rankings</h3>
          <span class="lb-tag" id="lbCountTag">Loading…</span>
        </div>
        <div class="lb-table" id="lbTable"></div>
      </div>

    </div>
  `;
}


/*************************************************
 * DATA LOAD
 *************************************************/

async function loadLeaderboard() {
  try {
    const data = await apiRequest("/leaderboard");

    leaderboardData = data.map(item => ({
      name: item.name || "Student",
      dept: (item.dept || "cse").toLowerCase(),
      year: item.year || "-",
      credits: item.score || 0,
      completionTime: item.completionTime || 0,
      badges: []
    }));

    renderLeaderboardTable(leaderboardData);
  } catch (err) {
    console.error("Leaderboard error:", err);
  }
}


/*************************************************
 * FILTER SYSTEM
 *************************************************/

function applyLeaderboardFilters() {
  const dept  = document.getElementById("deptFilter")?.value || "all";
  const query = (document.getElementById("lbSearch")?.value || "").toLowerCase().trim();

  const filtered = leaderboardData.filter(s => {
    const okDept   = dept === "all" || s.dept === dept;
    const okSearch = s.name.toLowerCase().includes(query);
    return okDept && okSearch;
  });

  renderLeaderboardTable(filtered);
}


/*************************************************
 * TABLE RENDER
 *************************************************/

function renderLeaderboardTable(students) {

  /* --- podium --- */
  const podium = document.getElementById("lbPodium");
  if (podium) podium.innerHTML = renderPodium(students.slice(0, 3));

  /* --- count tag --- */
  const countTag = document.getElementById("lbCountTag");
  if (countTag) countTag.innerText = `${students.length} students`;

  /* --- table --- */
  const table = document.getElementById("lbTable");
  if (!table) return;

  if (!students.length) {
    table.innerHTML = `<p class="lb-empty">No students found.</p>`;
    return;
  }

  table.innerHTML = `
    <div class="lb-row lb-head">
      <span>#</span>
      <span>Name</span>
      <span>Dept</span>
      <span>Year</span>
      <span>Score</span>
    </div>

    ${students.map((s, i) => `
      <div class="lb-row ${isCurrentUser(s.name) ? "me" : ""}">

        <span class="rank">${i + 1}</span>

        <span class="name">
          ${s.name}
          ${isCurrentUser(s.name) ? `<b class="me-tag">You</b>` : ""}
        </span>

        <span class="dept">${formatDept(s.dept)}</span>

        <span class="year">Yr ${s.year}</span>

        <span class="lb-muted">${s.credits}%</span>

      </div>
    `).join("")}
  `;
}


/*************************************************
 * PODIUM RENDER
 *************************************************/

function renderPodium(top3) {
  const [first, second, third] = top3;

  /* Order: silver (2nd) · gold (1st) · bronze (3rd) — classic podium layout */
  return `
    <div class="podium-card silver">
      ${second ? podiumUser(second, "🥈", 2) : emptyPodium("🥈")}
    </div>

    <div class="podium-card gold">
      ${first  ? podiumUser(first,  "🥇", 1) : emptyPodium("🥇")}
    </div>

    <div class="podium-card bronze">
      ${third  ? podiumUser(third,  "🥉", 3) : emptyPodium("🥉")}
    </div>
  `;
}


function podiumUser(s, medal, rank) {
  return `
    <div class="podium-tag">${medal}</div>
    <div class="podium-avatar">${getInitials(s.name)}</div>
    <h3>${s.name}</h3>
    <p>${formatDept(s.dept)} &middot; Year ${s.year}</p>
    <div class="podium-credits">${s.credits}%</div>
  `;
}


function emptyPodium(medal) {
  return `
    <div class="podium-tag">${medal}</div>
    <div class="podium-avatar">—</div>
    <h3>—</h3>
    <p>—</p>
    <div class="podium-credits">—</div>
  `;
}


/*************************************************
 * HELPERS
 *************************************************/

function isCurrentUser(name) {
  return AppState.user?.name === name;
}


function formatDept(d) {
  if (!d) return "—";
  const map = { aids: "AI&DS", aiml: "AIML", "cyber security": "CYBER" };
  return map[d] ?? d.toUpperCase();
}

// NOTE: getInitials() is defined in profile.js — shared across leaderboard and profile.
