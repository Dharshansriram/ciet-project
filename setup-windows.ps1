# CIET Placement Platform — Windows Setup Script
# Run this in PowerShell as Administrator
# Usage: Right-click PowerShell → "Run as Administrator" → paste this file's path

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  CIET Placement Platform — Windows Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# ── Step 1: Check Node.js ──────────────────────────────────────────
Write-Host "Step 1: Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "  ✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Node.js NOT found." -ForegroundColor Red
    Write-Host "  Download from: https://nodejs.org (LTS version)" -ForegroundColor White
    Write-Host "  Then re-run this script." -ForegroundColor White
    Read-Host "Press Enter to exit"
    exit 1
}

# ── Step 2: Check Docker (optional) ──────────────────────────────
Write-Host ""
Write-Host "Step 2: Checking Docker Desktop..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version 2>&1
    Write-Host "  ✅ Docker found: $dockerVersion" -ForegroundColor Green
    $dockerMode = "docker"
} catch {
    Write-Host "  ⚠️  Docker NOT found — code runner will use DIRECT mode." -ForegroundColor Yellow
    Write-Host "  Direct mode uses gcc/python/node installed on your PC." -ForegroundColor White
    Write-Host "  This is fine for development. For production, install Docker Desktop." -ForegroundColor White
    $dockerMode = "direct"
}

# ── Step 3: Check Python (needed for direct mode) ─────────────────
Write-Host ""
Write-Host "Step 3: Checking Python..." -ForegroundColor Yellow
try {
    $pyVersion = python --version 2>&1
    Write-Host "  ✅ Python found: $pyVersion" -ForegroundColor Green
} catch {
    Write-Host "  ⚠️  Python NOT found." -ForegroundColor Yellow
    Write-Host "  Download from: https://python.org/downloads" -ForegroundColor White
    Write-Host "  (needed to run Python code submissions)" -ForegroundColor White
}

# ── Step 4: Check GCC (needed for C in direct mode) ──────────────
Write-Host ""
Write-Host "Step 4: Checking GCC (for C code)..." -ForegroundColor Yellow
try {
    $gccVersion = gcc --version 2>&1
    Write-Host "  ✅ GCC found: $($gccVersion[0])" -ForegroundColor Green
} catch {
    Write-Host "  ⚠️  GCC NOT found." -ForegroundColor Yellow
    Write-Host "  For C support, install MinGW: https://winlibs.com" -ForegroundColor White
    Write-Host "  Or use WinLibs — extract and add bin/ to PATH." -ForegroundColor White
}

# ── Step 5: Install npm packages ──────────────────────────────────
Write-Host ""
Write-Host "Step 5: Installing backend dependencies..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\Backend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  ❌ npm install failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# ── Step 6: Update .env with runner mode ──────────────────────────
Write-Host ""
Write-Host "Step 6: Configuring .env..." -ForegroundColor Yellow
$envFile = "$PSScriptRoot\Backend\.env"
if (Test-Path $envFile) {
    # Read existing .env
    $envContent = Get-Content $envFile -Raw
    # Remove old RUNNER_MODE line if exists
    $envContent = $envContent -replace "RUNNER_MODE=.*\r?\n?", ""
    # Add correct mode
    $envContent += "`nRUNNER_MODE=$dockerMode"
    Set-Content $envFile $envContent
    Write-Host "  ✅ .env updated with RUNNER_MODE=$dockerMode" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  .env file not found at $envFile" -ForegroundColor Yellow
    Write-Host "  Create it with: PORT=5000, MONGO_URI=..., JWT_SECRET=..., RUNNER_MODE=$dockerMode" -ForegroundColor White
}

# ── Step 7: Build Docker sandboxes (only if Docker available) ─────
if ($dockerMode -eq "docker") {
    Write-Host ""
    Write-Host "Step 7: Building Docker sandboxes..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\Sandbox"
    
    Write-Host "  Building C sandbox..." -ForegroundColor White
    docker build -t c-sandbox .\C\
    
    Write-Host "  Building Python sandbox..." -ForegroundColor White
    docker build -t python-sandbox .\Python\
    
    Write-Host "  Building Node.js sandbox..." -ForegroundColor White
    docker build -t node-sandbox .\Node\
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ All Docker sandboxes built" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Docker build failed. Check Docker Desktop is running." -ForegroundColor Red
    }
}

# ── Done ──────────────────────────────────────────────────────────
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the backend:" -ForegroundColor White
Write-Host "  cd Backend" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "To open the frontend:" -ForegroundColor White
Write-Host "  Open Frontend\training-hub.html with VS Code Live Server" -ForegroundColor Yellow
Write-Host "  (Install 'Live Server' extension in VS Code, right-click file → Open with Live Server)" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to exit"
