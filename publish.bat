echo off
set OutputPath=%1
set SelectedEnvironment=%2
dotnet publish CostOMeter.Web\CostOMeter.Web.csproj -c release -o %OutputPath%
copy EnvironmentConfigs\web.%SelectedEnvironment%.config %OutputPath%\web.config
del %OutputPath%\web.production.config
del %OutputPath%\*.pdb
rd %OutputPath%\wwwroot\src /s /q