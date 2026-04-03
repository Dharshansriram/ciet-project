# Build Docker sandbox images — Windows PowerShell version
# Run from inside the Sandbox folder:
#   cd Sandbox
#   .\build-sandboxes.ps1

Write-Host "Building C sandbox..." -ForegroundColor Yellow
docker build -t c-sandbox .\C\

Write-Host "Building Python sandbox..." -ForegroundColor Yellow
docker build -t python-sandbox .\Python\

Write-Host "Building Node.js sandbox..." -ForegroundColor Yellow
docker build -t node-sandbox .\Node\

Write-Host ""
Write-Host "All sandbox images built!" -ForegroundColor Green
Write-Host "Set RUNNER_MODE=docker in Backend\.env to use them."
