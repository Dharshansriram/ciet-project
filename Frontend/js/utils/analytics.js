/*************************************************
 * ANALYTICS ENGINE (LocalStorage Based)
 * Tracks:
 * - attempts per day
 * - streak
 *************************************************/

function getTodayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function getAnalytics() {
  return JSON.parse(localStorage.getItem("ciet_analytics")) || {
    dailyAttempts: {},   // { "2026-01-17": 12 }
    dailyCorrect: {},    // { "2026-01-17": 8 }
    lastActive: null
  };
}

function saveAnalytics(data) {
  localStorage.setItem("ciet_analytics", JSON.stringify(data));
}

function logAttemptAnalytics(isCorrect) {
  const analytics = getAnalytics();
  const key = getTodayKey();

  if (!analytics.dailyAttempts[key]) analytics.dailyAttempts[key] = 0;
  if (!analytics.dailyCorrect[key]) analytics.dailyCorrect[key] = 0;

  analytics.dailyAttempts[key] += 1;
  if (isCorrect) analytics.dailyCorrect[key] += 1;

  analytics.lastActive = key;

  saveAnalytics(analytics);
}

function getLast7DaysKeys() {
  const keys = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    keys.push(d.toISOString().slice(0, 10));
  }

  return keys;
}

function getWeeklyAttempts() {
  const analytics = getAnalytics();
  const days = getLast7DaysKeys();

  return days.map(dayKey => ({
    date: dayKey,
    attempts: analytics.dailyAttempts[dayKey] || 0,
    correct: analytics.dailyCorrect[dayKey] || 0
  }));
}

function getStreakDays() {
  const analytics = getAnalytics();
  const daily = analytics.dailyAttempts || {};

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);

    if ((daily[key] || 0) > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
