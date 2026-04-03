

const AppState = {

  user: JSON.parse(localStorage.getItem("user")) || null,

 
  skill: null,     // "aptitude" | "dsa"
  mode: null,      // "practice" | "workout"


  session: {
    questions: [], 
    index: 0       // current question index
  },


  sessionResult: {
    startTime: null,
    endTime: null,
    attempts: []   // each attempt stored here
  },


  credits: 0,
  badges: [],


  attempted: {
    aptitude: [],
    dsa: []
  },

  // FIX BUG 2: guards timer from restarting on each question re-render
  timerStarted: false,

  // FIX BUG 3: tracks submission state; reset to false after navigation
  isSubmitting: false,

  // Populated by finishAssessment(), read by ResultsPage()
  lastResult: null
};
