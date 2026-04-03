/*************************************************
 * ASSESSMENT PAGE
 * - Static webcam (lives outside question DOM)
 * - Static timer  (lives outside question DOM)
 * - Previous button for both practice & workout
 *************************************************/

function AssessmentPage() {
  if (AppState.isSubmitting) {
    return `
      <div class="assessment" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:80vh;gap:16px;">
        <div style="font-size:2.5rem;">⏳</div>
        <h2 style="color:#4f46e5;margin:0;">Calculating your score...</h2>
        <p style="color:#64748b;margin:0;">Please wait a moment.</p>
        <div class="loader" style="margin-top:12px;"></div>
      </div>`;
  }

  if (!AppState.session || !AppState.session.questions.length) {
    return `
      <div class="assessment">
        <h2>No questions loaded</h2>
        <p>Please start from the Training page.</p>
        <button class="submit-btn" onclick="navigate('training')">Go to Training</button>
      </div>`;
  }

  const q        = getCurrentQuestion();
  const isWorkout = AppState.mode === "workout";
  const idx      = AppState.session.index;
  const total    = AppState.session.questions.length;

  if (!q) {
    finishAssessment();
    return `<div class="assessment"><p>Finishing...</p></div>`;
  }

  // Render shell ONCE — timer and webcam are injected into fixed containers
  // that survive question navigation without re-rendering
  const html = `
    <div class="assessment-shell">

      <!-- ── STATIC HEADER (timer + webcam never re-render) ── -->
      <div class="assessment-topbar" id="assessmentTopbar">
        <div class="topbar-left">
          <div class="assess-title">${AppState.skill.toUpperCase()} · ${isWorkout ? "WORKOUT" : "PRACTICE"}</div>
          <div class="assess-progress">Question <b>${idx + 1}</b> of <b>${total}</b></div>
        </div>
        <div class="topbar-center">
          ${isWorkout ? `<div class="timer-pill" id="timer">25:00</div>` : ""}
        </div>
        <div class="topbar-right">
          <!-- WEBCAM DISABLED FOR APTITUDE — enable when DSA code editor launches
          ${isWorkout ? `
            <div class="webcam-box">
              <video id="proctorWebcam" autoplay playsinline muted></video>
            </div>` : ""}
          -->
        </div>
      </div>

      <!-- ── QUESTION AREA (only this part re-renders) ── -->
      <div class="question-area" id="questionArea">
        ${AppState.skill === "aptitude" ? renderAptitude(q) : renderDsa(q)}
      </div>

    </div>`;

  // Init timer + webcam after first render only
  setTimeout(() => {
    if (isWorkout) {
      if (!AppState.timerStarted) {
        AppState.timerStarted = true;
        startTimer(25);
      }
      // if (typeof attachWebcam === "function") attachWebcam(); // Webcam off for aptitude
    }
  }, 50);

  return html;
}

/* ── Navigate between questions WITHOUT full page re-render ── */
function _renderQuestion() {
  const area = document.getElementById("questionArea");
  if (!area) { navigate("assessment"); return; }

  const q = getCurrentQuestion();
  if (!q) { finishAssessment(); return; }

  const idx   = AppState.session.index;
  const total = AppState.session.questions.length;

  // Update progress label
  const prog = document.querySelector(".assess-progress");
  if (prog) prog.innerHTML = `Question <b>${idx + 1}</b> of <b>${total}</b>`;

  // Replace only the question area — timer and webcam untouched
  area.innerHTML = AppState.skill === "aptitude" ? renderAptitude(q) : renderDsa(q);
  area.style.animation = "none";
  void area.offsetWidth;
  area.style.animation = "qFadeIn .2s ease";
}

/* ── APTITUDE ── */
function renderAptitude(q) {
  const idx   = AppState.session.index;
  const total = AppState.session.questions.length;
  const hasPrev = idx > 0;
  // Restore previously selected answer
  const savedAnswer = AppState.session.selectedAnswers?.[idx];

  const optionsHtml = q.options.map((opt,i) => `
    <label class="mcq-option ${savedAnswer==i?'selected':''}">
      <input type="radio" name="mcq" value="${i}" ${savedAnswer==i?'checked':''}>
      <span>${opt}</span>
    </label>`).join("");

  return `
    <div class="question-card">
      <p class="problem">${q.question}</p>
      <div class="options">${optionsHtml}</div>
      <div class="q-actions">
        <button class="btn-prev" onclick="prevQuestion()" ${hasPrev?"":"disabled"}>← Previous</button>
    <button class="btn-skip" onclick="skipQuestion()">
    ⏭ Skip
  </button>

        <button class="btn-next" onclick="submitAptitude(${q.correctAnswer})">
          ${idx === total-1 ? "Submit Assessment ✓" : "Next →"}
        </button>
      </div>
    </div>`;
}

/* ── DSA ── */
function renderDsa(q) {
  const idx   = AppState.session.index;
  const total = AppState.session.questions.length;
  const hasPrev = idx > 0;

  return `
    <div class="question-card">
      <h3>${q.title}</h3>
      <p class="problem">${q.description}</p>
      <textarea id="codeAnswer" rows="10" placeholder="// Write your solution here..."></textarea>
      <div class="q-actions">
        <button class="btn-prev" onclick="prevQuestion()" ${hasPrev?"":"disabled"}>← Previous</button>
    
        <button class="btn-next" onclick="submitDsa()">
          ${idx === total-1 ? "Submit Assessment ✓" : "Next →"}
        </button>
      </div>
    </div>`;
}

/* ── Submit handlers ── */
function submitAptitude(correctAnswer) {
  const selected = document.querySelector("input[name='mcq']:checked");
  if (!selected) { _shake(); return; }

  const idx = AppState.session.index;
  // Always save selected answer for restoration on Previous
  if (!AppState.session.selectedAnswers) AppState.session.selectedAnswers = {};
  AppState.session.selectedAnswers[idx] = parseInt(selected.value);

  // Only record attempt once
  if (!AppState.session.answered?.[idx]) {
    const isCorrect = parseInt(selected.value) === correctAnswer;
    if (!AppState.session.answered) AppState.session.answered = {};
    AppState.session.answered[idx] = true;
    recordAttempt({ questionId: getCurrentQuestion().id, skill:"aptitude", isCorrect });
  }
  _advance();
}

function submitDsa() {
  const code = document.getElementById("codeAnswer")?.value.trim();
  if (!code) { _shake(); return; }

  const alreadyAnswered = AppState.session.answered?.[AppState.session.index];
  if (!alreadyAnswered) {
    if (!AppState.session.answered) AppState.session.answered = {};
    AppState.session.answered[AppState.session.index] = true;
    recordAttempt({ questionId: getCurrentQuestion().id, skill:"dsa", isCorrect:true });
  }
  _advance();
}

function prevQuestion() {
  if (AppState.session.index > 0) {
    AppState.session.index--;
    _renderQuestion();
  }
}

function _advance() {
  const next = AppState.session.index + 1;

  if (next >= AppState.session.questions.length) {

    // 🔥 CHECK FOR SKIPPED QUESTIONS
    const skipped = AppState.session.skipped || {};
    const skippedIndexes = Object.keys(skipped).map(Number);

    if (skippedIndexes.length > 0 && !AppState.reviewMode) {
      // enter review mode
      AppState.reviewMode = true;
      AppState.reviewQueue = skippedIndexes;
      AppState.reviewIndex = 0;

      AppState.session.index = AppState.reviewQueue[0];
      _renderQuestion();
      return;
    }

    // no skipped OR already reviewed → finish
    stopTimer && stopTimer();
    finishAssessment();

  } else {
    AppState.session.index = next;
    _renderQuestion();
  }

  if (AppState.reviewMode) {
  AppState.reviewIndex++;

  if (AppState.reviewIndex >= AppState.reviewQueue.length) {
    stopTimer && stopTimer();
    finishAssessment();
    return;
  }

  AppState.session.index = AppState.reviewQueue[AppState.reviewIndex];
  _renderQuestion();
  return;
}
}

  function skipQuestion() {
  const idx = AppState.session.index;

  // mark skipped (optional but recommended)
  if (!AppState.session.skipped) AppState.session.skipped = {};
  AppState.session.skipped[idx] = true;

  _advance();
}

function _shake() {
  const card = document.querySelector(".question-card");
  if (!card) return;
  card.style.animation = "shake .3s ease";
  setTimeout(() => card.style.animation = "", 350);
  card.style.outline = "2px solid #ef4444";
  setTimeout(() => card.style.outline = "", 1200);
}
