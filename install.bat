@echo off
echo Installing Numerology Insight Application...
echo.

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Backend installation failed!
    pause
    exit /b %errorlevel%
)

echo.
echo Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Frontend installation failed!
    pause
    exit /b %errorlevel%
)

cd ..

echo.
echo Creating environment files...
if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Created backend\.env - Please configure it!
)

if not exist frontend\.env (
    copy frontend\.env.example frontend\.env
    echo Created frontend\.env
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Configure backend\.env with your MongoDB URI and JWT secret
echo 2. Start MongoDB if running locally
echo 3. Run 'start.bat' to start the application
echo.
pause
