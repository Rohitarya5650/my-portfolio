@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Installing tools, one time only...
  call npm install
)
node tools/capture-all.mjs %*
echo.
echo Done. Refresh your portfolio.
pause
