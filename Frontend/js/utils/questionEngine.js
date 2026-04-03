function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getAptitudeQuestions(mode) {
  const allowed =
    mode === "practice"
      ? ["basic", "moderate"]
      : ["advanced", "pro"];

  return aptitudeBank.filter(q => allowed.includes(q.difficulty));
}

function getDsaQuestions(mode) {
  const allowed =
    mode === "practice"
      ? ["basic", "moderate"]
      : ["advanced", "pro"];

  return dsaBank.filter(q => allowed.includes(q.difficulty));
}
