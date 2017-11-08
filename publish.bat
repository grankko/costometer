echo off
set arg1=%1
dotnet publish -c release -o %arg1%
copy CostOMeter.Web\web.production.config %arg1%\web.config
del %arg1%\web.production.config
del %arg1%\*.pdb
rd %arg1%\wwwroot\src /s /q