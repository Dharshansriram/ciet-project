/**
 * Answer Sheet Routes
 * Admin-only endpoint — requires valid JWT with admin role.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/answerSheet.controller");
const auth    = require("../middleware/auth.middleware");

// GET /api/admin/answer-sheet  — protected admin route
router.get("/answer-sheet", auth, ctrl.getAnswerSheet);

module.exports = router;
