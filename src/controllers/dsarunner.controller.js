const problems  = require("../problems");
const mongoose  = require("mongoose");
const Submission = require("../models/Submission");
const { exec }  = require("child_process");
const fs        = require("fs");
const path      = require("path");

const Problem = mongoose.model(
    "Problems",
    new mongoose.Schema({}, { strict: false })
);

// ─── Language Config ─────────────────────────────────────────────────────────

function getLangConfig(language) {
    const configs = {
        c:      { fileName: "main.c",    imageName: "c-sandbox",      compileCmd: "gcc main.c -o main && ./main" },
        java:   { fileName: "Main.java", imageName: "java-sandbox",   compileCmd: "javac Main.java && java Main" },
        python: { fileName: "main.py",   imageName: "python-sandbox", compileCmd: "python3 main.py" }
    };
    if (!configs[language]) throw new Error(`Unsupported language: ${language}`);
    return configs[language];
}

// ─── Docker Runner ───────────────────────────────────────────────────────────

async function runCode(code, language, input) {
    const tempDir = path.join(__dirname, "temp");

    // Clean and recreate temp dir
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.mkdirSync(tempDir, { recursive: true });

    const { fileName, imageName, compileCmd } = getLangConfig(language);

    fs.writeFileSync(path.join(tempDir, fileName), code);
    fs.writeFileSync(path.join(tempDir, "input.txt"), input);

    // Fix: --memory=128m  (not 128cm)
    const safeDir = tempDir.replace(/\\/g, "/");
    const command = `docker run --rm -v "${safeDir}:/app" ${imageName} sh -c "cd /app && ${compileCmd} < input.txt"`;
    console.log("[docker]", command);

    return new Promise((resolve) => {
        exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
            if (error) {
                if (error.killed) return resolve("TIME_LIMIT_EXCEEDED");
                return resolve(stderr.trim() || "Runtime Error");
            }
            resolve(stdout.trim() || stderr.trim() || "");
        });
    });
}

// ─── Helper: evaluate one test case ─────────────────────────────────────────

async function evaluateTestCase(tc, code, language) {
    const raw = await runCode(code, language, tc.input);

    if (raw === "TIME_LIMIT_EXCEEDED") {
        return {
            input:    tc.input,
            expected: tc.expectedOutput,
            output:   "",
            status:   "FAIL",
            error:    "Time Limit Exceeded"
        };
    }

    if (raw === "Runtime Error") {
        return {
            input:    tc.input,
            expected: tc.expectedOutput,
            output:   "",
            status:   "FAIL",
            error:    "Runtime Error"
        };
    }

    const actual   = raw.trim();
    const expected = tc.expectedOutput.trim();
    const passed   = actual === expected;

    return {
        input:    tc.input,
        expected,
        output:   actual,
        status:   passed ? "PASS" : "FAIL",
        ...(passed ? {} : { error: "Wrong Answer" })
    };
}

// ─── Controllers ─────────────────────────────────────────────────────────────

exports.GettingProblem = async (req, res) => {
    try {
        await Problem.deleteMany({});
        await Problem.insertMany(problems);
        res.json({ message: "Problems inserted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.AllProblems = (req, res) => {
    res.json(problems);
};

exports.problemDes = (req, res) => {
    const chapter = parseInt(req.params.chapter, 10);
    const code    = req.params.code.toUpperCase();

    const problem = problems.find(
        (p) => p.chapter === chapter && p.problemCode === code
    );

    if (!problem) {
        console.warn("Problem not found:", chapter, code);
        return res.status(404).json({ error: "Problem not found" });
    }

    res.json(problem);
};

exports.Run = async (req, res) => {
    const { code, language, problemCode } = req.body;

    try { getLangConfig(language); }
    catch (e) { return res.status(400).json({ error: e.message }); }

    const problem = problems.find((p) => p.problemCode === problemCode);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    // ✅ One result per test case, run sequentially to avoid temp dir conflicts
    const results = [];
    for (const tc of problem.testCases) {
        results.push(await evaluateTestCase(tc, code, language));
    }

    const allPassed = results.every((r) => r.status === "PASS");
    res.json({ allPassed, results });
};

exports.Submit = async (req, res) => {
    const { code, language, chapter, problemCode } = req.body;

    try { getLangConfig(language); }
    catch (e) { return res.status(400).json({ error: e.message }); }

    const problem = problems.find((p) => p.problemCode === problemCode);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    // ✅ One result per test case, run sequentially to avoid temp dir conflicts
    const results = [];
    for (const tc of problem.testCases) {
        results.push(await evaluateTestCase(tc, code, language));
    }

    const allPassed = results.every((r) => r.status === "PASS");
    const status    = allPassed ? "Accepted" : "Wrong Answer";

    try {
        await Submission.create({
            chapter,
            problemCode,
            language,
            code,
            output: results.map((r) => r.output).join("\n"),
            status
        });
        console.log("✅ Submission saved:", status);
        res.json({ status, results });
    } catch (err) {
        console.error("❌ MongoDB Save Error:", err);
        res.status(500).json({ error: "DB Error" });
    }
};
