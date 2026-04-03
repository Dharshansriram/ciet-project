/*************************************************
 * results.js  –  Results Page
 *************************************************/

function ResultsPage() {
  const r = AppState.lastResult;

  if (!r) {
    return `
      <div class="results-page">
        <div class="results-card">
          <h2>No Result Found</h2>
          <p>Please complete an assessment first.</p>
          <button class="res-btn primary" onclick="navigate('training')">Start Assessment</button>
        </div>
      </div>`;
  }

  const totalQs    = AppState.session ? AppState.session.questions.length : r.totalQuestions;
  const attempted  = r.totalQuestions;
  const unattempted = Math.max(0, totalQs - attempted);
  const pct        = attempted > 0 ? Math.round((r.correctAnswers / attempted) * 100) : 0;
  const grade      = computeGradeClient(r.score);
  const passed     = r.score >= 60;
  const isWorkout  = (r.mode === "workout") || (AppState.mode === "workout");
  // Show cert buttons whenever passed + workout — even if cert obj not in state yet
  const hasCert    = passed && isWorkout;

  // After render: fetch cert from DB in case it wasn't in the submit response
  setTimeout(() => _tryLoadCertButtons(passed, isWorkout), 400);

  return `
  <div class="results-page">
    <div class="results-card">

      <div class="res-header ${passed ? 'pass' : 'fail'}">
        <div class="res-icon">${passed ? "🎉" : "📝"}</div>
        <h2>${passed ? "Assessment Passed!" : "Assessment Completed"}</h2>
        <p class="res-subtitle">
          ${(r.assessmentType || "APTITUDE").toUpperCase()} · ${isWorkout ? "WORKOUT" : "PRACTICE"}
        </p>
      </div>

      <div class="res-score-ring ${passed ? 'pass' : 'fail'}">
        <svg viewBox="0 0 120 120" class="ring-svg">
          <circle class="ring-bg" cx="60" cy="60" r="50"/>
          <circle class="ring-fill" cx="60" cy="60" r="50"
            stroke-dasharray="${pct * 3.14} 314"
            stroke-dashoffset="78.5"/>
        </svg>
        <div class="ring-label">
          <span class="ring-score">${r.score}</span>
          <span class="ring-sub">Score</span>
        </div>
      </div>

      <div class="res-stats">
        <div class="res-stat"><span class="res-stat-value">${totalQs}</span><span class="res-stat-label">📋 Total</span></div>
        <div class="res-stat"><span class="res-stat-value">${attempted}</span><span class="res-stat-label">✍️ Attempted</span></div>
        <div class="res-stat"><span class="res-stat-value">${unattempted}</span><span class="res-stat-label">⏭️ Skipped</span></div>
        <div class="res-stat"><span class="res-stat-value">${r.correctAnswers}</span><span class="res-stat-label">✅ Correct</span></div>
        <div class="res-stat"><span class="res-stat-value">${r.wrongAnswers}</span><span class="res-stat-label">❌ Wrong</span></div>
        <div class="res-stat"><span class="res-stat-value grade-${grade}">${grade}</span><span class="res-stat-label">🏅 Grade</span></div>
      </div>

      ${passed ? `
        <div class="res-pass-banner">
          🏆 Congratulations! You passed with <strong>${pct}% accuracy</strong>.
          ${hasCert ? " Your certificate has been generated! 🎓" : ""}
        </div>` : `
        <div class="res-fail-banner">
          Keep practicing! You need a score of 60 to pass.
        </div>`}

      <div class="res-actions" id="resActions">
        ${hasCert ? `
          <button class="res-btn primary" onclick="navigate('certificates')">🎓 View Certificate</button>
          <button class="res-btn secondary" onclick="navigate('certificates')">⬇️ Download Certificate</button>
        ` : ""}
        ${!passed ? `
          <button class="res-btn primary" onclick="retakeAssessment()">🔄 Retake Test</button>
        ` : ""}
        <button class="res-btn secondary" onclick="navigate('leaderboard')">🏆 Leaderboard</button>
        <button class="res-btn ghost" onclick="navigate('dashboard')">📊 Dashboard</button>
      </div>

    </div>
  </div>`;
}

/* Fetch cert from server to confirm it exists + show popup */
async function _tryLoadCertButtons(passed, isWorkout) {
  if (!passed || !isWorkout) return;
  const user = AppState.user;
  if (!user || !user.id) return;

  try {
    const data  = await apiRequest(`/certificate/${user.id}`);
    const certs = data.certificates || [];
    if (certs.length === 0) return;

    const cert = certs[0];

    // Update AppState cert
    if (AppState.lastResult) AppState.lastResult.certificate = cert;

    // Show popup
    if (typeof showCertificatePopup === "function") {
      showCertificatePopup(
        cert.userName || user.name,
        cert.assessmentName || "Aptitude Assessment",
        cert.grade,
        cert.score
      );
    }
  } catch (err) {
    console.warn("Cert fetch on results page failed:", err.message);
  }
}

function retakeAssessment() {
  const skill = AppState.skill;
  const mode  = AppState.mode;
  if (!skill || !mode) { navigate("training"); return; }
  startAssessmentSession(skill, mode);
  navigate("assessment");
}

function computeGradeClient(score) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "F";
}

function formatSeconds(sec) {
  if (!sec) return "--:--";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
