@echo off
setlocal
cd /d "%~dp0"

echo ========================================================
echo   Jaiivant Arvind - Portfolio Development Server
echo ========================================================
echo.

:: Check Node.js and npm
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] npm is not recognized. Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Check dependencies
if not exist "node_modules\" (
    echo [INFO] node_modules not detected. Installing dependencies...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
)

echo [INFO] Starting Vite development server...
echo [INFO] Press Ctrl+C at any time in this window to stop.
echo.

call npm run dev -- --open

if %ERRORLEVEL% neq 0 (
    echo.
    echo [NOTICE] Development server stopped or encountered an issue.
)

pause