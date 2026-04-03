/**
 * Training Controller — thin layer, delegates to codeRunner.service
 * Routes: /api/training/dsa/* and /api/training/aptitude/*
 */
"use strict";

const DSA_DATA = require("../data/dsaQuestions");
const APT_DATA = require("../data/aptitudeQuestions");
const runner   = require("../services/codeRunner.service");

// ─── Internal ──────────────────────────────────────────────────────
function findDSAQuestion(id) {
  for (const [topicName, topicData] of Object.entries(DSA_DATA)) {
    for (const [subtopicName, subtopicData] of Object.entries(topicData.subtopics)) {
      for (const [phase, questions] of Object.entries(subtopicData)) {
        if (!Array.isArray(questions)) continue;
        const q = questions.find((x) => x.id === id);
        if (q) return { question: q, phase, topic: topicName, subtopic: subtopicName };
      }
    }
  }
  return null;
}

function sanitizeForClient(q, phase) {
  if (phase !== "codeEditor") return q;
  const { solutionCode, ...safe } = q;
  return safe;
}

// ─── DSA ────────────────────────────────────────────────────────────
exports.getDSATopics = (req, res) => {
  const topics = Object.entries(DSA_DATA).map(([name, data]) => ({
    name, icon: data.topicIcon, color: data.topicColor,
    subtopics: Object.keys(data.subtopics),
  }));
  res.json({ success: true, topics });
};

exports.getDSATopic = (req, res) => {
  const topicData = DSA_DATA[req.params.topic];
  if (!topicData) return res.status(404).json({ success: false, message: "Topic not found" });
  const subtopics = Object.entries(topicData.subtopics).map(([name, data]) => ({
    name,
    phases: Object.entries(data)
      .filter(([, arr]) => Array.isArray(arr))
      .map(([phase, arr]) => ({ phase, count: arr.length })),
  }));
  res.json({ success: true, topic: req.params.topic, icon: topicData.topicIcon, color: topicData.topicColor, subtopics });
};

exports.getDSAPhaseQuestions = (req, res) => {
  const { topic, subtopic, phase } = req.params;
  const topicData = DSA_DATA[topic];
  if (!topicData) return res.status(404).json({ success: false, message: "Topic not found" });
  const subtopicData = topicData.subtopics[subtopic];
  if (!subtopicData) return res.status(404).json({ success: false, message: "Subtopic not found" });
  const questions = subtopicData[phase];
  if (!Array.isArray(questions)) return res.status(404).json({ success: false, message: "Phase not found" });
  res.json({ success: true, topic, subtopic, phase, questions: questions.map((q) => sanitizeForClient(q, phase)), total: questions.length });
};

exports.getDSAQuestion = (req, res) => {
  const found = findDSAQuestion(req.params.id);
  if (!found) return res.status(404).json({ success: false, message: "Question not found" });
  res.json({ success: true, question: sanitizeForClient(found.question, found.phase), phase: found.phase, topic: found.topic, subtopic: found.subtopic });
};

exports.runCode = async (req, res) => {
  const { questionId, code, language } = req.body;
  if (!questionId || !code || !language)
    return res.status(400).json({ success: false, message: "questionId, code, and language are required" });
  if (!runner.SUPPORTED_LANGS.includes(language))
    return res.status(400).json({ success: false, message: `Supported languages: ${runner.SUPPORTED_LANGS.join(", ")}` });
  const found = findDSAQuestion(questionId);
  if (!found || found.phase !== "codeEditor")
    return res.status(404).json({ success: false, message: "Coding question not found" });
  try {
    const result = await runner.runVisible(code, language, found.question.testCases || []);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error("[run]", err.message);
    res.status(500).json({ success: false, message: "Execution failed" });
  }
};

exports.submitCode = async (req, res) => {
  const { questionId, code, language } = req.body;
  if (!questionId || !code || !language)
    return res.status(400).json({ success: false, message: "questionId, code, and language are required" });
  if (!runner.SUPPORTED_LANGS.includes(language))
    return res.status(400).json({ success: false, message: `Supported languages: ${runner.SUPPORTED_LANGS.join(", ")}` });
  const found = findDSAQuestion(questionId);
  if (!found || found.phase !== "codeEditor")
    return res.status(404).json({ success: false, message: "Coding question not found" });
  try {
    const result = await runner.runAll(code, language, found.question.testCases || []);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error("[submit]", err.message);
    res.status(500).json({ success: false, message: "Execution failed" });
  }
};

exports.checkObjective = (req, res) => {
  const { questionId, selectedIndex } = req.body;
  const found = findDSAQuestion(questionId);
  if (!found || found.phase !== "objective")
    return res.status(404).json({ success: false, message: "Question not found" });
  const correct = Number(selectedIndex) === found.question.answer;
  res.json({ success: true, correct, correctIndex: found.question.answer, explanation: found.question.explanation });
};

exports.checkJumbled = (req, res) => {
  const { questionId, order } = req.body;
  const found = findDSAQuestion(questionId);
  if (!found || found.phase !== "jumbledCode")
    return res.status(404).json({ success: false, message: "Question not found" });
  const q = found.question;
  const isCorrect  = JSON.stringify(order) === JSON.stringify(q.correctOrder);
  const firstWrong = isCorrect ? -1 : q.correctOrder.findIndex((v, i) => (order[i] ?? -1) !== v);
  res.json({ success: true, isCorrect, firstWrong, correctOrder: q.correctOrder, hint: q.hint });
};

exports.checkMissing = (req, res) => {
  const { questionId, answers } = req.body;
  const found = findDSAQuestion(questionId);
  if (!found || found.phase !== "missingCode")
    return res.status(404).json({ success: false, message: "Question not found" });
  const q = found.question;
  const results = (q.blanks || []).map((correct, i) => ({
    index: i, correct: (answers[i] || "").trim() === correct,
    hint: (answers[i] || "").trim() !== correct ? (q.hints[i] || null) : null,
  }));
  res.json({ success: true, allCorrect: results.every((r) => r.correct), results });
};

// ─── Aptitude ───────────────────────────────────────────────────────
exports.getAptitudeTopics = (req, res) => {
  const topics = Object.entries(APT_DATA).map(([name, data]) => ({
    name, icon: data.icon, color: data.color, questionCount: (data.questions || []).length,
  }));
  res.json({ success: true, topics });
};

exports.getAptitudeQuestions = (req, res) => {
  const topicName = decodeURIComponent(req.params.topic);
  const topic = APT_DATA[topicName];
  if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
  // Strip answer field — verified server-side via /check
  const safe = (topic.questions || []).map(({ answer: _a, ...q }) => q);
  res.json({ success: true, topic: topicName, icon: topic.icon, color: topic.color, questions: safe });
};

exports.checkAptitude = (req, res) => {
  const { topicName, questionId, selectedIndex } = req.body;
  const topic = APT_DATA[topicName];
  if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
  const question = (topic.questions || []).find((q) => q.id === questionId);
  if (!question) return res.status(404).json({ success: false, message: "Question not found" });
  const correct = Number(selectedIndex) === question.answer;
  res.json({ success: true, correct, correctIndex: question.answer, explanation: question.explanation });
};
