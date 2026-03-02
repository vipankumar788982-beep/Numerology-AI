@echo off
echo Starting Numerology Insight Application...
echo.

echo Starting Backend Server...
start "Numerology Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Numerology Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Application is starting!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to stop all servers...
pause > nul

taskkill /FI "WindowTitle eq Numerology Backend*" /T /F
taskkill /FI "WindowTitle eq Numerology Frontend*" /T /F
