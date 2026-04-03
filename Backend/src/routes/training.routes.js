/**
 * Training Routes
 * ---------------
 * Clean, RESTful route definitions.
 * URL structure mirrors data hierarchy: topic → subtopic → phase
 */
"use strict";

const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/training.controller");

// ── DSA ────────────────────────────────────────────────────────
// Browse
router.get("/dsa/topics",                                ctrl.getDSATopics);
router.get("/dsa/topics/:topic",                         ctrl.getDSATopic);
router.get("/dsa/questions/:topic/:subtopic/:phase",     ctrl.getDSAPhaseQuestions);
router.get("/dsa/question/:id",                          ctrl.getDSAQuestion);

// Execute
router.post("/dsa/run",                                  ctrl.runCode);
router.post("/dsa/submit",                               ctrl.submitCode);

// Verify answers (non-code phases)
router.post("/dsa/check/objective",                      ctrl.checkObjective);
router.post("/dsa/check/jumbled",                        ctrl.checkJumbled);
router.post("/dsa/check/missing",                        ctrl.checkMissing);

// ── Aptitude ────────────────────────────────────────────────────
router.get("/aptitude/topics",                           ctrl.getAptitudeTopics);
router.get("/aptitude/questions/:topic",                 ctrl.getAptitudeQuestions);
router.post("/aptitude/check",                           ctrl.checkAptitude);

module.exports = router;
