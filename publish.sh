#!/bin/bash

# Build and publish the application
dotnet publish CostOMeter.Web/CostOMeter.Web.csproj -c Release

# Build frontend assets
cd CostOMeter.Web
npm run build
cd .. 