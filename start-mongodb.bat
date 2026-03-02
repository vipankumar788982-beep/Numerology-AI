@echo off
echo Checking MongoDB installation...
echo.

where mongod >nul 2>&1
if %errorlevel% neq 0 (
    echo MongoDB is not installed or not in PATH
    echo.
    echo Please install MongoDB from:
    echo https://www.mongodb.com/try/download/community
    echo.
    pause
    exit /b 1
)

echo MongoDB is installed!
echo.

echo Checking if MongoDB service is running...
sc query MongoDB | find "RUNNING" >nul 2>&1
if %errorlevel% equ 0 (
    echo MongoDB service is already running!
    echo.
    echo Restarting backend server...
    echo.
    pause
    exit /b 0
)

echo Starting MongoDB service...
net start MongoDB
if %errorlevel% equ 0 (
    echo.
    echo MongoDB started successfully!
    echo.
    echo Now restart the backend server or it will auto-reconnect.
    echo.
) else (
    echo.
    echo Failed to start MongoDB service.
    echo Try running this script as Administrator.
    echo.
)

pause
