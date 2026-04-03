# CIET Placement Training Platform — v3

Production-grade e-learning platform (LeetCode/HackerRank/IndiaBix style)
for engineering student placement preparation.

---

## ⚡ Quick Start

```bash
# 1. Backend
cd Backend
npm install
cp .env.example .env          # edit MONGO_URI + JWT_SECRET
npm run dev                   # starts on port 5000

# 2. Docker sandboxes (needed for code execution)
cd Sandbox
bash build-sandboxes.sh       # builds c-sandbox, python-sandbox, node-sandbox

# 3. Frontend
# Open Frontend/ with Live Server (VS Code extension)
# Or: python3 -m http.server 5500 --directory Frontend/
```

---

## 🏗️ Architecture

```
CIET_PlacementPlatform/
│
├── Backend/
│   ├── server.js                      ← Entry point (HTTP + Socket.IO)
│   ├── src/
│   │   ├── app.js                     ← Express app + all routes registered
│   │   ├── config/db.js               ← MongoDB connection
│   │   │
│   │   ├── services/
│   │   │   └── codeRunner.service.js  ← Docker execution (c/python/javascript)
│   │   │
│   │   ├── controllers/
│   │   │   ├── training.controller.js ← DSA + Aptitude (thin, delegates to service)
│   │   │   ├── answerSheet.controller.js ← Admin answer key
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── admin.controller.js
│   │   │
│   │   ├── routes/
│   │   │   ├── training.routes.js     ← /api/training/*
│   │   │   ├── answerSheet.routes.js  ← /api/admin/answer-sheet
│   │   │   ├── auth.routes.js
│   │   │   └── ...
│   │   │
│   │   ├── data/
│   │   │   ├── dsaQuestions.js        ← 175 DSA questions (5 phases × 35 problems)
│   │   │   ├── aptitudeQuestions.js   ← 65 Aptitude questions (13 topics × 5)
│   │   │   ├── jsStarters.js          ← JavaScript starter code for all problems
│   │   │   └── patch-questions.js     ← One-time migration script (already run)
│   │   │
│   │   ├── models/                    ← Mongoose schemas
│   │   └── middleware/auth.middleware.js
│   │
│   └── temp/                          ← Code runner temp dirs (auto-cleaned)
│
├── Frontend/
│   ├── index.html                     ← Main SPA (auth-gated)
│   ├── auth.html                      ← Login / Register
│   ├── training-hub.html              ← Topic browser (DSA + Aptitude)
│   ├── dsa-phase.html                 ← 5-phase practice (split layout + Monaco)
│   ├── aptitude-quiz.html             ← Timed MCQ quiz
│   ├── answer-sheet.html              ← Admin answer key viewer
│   ├── css/
│   │   ├── dsa-phase.css              ← Split layout styles
│   │   ├── training-hub.css           ← Topic grid + drawer
│   │   └── ...
│   └── js/
│       ├── dsa-phase.js               ← Full 5-phase controller
│       ├── training-hub.js            ← Topic browser
│       └── pages/training.js          ← Training dashboard card
│
└── Sandbox/
    ├── C/Dockerfile                   ← Alpine + GCC
    ├── Python/Dockerfile              ← python:3.11-alpine
    ├── Node/Dockerfile                ← node:18-alpine
    └── build-sandboxes.sh             ← Build all images
```

---

## 🌐 API Reference

### Training — DSA

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/training/dsa/topics` | List all DSA topics |
| GET | `/api/training/dsa/topics/:topic` | Get subtopics for a topic |
| GET | `/api/training/dsa/questions/:topic/:subtopic/:phase` | Get questions |
| GET | `/api/training/dsa/question/:id` | Get single question |
| POST | `/api/training/dsa/run` | Run code (visible tests) |
| POST | `/api/training/dsa/submit` | Submit code (all tests) |
| POST | `/api/training/dsa/check/objective` | Verify MCQ answer |
| POST | `/api/training/dsa/check/jumbled` | Verify line order |
| POST | `/api/training/dsa/check/missing` | Verify fill-blanks |

### Training — Aptitude

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/training/aptitude/topics` | List all topics |
| GET | `/api/training/aptitude/questions/:topic` | Get questions |
| POST | `/api/training/aptitude/check` | Verify answer |

### Admin

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/admin/answer-sheet` | Full answer key (JWT required) |

---

## 🎯 Phases per DSA Subtopic

| Phase | Name | Description |
|-------|------|-------------|
| 1 | Objective MCQ | Concept check before coding |
| 2 | Code Editor | Full Monaco editor, C/Python/JS |
| 3 | Jumbled Code | Drag-drop lines into correct order |
| 4 | Fill Blanks | Complete missing code tokens |
| 5 | Optimize | Time/space complexity improvement |

---

## 🐛 Bugs Fixed (vs v1/v2)

| Bug | Root Cause | Fix |
|-----|-----------|-----|
| Page refresh on code run | Form submit instead of fetch | Pure `async fetch()` only |
| Monaco crash on question nav | `innerHTML` replaced editor DOM | Editor DOM is **never removed**. `setModel()` only |
| Java instead of JavaScript | Wrong language in question bank | All 35 problems now have C/Python/JS |
| Double Monaco init | Called in DOMContentLoaded AND renderCodeEditor | Init once on load, `showRegion()` on nav |
| State lost on next question | No persistent state | `state.answers[index]` persists all answers |
| Run button stays disabled after error | No `finally` block | `finally` always resets button |
| Temp dir race conditions | Shared temp dir | `os.tmpdir() + mkdtempSync()` per run |

---

## 🔐 Environment Variables (.env)

```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ciet
JWT_SECRET=your_secret_key_here
NODE_ENV=development
TLE_MS=8000        # Code execution timeout in ms (default: 8000)
```

---

## 📊 Question Bank Summary

- **DSA Topics**: Arrays, Strings, Linked List, Stack & Queue (+ 7 more)
- **DSA Questions**: 175 total (35 coding + 35 objective + 35 jumbled + 35 fill-blanks + 35 optimize)
- **Coding Languages**: Python 3, JavaScript (Node 18), C (GCC)
- **Aptitude Topics**: 13 (Ratio, Time-Distance, Percentage, Profit-Loss, etc.)
- **Aptitude Questions**: 65 (IndiaBix style with explanations)

---

## 🚀 Adding More Questions

Edit `Backend/src/data/dsaQuestions.js`. Follow this schema:

```js
{
  id: "topic-phase-N",       // unique, e.g. "tree-code-1"
  title: "...",
  difficulty: "Easy|Medium|Hard",
  scenario: "Real-world context...",
  description: "Problem statement",
  constraints: "1 ≤ N ≤ 10^5",
  starterCode: { c: "...", python: "...", javascript: "..." },
  solutionCode: { python: "...", javascript: "..." },
  testCases: [{ input: "...", expectedOutput: "..." }]
}
```
