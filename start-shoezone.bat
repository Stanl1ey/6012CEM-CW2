@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install the Node.js LTS Windows Installer from:
  echo https://nodejs.org/en/download
  echo Then close this window and run start-shoezone.bat again.
  goto failed
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Install the Node.js LTS Windows Installer from:
  echo https://nodejs.org/en/download
  echo Then close this window and run start-shoezone.bat again.
  goto failed
)

if not exist "node_modules\" (
  echo Installing ShoeZone dependencies. This may take a few minutes the first time.
  call npm install
  if errorlevel 1 goto failed
)

echo Starting ShoeZone. Keep this window open while you use the app.
call npm run dev -- --host 127.0.0.1 --open
if errorlevel 1 goto failed
goto end

:failed
echo.
pause

:end
endlocal
