/*************************************************
 * SCORE ENGINE
 *************************************************/

function initScoreEngine() {
  AppState.sessionResult = {
    startTime: Date.now(),
    endTime: null,
    attempts: []
  };
}

/*************************************************
 * RECORD ATTEMPT
 *************************************************/
async function recordAttempt({ questionId, skill, isCorrect }) {
  const attempt = {
    questionId,
    skill,
    isCorrect,
    difficulty: "medium",
    time: Date.now()
  };
  AppState.sessionResult.attempts.push(attempt);
  logAttemptAnalytics(isCorrect);
  try {
    await apiRequest("/attempt", "POST", { questionId, skill, isCorrect });
  } catch (err) {
    console.error("Attempt save failed:", err.message);
  }
}

/*************************************************
 * FINISH ASSESSMENT
 *************************************************/
async function finishAssessment() {
  // ── ISSUE 1 FIX: Kill camera tracks + release all video srcObjects ──
  if (typeof stopAntiCheat === "function") stopAntiCheat();
  if (typeof stopWebcam   === "function") stopWebcam();
  // Belt-and-suspenders: kill every active media track in the page
  document.querySelectorAll("video").forEach(v => {
    if (v.srcObject) {
      v.srcObject.getTracks && v.srcObject.getTracks().forEach(t => t.stop());
      v.srcObject = null;
    }
  });

  AppState.isSubmitting = true;
  if (typeof loadPage === "function") loadPage("assessment");

  AppState.sessionResult.endTime = Date.now();

  const attempts     = AppState.sessionResult.attempts;
  const sessionTotal = AppState.session?.questions?.length || 0;
  const total        = sessionTotal;
  const correct      = attempts.filter(a => a.isCorrect).length;
  const wrong        = attempts.filter(a => !a.isCorrect).length;
  const timeTaken    = Math.round(
    (AppState.sessionResult.endTime - AppState.sessionResult.startTime) / 1000
  );

  if (typeof showSuccessPopup === "function") {
    showSuccessPopup("🎉 Congratulations! You successfully completed the assessment.");
  }
  if (window.socket) window.socket.emit("submit_exam");

  // Capture before async — AppState can change during await
  const currentMode  = AppState.mode  || "workout";
  const currentSkill = AppState.skill || "aptitude";

  // Pre-fill lastResult with client data immediately
  const clientScore = total > 0 ? Math.round((correct / total) * 100) : 0;
  AppState.lastResult = {
    assessmentType: currentSkill,
    mode:           currentMode,
    totalQuestions: total,
    correctAnswers: correct,
    wrongAnswers:   wrong,
    unattempted:    total - attempts.length,
    score:          clientScore,
    completionTime: timeTaken,
    certificate:    null,
  };

  try {
    const res = await apiRequest("/submit-assessment", "POST", {
      assessmentType:     currentSkill,
      mode:               currentMode,
      totalQuestions:     total,
      correctAnswers:     correct,
      wrongAnswers:       wrong,
      attemptedQuestions: attempts.length,
      completionTime:     timeTaken,
    });

    // Update with server-confirmed result
    AppState.lastResult = {
      assessmentType: currentSkill,
      mode:           currentMode,
      totalQuestions: total,
      correctAnswers: correct,
      wrongAnswers:   wrong,
      unattempted:    total - attempts.length,
      score:          res.score  || clientScore,
      completionTime: timeTaken,
      certificate:    res.certificate || null,
      attemptId:      res.attemptId   || null,
    };
    console.log("✅ Submit OK — cert:", res.certificate);
  } catch (err) {
    console.error("Submit API error:", err.message);
    // lastResult already set above, leave it
  }

  AppState.isSubmitting = false;
  setTimeout(() => navigate("results"), 1800);
}
