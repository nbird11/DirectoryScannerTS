@echo off
call tsc
cd build/src
pkg index.js --targets node16-win-x64 --output scan