@echo off
echo ========================================
echo Starting Deployment Process
echo ========================================
echo.

cd C:\Users\shajanthan\Desktop\prompter\prompt-editor

rem Install dependencies
echo [1/7] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b %errorlevel%
)

rem Set PORT for Next.js
echo [2/7] Setting PORT...
set PORT=3001

rem Build Next.js project
echo [3/7] Building Next.js project...
call node ./node_modules/next/dist/bin/next build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b %errorlevel%
)

rem Check if 'out/' exists
echo [4/7] Checking build output...
if not exist "out\" (
    echo ERROR: 'out/' folder not found. Check next.config.js has output: 'export'
    pause
    exit /b 1
)
echo Build output found!

rem Create .nojekyll file for GitHub Pages
echo [4.5/7] Creating .nojekyll file...
type nul > out\.nojekyll
echo .nojekyll file created!

rem Stage and commit changes
echo [5/7] Staging and committing files...
git add .
git add out -f
git commit -m "Build and deploy site" -a
if %errorlevel% equ 0 (
    echo Commit successful
) else (
    echo No changes to commit or commit failed
)

rem Pull and push main branch
echo [6/7] Syncing main branch...
git pull origin main
git push origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to push to main
    pause
    exit /b %errorlevel%
)

rem Split subtree and deploy
echo [7/7] Splitting subtree and deploying...
for /f %%i in ('git subtree split --prefix out main') do set SUBTREE_SHA=%%i
echo Subtree SHA: %SUBTREE_SHA%

echo Pushing to gh-pages...
git push origin +%SUBTREE_SHA%:refs/heads/gh-pages
if %errorlevel% neq 0 (
    echo ERROR: Failed to push to gh-pages
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================
echo ✓ Deployment Complete!
echo ========================================
echo Your site is available at:
echo https://shajanthanx.github.io/prompt-editor/
echo ========================================
echo.
pause