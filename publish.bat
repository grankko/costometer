echo off
set arg1=%1
set arg2=%2
dotnet publish %arg1%\web.costometer.csproj -c release -o %arg2%
copy web.production.config %arg2%\web.config
del %arg2%\web.production.config
del %arg2%\*.pdb