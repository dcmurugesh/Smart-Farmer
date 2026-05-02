@echo off
REM Smart Farmer Portal - Setup Script for Windows
REM This script installs dependencies and starts both servers

echo.
echo ============================================
echo Smart Farmer Information Portal Setup
echo ============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js is installed
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..
echo [✓] Backend dependencies installed
echo.

REM Check if MongoDB is needed
echo.
echo MongoDB Setup:
echo [1] Using Local MongoDB (requires mongod running)
echo [2] Using MongoDB Atlas (Cloud)
echo.
set /p dbChoice="Choose MongoDB option (1 or 2): "

if "%dbChoice%"=="2" (
    echo.
    echo To use MongoDB Atlas:
    echo 1. Sign up at https://mongodb.com/cloud/atlas
    echo 2. Create a cluster
    echo 3. Get your connection string
    echo 4. Update backend/.env with your connection string
    echo.
)

echo.
echo ============================================
echo Setup Complete!
echo ============================================
echo.
echo To start the application:
echo.
echo Terminal 1 - Start Backend:
echo   cd backend
echo   npm start
echo.
echo Terminal 2 - Start Frontend:
echo   cd frontend
echo   npx live-server --port=3000
echo.
echo Then open http://localhost:3000 in your browser
echo.
echo For more information, see README.md or QUICKSTART.md
echo.
pause
