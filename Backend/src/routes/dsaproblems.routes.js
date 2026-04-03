const express = require("express");
const router = express.Router();

const { GettingProblem, AllProblems, problemDes, Run, Submit } = require("../controllers/dsarunner.controller");

router.get("/seed", GettingProblem);
router.get("/", AllProblems);
router.get("/:chapter/:code", problemDes);
router.post("/run", Run);
router.post("/submit", Submit);

module.exports = router;