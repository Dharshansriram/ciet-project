function TrainingPage() {
    return `
    <div class="training">
      <div class="training-header">
        <h2>🧠 Training Hub</h2>
        <p>Practice with topic-based modules. Each topic has subtopics with 5 progressive learning phases.</p>
      </div>
      <div class="training-grid">

        <div class="training-card">
          <div class="card-icon">🔢</div>
          <h3>Aptitude</h3>
          <p>Ratio & Proportion, Time-Distance, Profit-Loss, Probability and 9 more topics — 5 questions each.</p>
          <div class="card-meta">
            <span class="meta-tag">13 Topics</span>
            <span class="meta-tag">65+ Questions</span>
            <span class="meta-tag">IndiaBix Style</span>
          </div>
          <div class="training-actions">
            <button class="practice-btn" onclick="startPractice('aptitude')">Practice</button>
            <button class="workout-btn"  onclick="startWorkout('aptitude')">Workout</button>
          </div>
        </div>

        <div class="training-card dsa-card">
          <div class="card-icon">💻</div>
          <h3>DSA Training <span class="new-tag">NEW</span></h3>
          <p>11 topics × multiple subtopics × 5 phases: Objective → Code Editor → Jumbled Code → Fill Blanks → Optimize.</p>
          <div class="card-meta">
            <span class="meta-tag">11 Topics</span>
            <span class="meta-tag">50+ Problems</span>
            <span class="meta-tag">Code Runner</span>
            <span class="meta-tag">LeetCode Style</span>
          </div>
          <div class="dsa-phases-mini">
            <span class="phase-chip">🎯 Objective</span>
            <span class="phase-chip">💻 Code Editor</span>
            <span class="phase-chip">🔀 Jumbled</span>
            <span class="phase-chip">✏️ Fill Blanks</span>
            <span class="phase-chip">⚡ Optimize</span>
          </div>
          <div class="training-actions">
            <button class="practice-btn dsa-btn" onclick="launchTrainingHub()">🚀 Open Training Hub</button>
          </div>
        </div>

      </div>
    </div>`;
}

function launchTrainingHub() {
    window.location.href = "training-hub.html";
}

function startPractice(skill) {
    if (skill === "aptitude") {
        window.location.href = "training-hub.html?tab=aptitude";
        return;
    }
    AppState.mode = "practice"; AppState.skill = skill;
    startAssessmentSession(skill, "practice"); navigate("assessment");
}

function startWorkout(skill) {
    AppState.mode = "workout"; AppState.skill = skill;
    startAssessmentSession(skill, "workout"); navigate("assessment");
}
