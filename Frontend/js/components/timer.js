let timerInterval  = null;
let remainingSeconds = 0;

function startTimer(minutes) {
  clearInterval(timerInterval);
  remainingSeconds = minutes * 60;
  _updateTimerUI();

  timerInterval = setInterval(() => {
    remainingSeconds--;
    _updateTimerUI();
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      if (typeof finishAssessment === "function") finishAssessment();
    }
  }, 1000);
}

function _updateTimerUI() {
  const el = document.getElementById("timer");
  if (!el) return;
  const m = Math.floor(remainingSeconds / 60);
  const s = remainingSeconds % 60;
  el.textContent = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  // Turn red in last 5 minutes
  el.classList.toggle("warning", remainingSeconds <= 300);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Legacy alias
function updateTimerUI() { _updateTimerUI(); }
