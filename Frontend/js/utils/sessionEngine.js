function startAssessmentSession(skill, mode) {

  // ── DSA GUARD: block DSA until module is ready ────
  if (skill === "dsa") {
    if (typeof showDsaUnderConstruction === "function") {
      showDsaUnderConstruction();
    }
    return; // do NOT start session
  }

  let questions = [];

  if (skill === "aptitude") {
    questions = getAptitudeQuestions(mode);
  }

  if (skill === "dsa") {
    questions = getDsaQuestions(mode);
  }

  AppState.session = {
    questions: shuffleArray(questions).slice(0, 25),
    index: 0,
    answered: {},
    selectedAnswers: {}
  };

  // FIX BUG 2: reset timer guard — assessment.js checks this flag to start
  // the timer exactly once, even though the page re-renders per question.
  AppState.timerStarted = false;

  initScoreEngine();

  // Start anti-cheat & webcam monitoring for workout mode
  if (mode === "workout") {
    if (typeof startAntiCheat === "function") startAntiCheat();
    // WEBCAM DISABLED FOR APTITUDE TRIAL — uncomment when DSA code editor is ready
    // if (typeof startWebcam === "function") startWebcam();
  }

  // ✅ Emit join exam event
  if (window.socket && AppState.user) {
    window.socket.emit("join_exam", {
      name: AppState.user.name,
      rollNo: AppState.user.rollNo,
      dept: AppState.user.dept,
      assessmentType: skill
    });
  }
}

function getCurrentQuestion() {
  return AppState.session.questions[AppState.session.index];
}

function nextQuestion() {
  // Delegated to _advance() in assessment.js for in-place rendering
  if (typeof _advance === "function") { _advance(); return; }
  AppState.session.index++;
  if (AppState.session.index >= AppState.session.questions.length) {
    stopTimer && stopTimer();
    finishAssessment();
  } else {
    navigate("assessment");
  }
}
