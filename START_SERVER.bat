@echo off
echo ========================================
echo   Demarrage du serveur TSTMG Vote
echo ========================================
echo.
echo Le site va s'ouvrir dans votre navigateur...
echo.
echo Pour arreter le serveur : Ctrl + C
echo ========================================
echo.

npx http-server -p 3000 -o

pause
