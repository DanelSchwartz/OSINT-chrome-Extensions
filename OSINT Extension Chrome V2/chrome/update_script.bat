@echo off
echo Running Node.js script to update script.js...

REM Install readline-sync to enable user input
npm install readline-sync

REM Run the Node.js script and pass custom URLs as arguments
node update_script.js %*

echo Script execution completed.
