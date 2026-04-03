/**
 * answerSheet.controller.js
 * --------------------------
 * Generates a complete answer sheet for admin verification.
 * Endpoint: GET /api/admin/answer-sheet
 * Protected: requires admin JWT.
 *
 * Returns all correct answers for:
 *   - DSA: objective (correct option + explanation)
 *   - DSA: jumbled (correct line order)
 *   - DSA: missing (correct blanks + hints)
 *   - DSA: codeEditor (solution code for all 3 languages)
 *   - Aptitude: correct answer index + explanation
 */

"use strict";

const DSA_DATA = require("../data/dsaQuestions");
const APT_DATA = require("../data/aptitudeQuestions");

exports.getAnswerSheet = (req, res) => {
  const sheet = {
    generatedAt: new Date().toISOString(),
    dsa:         [],
    aptitude:    [],
  };

  // ── DSA Answer Sheet ─────────────────────────────────────────
  for (const [topicName, topicData] of Object.entries(DSA_DATA)) {
    for (const [subtopicName, subtopicData] of Object.entries(topicData.subtopics)) {

      // Objective answers
      if (Array.isArray(subtopicData.objective)) {
        subtopicData.objective.forEach((q) => {
          sheet.dsa.push({
            topic:     topicName,
            subtopic:  subtopicName,
            phase:     "objective",
            id:        q.id,
            question:  q.question,
            answer:    q.answer,
            answerText: q.options[q.answer],
            explanation: q.explanation,
          });
        });
      }

      // Code Editor — solution code
      if (Array.isArray(subtopicData.codeEditor)) {
        subtopicData.codeEditor.forEach((q) => {
          sheet.dsa.push({
            topic:       topicName,
            subtopic:    subtopicName,
            phase:       "codeEditor",
            id:          q.id,
            title:       q.title,
            solutionCode: q.solutionCode || {},
            testCases:   q.testCases || [],
          });
        });
      }

      // Jumbled — correct line order
      if (Array.isArray(subtopicData.jumbledCode)) {
        subtopicData.jumbledCode.forEach((q) => {
          const orderedLines = q.correctOrder.map((idx) => q.lines[idx]);
          sheet.dsa.push({
            topic:        topicName,
            subtopic:     subtopicName,
            phase:        "jumbledCode",
            id:           q.id,
            title:        q.title,
            correctOrder: q.correctOrder,
            orderedLines,
          });
        });
      }

      // Missing code — correct blanks
      if (Array.isArray(subtopicData.missingCode)) {
        subtopicData.missingCode.forEach((q) => {
          sheet.dsa.push({
            topic:    topicName,
            subtopic: subtopicName,
            phase:    "missingCode",
            id:       q.id,
            title:    q.title,
            blanks:   q.blanks,
            hints:    q.hints,
          });
        });
      }

      // Optimize — optimal complexity
      if (Array.isArray(subtopicData.optimize)) {
        subtopicData.optimize.forEach((q) => {
          sheet.dsa.push({
            topic:             topicName,
            subtopic:          subtopicName,
            phase:             "optimize",
            id:                q.id,
            title:             q.title,
            optimalComplexity: q.optimalComplexity,
            goodCode:          q.goodCode,
            explanation:       q.explanation,
          });
        });
      }
    }
  }

  // ── Aptitude Answer Sheet ────────────────────────────────────
  for (const [topicName, topicData] of Object.entries(APT_DATA)) {
    (topicData.questions || []).forEach((q) => {
      sheet.aptitude.push({
        topic:       topicName,
        id:          q.id,
        question:    q.question,
        answer:      q.answer,
        answerText:  q.options[q.answer],
        explanation: q.explanation,
        options:     q.options,
      });
    });
  }

  // Summary stats
  sheet.summary = {
    dsa: {
      total:      sheet.dsa.length,
      objective:  sheet.dsa.filter((q) => q.phase === "objective").length,
      codeEditor: sheet.dsa.filter((q) => q.phase === "codeEditor").length,
      jumbled:    sheet.dsa.filter((q) => q.phase === "jumbledCode").length,
      missing:    sheet.dsa.filter((q) => q.phase === "missingCode").length,
      optimize:   sheet.dsa.filter((q) => q.phase === "optimize").length,
    },
    aptitude: {
      total: sheet.aptitude.length,
    },
  };

  res.json({ success: true, sheet });
};
