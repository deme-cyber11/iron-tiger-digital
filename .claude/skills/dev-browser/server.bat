@echo off
REM Dev Browser Server Startup Script for Windows

cd /d "%~dp0"

REM Parse arguments
set HEADLESS=false
:parse_args
if "%~1"=="" goto :done_args
if /i "%~1"=="--headless" set HEADLESS=true
shift
goto :parse_args
:done_args

echo Installing dependencies...
call npm install

echo Starting dev-browser server...
set HEADLESS=%HEADLESS%
npx tsx scripts/start-server.ts
