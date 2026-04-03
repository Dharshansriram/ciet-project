# 🪟 Windows Setup Guide — CIET Placement Platform

## The short version (TL;DR)

```powershell
# In PowerShell, inside the v3 folder:
cd Backend
npm install
npm run dev
```

Then open `Frontend\training-hub.html` with **VS Code Live Server**.

---

## Why your first command failed

You ran a **bash** command on **Windows PowerShell**. They are different shells:

| What you ran (bash) | PowerShell equivalent |
|---|---|
| `cmd1 && cmd2` | `cmd1; cmd2` |
| `chmod +x file` | *(not needed on Windows)* |
| `./script.sh` | `.\script.ps1` |

---

## Full Setup — Step by Step

### Step 1: Install prerequisites

Install these once on your PC:

| Software | Download | Why needed |
|---|---|---|
| **Node.js** (LTS) | https://nodejs.org | Runs the backend server |
| **Python** | https://python.org/downloads | Runs Python code submissions |
| **GCC** (for C) | https://winlibs.com → Win64 zip | Compiles C code submissions |
| **VS Code** | https://code.visualstudio.com | Code editor + Live Server |
| **Docker Desktop** *(optional)* | https://docker.com/products/docker-desktop | Better code isolation (not required) |

> **GCC on Windows:** Download the `.zip` from winlibs.com, extract it to `C:\mingw64`, then add `C:\mingw64\bin` to your System PATH.

### Step 2: Verify your installs

Open **PowerShell** and run each of these:

```powershell
node --version      # Should show: v18.x.x or higher
npm --version       # Should show: 9.x.x or higher
python --version    # Should show: Python 3.x.x
gcc --version       # Should show: gcc (MinGW...) 13.x.x
```

If any show an error, that software isn't installed or isn't in your PATH.

### Step 3: Install backend packages

```powershell
# Navigate to the Backend folder
cd C:\Users\Hi\Downloads\CIET_PlacementPlatform_v3_FINAL\v3\Backend

# Install all Node packages
npm install
```

You should see packages downloading. Takes ~30 seconds.

### Step 4: Configure .env

The `.env` file is already there. Verify it has:

```
PORT=5000
MONGO_URI=<your MongoDB URI>
JWT_SECRET=CIET_LEARNING_SECRET_2026
RUNNER_MODE=direct
```

> `RUNNER_MODE=direct` means code runs using Python/Node/GCC directly on your PC.
> Change to `RUNNER_MODE=docker` if you install Docker Desktop later.

### Step 5: Start the backend

```powershell
cd C:\Users\Hi\Downloads\CIET_PlacementPlatform_v3_FINAL\v3\Backend
npm run dev
```

You should see:
```
[CodeRunner] Running in DIRECT mode
✅ Server running on http://localhost:5000
✅ MongoDB connected
```

**Leave this PowerShell window open.** The server runs in it.

### Step 6: Open the frontend

1. Open **VS Code**
2. Install the **Live Server** extension (search in Extensions tab)
3. Open the `Frontend` folder in VS Code
4. Right-click `training-hub.html` → **"Open with Live Server"**
5. Browser opens at `http://127.0.0.1:5500/training-hub.html`

---

## About Docker (you don't need it to start)

Docker gives better security isolation for running user code (each submission runs in a container with no network, limited memory). But it's **optional for development**.

Without Docker (`RUNNER_MODE=direct`):
- Code runs directly using python/node/gcc on your PC
- Slightly less secure, totally fine for testing
- All test cases still work correctly

With Docker (`RUNNER_MODE=docker`):
- Install Docker Desktop first
- Then build the images with these 3 PowerShell commands:

```powershell
cd C:\Users\Hi\Downloads\CIET_PlacementPlatform_v3_FINAL\v3\Sandbox

docker build -t c-sandbox .\C\
docker build -t python-sandbox .\Python\
docker build -t node-sandbox .\Node\
```

Each takes 1–2 minutes to download and build.

---

## Troubleshooting

### "npm is not recognized"
→ Node.js isn't installed. Download from https://nodejs.org, restart PowerShell after.

### "python is not recognized"
→ Python isn't installed, or install checkbox "Add to PATH" wasn't checked. Reinstall from https://python.org.

### "gcc is not recognized"
→ MinGW/GCC isn't installed or not in PATH. C submissions will show "Unsupported" but Python and JavaScript will still work.

### Backend starts but shows "MongoDB connection failed"
→ Check your internet connection. The MongoDB Atlas cluster in .env needs internet access.

### Frontend can't reach backend (CORS error in browser console)
→ Make sure backend is running on port 5000. Open http://localhost:5000 in browser — should show `{"success":true}`.

### Port 5000 already in use
→ Add `PORT=3001` to your `.env` file, and update `API_BASE` in all frontend JS files to `http://localhost:3001/api/training`.

---

## Folder Structure

```
v3/
├── Backend/                ← Node.js + Express server
│   ├── server.js           ← Entry point: node server.js
│   ├── .env                ← Your config (PORT, MONGO_URI, RUNNER_MODE)
│   ├── package.json        ← npm dependencies
│   └── src/
│       ├── app.js          ← Express routes setup
│       ├── services/
│       │   └── codeRunner.service.js  ← Runs user code (Docker or Direct)
│       ├── controllers/
│       │   └── training.controller.js ← DSA + Aptitude API logic
│       ├── routes/
│       │   └── training.routes.js     ← URL definitions
│       └── data/
│           ├── dsaQuestions.js        ← All DSA questions (35 coding + more)
│           └── aptitudeQuestions.js   ← All aptitude questions
│
├── Frontend/               ← Static HTML/CSS/JS (no build step)
│   ├── training-hub.html   ← 🏠 Start here — topic browser
│   ├── dsa-phase.html      ← 💻 DSA practice (5 phases)
│   ├── aptitude-quiz.html  ← 📝 Aptitude MCQ quiz
│   └── css/
│       └── tokens.css      ← Design system variables (imported by all pages)
│
└── Sandbox/                ← Docker images (only if using Docker)
    ├── C/Dockerfile
    ├── Python/Dockerfile
    └── Node/Dockerfile
```

---

## Quick test after setup

1. Backend running → open http://localhost:5000 → see `{"success":true,"message":"CIET..."}`
2. Open training-hub.html → see DSA + Aptitude topics
3. Click Arrays → 1D Arrays → Code Editor → pick a problem
4. Write Python code → click ▶ Run → see test results
