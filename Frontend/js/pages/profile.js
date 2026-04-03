
function ProfilePage() {


  const user = AppState.user;

  const badges = AppState.badges || [];
  const certs = AppState.certificates || [];

  // Session performance
  const attempts = AppState.sessionResult?.attempts || [];



  const correct = attempts.filter(a => a.isCorrect).length;
  const total = attempts.length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  /* ---------- LEARNER TITLE LOGIC ---------- */

  // Title loaded live from backend rank

  /* ---------- SKILL-WISE ANALYSIS ---------- */

  const aptitudeAttempts = attempts.filter(a => a.skill === "aptitude");
  const dsaAttempts = attempts.filter(a => a.skill === "dsa");

  const aptCorrect = aptitudeAttempts.filter(a => a.isCorrect).length;
  const dsaCorrect = dsaAttempts.filter(a => a.isCorrect).length;

  const aptAcc = aptitudeAttempts.length
    ? Math.round((aptCorrect / aptitudeAttempts.length) * 100)
    : 0;

  const dsaAcc = dsaAttempts.length
    ? Math.round((dsaCorrect / dsaAttempts.length) * 100)
    : 0;

  // Progress bars scale (max 500 credits)
  const aptProgress = aptAcc;
  const dsaProgress = dsaAcc;

  /* ---------- MOTIVATION QUOTE INIT ---------- */

  setTimeout(() => {
    rotateProfileQuotes();
    loadProfileStats();
  }, 200);

  return `
  <div class="profile-page">

    <!-- ================= HERO SECTION ================= -->
    <section class="profile-hero-pro">

      <!-- Left: Avatar & User Info -->
      <div class="hero-left">
        <div class="avatar-pro">${getInitials(user.name)}</div>

        <div class="hero-info">
          <h2>${user.name}</h2>
          <p class="hero-sub">${user.rollNo || "Roll No"} · ${user.dept.toUpperCase()} · Year ${user.year}</p>
          <span class="hero-title" id="pro-rank-title">Loading Rank...</span>
        </div>
      </div>

      <!-- Right: Key Stats -->
      <div class="hero-right">
        <div class="hero-stat">
          <h3 id="pro-total-attempts">-</h3>
          <p>Total Attempts</p>
        </div>
        <div class="hero-stat">
          <h3 id="pro-best-score">-</h3>
          <p>Best Score</p>
        </div>
        <div class="hero-stat">
          <h3 id="pro-avg-score">-</h3>
          <p>Average Score</p>
        </div>
        <div class="hero-stat">
          <h3 id="pro-rank">-</h3>
          <p>Current Rank</p>
        </div>
      </div>

      <div class="hero-glow"></div>
    </section>

    <!-- ================= MAIN GRID ================= -->
    <section class="profile-grid">

      <!-- ===== LEFT COLUMN ===== -->
      <div class="profile-col">

        <!-- Skill Progress Card -->
        <div class="pro-card">
          <div class="card-head">
            <h3>📈 Skill Progress Overview</h3>
            <span class="mini-tag">Live</span>
          </div>

          <div class="skill-progress">

            <!-- Aptitude -->
            <div class="skill-row">
              <div class="skill-left">
                <b>🧠 Aptitude</b>
                <span>${aptAcc}% accuracy</span>
              </div>
              <div class="bar">
                <div class="fill aptitude" style="width:${aptProgress}%"></div>
              </div>
            </div>

            <!-- DSA -->
            <div class="skill-row">
              <div class="skill-left">
                <b>💻 DSA</b>
                <span>${dsaAcc}% accuracy</span>
              </div>
              <div class="bar">
                <div class="fill dsa" style="width:${dsaProgress}%"></div>
              </div>
            </div>

          </div>

          <!-- CTA Buttons -->
          <div class="skill-actions">
            <button class="pro-btn" onclick="navigate('training')">
              🚀 Start Training
            </button>
            <button class="pro-btn-outline" onclick="navigate('certificates')">
              🎓 View Certificates
            </button>
             
          </div>
        </div>

        <!-- Weekly Activity -->
      
      </div>

      <!-- ===== RIGHT COLUMN ===== -->
      <div class="profile-col">

        <!-- Badges -->
        <div class="pro-card">
          <div class="card-head">
            <h3>🏅 Achievement Badges</h3>
            <span class="mini-tag">${badges.length}</span>
          </div>

          <div class="badge-grid">
            ${badges.length
      ? badges.map(b => `<div class="badge-pro">${b}</div>`).join("")
      : `<p class="muted">No badges yet. Start workouts 🔥</p>`
    }
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="pro-card">
          <div class="card-head">
            <h3>⚡ Recent Attempts</h3>
            <span class="mini-tag">${total}</span>
          </div>

          <div class="activity-list">
            ${renderRecentAttempts(attempts)}
          </div>
        </div>

        <!-- Motivation -->
        <div class="pro-card quote-card">
          <div class="card-head">
            <h3>💬 Daily Motivation</h3>
            <button class="mini-refresh" onclick="manualQuoteChange()">↻</button>
          </div>

          <p class="quote-text" id="quoteText">Loading motivation...</p>

          <p class="quote-sub">
            Daily practice = faster placements ✅
          </p>
        </div>

      </div>
    </section>
    <div class="about-floating" onclick="window.location.href='about.html'">
  <img src="assets/about-icon.png" alt="about" />
</div>
  </div>
  `;
}



function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function generateHeatmapBlocks() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const today = new Date().getDay(); // 0=Sun
  let html = "";
  for (let i = 0; i < 7; i++) {
    const dayIdx = (today - 6 + i + 7) % 7;
    const label  = days[dayIdx === 0 ? 6 : dayIdx - 1];
    const level  = 0; // Real data would come from backend
    html += `<div class="heat-col">
      <div class="heat-block level-${level}" title="${label}"></div>
      <span class="heat-label">${label}</span>
    </div>`;
  }
  return html;
}

function renderRecentAttempts(attempts) {
  if (!attempts.length) {
    return `<p class="muted">No attempts yet. Start training 🚀</p>`;
  }

  return attempts.slice(-6).reverse().map(a => `
    <div class="activity-item">
      <div class="dot ${a.isCorrect ? "good" : "bad"}"></div>
      <div class="activity-info">
        <b>${a.skill.toUpperCase()}</b>
        <span>
          ${a.difficulty.toUpperCase()} ·
          ${a.isCorrect ? "Correct ✅" : "Wrong ❌"}
        </span>
      </div>
    </div>
  `).join("");
}



const PROFILE_QUOTES = [
  "Discipline beats motivation. Show up daily ✅",
  "Today’s practice is tomorrow’s placement 💼",
  "Consistency is your secret weapon 🔥",
  "Stop scrolling. Start solving ⚡",
  "One question closer to your dream role 🚀",
  "Aptitude + DSA = Job Ready 🎯"
];

let quoteIndex = 0;

function rotateProfileQuotes() {
  const el = document.getElementById("quoteText");
  if (!el) return;

  el.classList.remove("quote-animate");
  void el.offsetWidth;

  el.textContent = PROFILE_QUOTES[quoteIndex % PROFILE_QUOTES.length];
  el.classList.add("quote-animate");

  quoteIndex++;
}

function manualQuoteChange() {
  rotateProfileQuotes();
}

/* =================================================
   ✅ NEW: LIVE PROFILE STATS
   Fetches real totals from the backend and updates
   the profile hero without re-rendering the page.
================================================= */
async function loadProfileStats() {
  const user = AppState.user;
  if (!user || !user.id) return;

  try {
    const data = await apiRequest(`/dashboard/${user.id}`);

    document.getElementById("pro-total-attempts").textContent = data.totalAttempts ?? "-";
    document.getElementById("pro-best-score").textContent = data.bestScore ?? "-";
    document.getElementById("pro-avg-score").textContent = data.avgScore != null ? data.avgScore + "%" : "-";

    const rankEl = document.getElementById("pro-rank");
    const rankTitleEl = document.getElementById("pro-rank-title");

    if (data.rank) {
      rankEl.textContent = "#" + data.rank;
      const title = data.rank <= 10 ? "Gold Performer 🏆" : (data.rank <= 50 ? "Silver Performer 🥈" : "Bronze Performer 🥉");
      rankTitleEl.textContent = `Rank #${data.rank} | ${title}`;
    } else {
      rankEl.textContent = "-";
      rankTitleEl.textContent = "Starter ⚡";
    }
  } catch (err) {
    console.warn("Profile live stats unavailable:", err.message);
  }
}
