function DashboardPage() {
  const user = AppState.user;
  const badges = AppState.badges || [];
  const certs = AppState.certificates || [];

  const attempts = AppState.sessionResult?.attempts || [];
  const total = attempts.length;
  const correct = attempts.filter(a => a.isCorrect).length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  const greet = getGreeting();
  const quote = getRandomQuote();

  // Skill analysis
  const aptitudeAttempts = attempts.filter(a => a.skill === "aptitude");
  const dsaAttempts = attempts.filter(a => a.skill === "dsa");

  const aptAcc = aptitudeAttempts.length
    ? Math.round((aptitudeAttempts.filter(a => a.isCorrect).length / aptitudeAttempts.length) * 100)
    : 0;

  const dsaAcc = dsaAttempts.length
    ? Math.round((dsaAttempts.filter(a => a.isCorrect).length / dsaAttempts.length) * 100)
    : 0;

  const weakSkill = pickWeakSkill(aptAcc, dsaAcc);

  // ✅ Safe streak (if analytics not loaded, fallback)
  const streak = (typeof getStreakDays === "function") ? getStreakDays() : 0;
setTimeout(() => {
  setupThemeToggle();
}, 100);

  return `
    <div class="dash-page">

      <section class="dash-hero">
        <div class="dash-hero-left">
        <div class="theme-switch-wrapper">
  <label class="theme-switch">
    <input type="checkbox" id="themeToggle">
    <span class="slider"></span>
  </label>
</div>
          <h2>${greet}, <span class="name-glow">${user.name}</span> 👋</h2>
          <p>Track your progress, improve daily, and unlock certificates faster.</p>

          <div class="dash-hero-actions">
            <button class="dash-btn-primary" onclick="navigate('training')">
              🚀 Start Training
            </button>
            <button class="dash-btn-secondary" onclick="navigate('profile')">
              👤 View Profile
            </button>
          </div>

          <div class="dash-quote">
            <span>💡</span>
            <p>${quote}</p>
          </div>
        </div>

        <div class="dash-hero-right">
          <div class="hero-mini-card">
            <h3 id="dash-stat-attempts">-</h3>
            <p>Total Attempts</p>
          </div>
          <div class="hero-mini-card">
            <h3 id="dash-stat-accuracy">-</h3>
            <p>Avg Score</p>
          </div>
          <div class="hero-mini-card">
            <h3 id="dash-stat-best">-</h3>
            <p>Best Score</p>
          </div>
          <div class="hero-mini-card">
            <h3 id="dash-stat-rank">-</h3>
            <p>Rank</p>
          </div>
        </div>

        <div class="dash-hero-glow"></div>
      </section>

      <section class="dash-grid">

        <div class="dash-col">

          <div class="dash-card">
            <div class="dash-head">
              <h3>📈 Skill Progress</h3>
              <span class="dash-tag">Live</span>
            </div>

            <div class="dash-bars">
              <div class="dash-bar-row">
                <div class="dash-bar-top">
                  <b>🧠 Aptitude</b>
                  <span>${aptAcc}% accuracy</span>
                </div>
                <div class="dash-bar">
                  <div class="dash-fill apt" data-width="${aptAcc}"></div>
                </div>
              </div>

              <div class="dash-bar-row">
                <div class="dash-bar-top">
                  <b>💻 DSA</b>
                  <span>${dsaAcc}% accuracy</span>
                </div>
                <div class="dash-bar">
                  <div class="dash-fill dsa" data-width="${dsaAcc}"></div>
                </div>
              </div>
            </div>

            <div class="dash-recommend">
              <div class="recommend-box">
                <h4>🎯 Recommended Next</h4>
                <p>
                  Your weak area is <b>${weakSkill.toUpperCase()}</b>.
                  Do 1 workout now to improve faster.
                </p>

                <button class="dash-btn-primary small" onclick="startRecommended('${weakSkill}')">
                  Start ${weakSkill.toUpperCase()} Workout
                </button>
              </div>
            </div>
          </div>

          

        </div>

        <div class="dash-col">

          <div class="dash-card">
            <div class="dash-head">
              <h3>🏅 Badges</h3>
              <span class="dash-tag">${badges.length}</span>
            </div>

            <div class="dash-badges">
              ${badges.length
      ? badges.map(b => `<div class="badge-pill">${b}</div>`).join("")
      : `<p class="dash-muted">No badges yet. Start workouts 🔥</p>`
    }
            </div>
          </div>

          <div class="dash-card">
            <div class="dash-head">
              <h3>⚡ Recent Attempts</h3>
              <span class="dash-tag">${total}</span>
            </div>

            <div class="dash-activity">
              ${renderRecentAttemptsDash(attempts)}
            </div>
          </div>

          <div class="dash-card">
            <div class="dash-head">
              <h3>🎓 Your Certificates</h3>
              <span class="dash-tag" id="dash-cert-count">—</span>
            </div>
            <div style="padding:8px 0 4px;">
              <p style="font-size:13px;color:#64748b;margin:0 0 14px;line-height:1.6;">
                Complete <b>Workout</b> assessments with <b>60%+</b> to earn certificates.
              </p>
              <button class="dash-btn-secondary small" onclick="navigate('certificates')" style="width:100%;">
                View All Certificates →
              </button>
            </div>
          </div>

        </div>

      </section>
    </div>
  `;
}

/* ================= HELPERS ================= */

function getGreeting() {
  const hr = new Date().getHours();
  if (hr < 12) return "Good Morning";
  if (hr < 17) return "Good Afternoon";
  return "Good Evening";
}

function getRandomQuote() {
  const quotes = [
    "Do workouts daily → unlock certificates faster 🔥",
    "DSA is your interview weapon 💻",
    "Aptitude makes your rounds easy 🧠",
    "Consistency creates placements ✅",
    "1% improvement daily = huge results 🚀"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function pickWeakSkill(aptAcc, dsaAcc) {
  if (aptAcc === 0 && dsaAcc === 0) return "aptitude";
  return aptAcc <= dsaAcc ? "aptitude" : "dsa";
}

function startRecommended(skill) {
  navigate("training");
}

function animateBars() {
  document.querySelectorAll(".dash-fill").forEach(bar => {
    const w = bar.getAttribute("data-width");
    bar.style.width = w + "%";
  });
}

/* ✅ SAFE weekly chart (won't break dashboard) */
function renderWeekChartSafe() {
  // If analytics.js not loaded, fallback to simple bars
  if (typeof getWeeklyAttempts !== "function") {
    let html = "";
    for (let i = 0; i < 7; i++) {
      const height = 25 + Math.floor(Math.random() * 70);
      html += `<div class="week-bar" style="height:${height}%"></div>`;
    }
    return html;
  }

  // Real weekly chart
  const week = getWeeklyAttempts();
  const max = Math.max(...week.map(w => w.attempts), 1);

  return week.map(day => {
    const height = Math.round((day.attempts / max) * 100);
    const label = day.date.slice(5);

    return `
      <div class="week-col">
        <div class="week-bar" style="height:${height}%"></div>
        <span class="week-label">${label}</span>
      </div>
    `;
  }).join("");
}

function renderRecentAttemptsDash(attempts) {
  if (!attempts.length) {
    return `<p class="dash-muted">No attempts yet. Start training now 🚀</p>`;
  }

  const last = attempts.slice(-5).reverse();

  return last.map(a => `
    <div class="attempt-row">
      <div class="attempt-dot ${a.isCorrect ? "good" : "bad"}"></div>
      <div class="attempt-info">
        <b>${a.skill.toUpperCase()}</b>
        <span>${a.difficulty.toUpperCase()} · ${a.isCorrect ? "Correct ✅" : "Wrong ❌"}</span>
      </div>
    </div>
  `).join("");
}

/* =================================================
   ✅ NEW: LIVE DASHBOARD STATS
   Fetches real totals from the backend and updates
   the hero mini-cards without re-rendering the page.
================================================= */

async function loadDashboardStats() {
  const user = AppState.user;
  if (!user || !user.id) return;

  try {
    const data = await apiRequest(`/dashboard/${user.id}`);

    // FIX BUG 4: use stable IDs — no positional index fragility
    const el = (id) => document.getElementById(id);
    if (el("dash-stat-attempts")) el("dash-stat-attempts").textContent = data.totalAttempts ?? "-";
    if (el("dash-stat-accuracy")) el("dash-stat-accuracy").textContent = data.avgScore != null ? data.avgScore + "%" : "-";
    if (el("dash-stat-best"))     el("dash-stat-best").textContent     = data.bestScore ?? "-";
    if (el("dash-stat-rank"))     el("dash-stat-rank").textContent     = data.rank ? "#" + data.rank : "-";
    // Cert count
    const certCount = document.getElementById("dash-cert-count");
    if (certCount) certCount.textContent = data.certCount ?? "0";

  } catch (err) {
    // Non-fatal: dashboard still renders without live stats
    console.warn("Dashboard live stats unavailable:", err.message);
  }
}
