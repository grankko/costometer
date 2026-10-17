# CostOMeter Application Upgrade Plan

## Overview
This document outlines the steps required to upgrade the CostOMeter application from .NET 6.0 to .NET 9.0 and update all npm dependencies to their latest versions. The upgrade will be performed in a Linux development environment.

## Branch Strategy
1. Create a new branch: `feature/dotnet9-upgrade`
2. Copy this update-plan.md to the new branch
3. All upgrade work will be done in this branch
4. Ignore any pending changes from the main branch
5. Changes will only be merged back to main after successful testing and review

## Prerequisites
- Linux development environment
- .NET 9.0 SDK
- Node.js (LTS version)
- npm (latest version)
- Git

## Upgrade Steps

### 1. Environment Setup
1. Remove Windows-specific files:
   - Delete `publish.bat`
   - Delete `webpack_watch.bat`
   - Review and update `.vscode` settings for Linux compatibility

2. Create new cross-platform scripts:
   - Create `publish.sh` for build and publish operations
   - Add npm scripts in `package.json` for development tasks

### 2. .NET Upgrade
1. Update `CostOMeter.Web/CostOMeter.Web.csproj`:
   ```xml
   <Project Sdk="Microsoft.NET.Sdk.Web">
     <PropertyGroup>
       <TargetFramework>net9.0</TargetFramework>
     </PropertyGroup>
   </Project>
   ```

2. Update `CostOMeter.Web.Tests/CostOMeter.Web.Tests.csproj`:
   - Update target framework to net9.0
   - Update test framework packages to latest versions

3. Update solution file:
   - Update Visual Studio version references
   - Ensure all project references are correct

### 3. Frontend Dependencies Update
1. Update `package.json` with latest versions:
   ```json
   {
     "dependencies": {
       "@types/chai": "^5.0.0",
       "@types/mocha": "^10.0.0",
       "chai": "^5.0.0",
       "ts-node": "^10.9.0"
     },
     "devDependencies": {
       "mocha": "^10.0.0",
       "webpack": "^5.0.0",
       "webpack-cli": "^5.0.0",
       "typescript": "^5.0.0",
       "webpack-dev-server": "^4.0.0"
     },
     "scripts": {
       "start": "webpack serve --mode development",
       "build": "webpack --mode production",
       "test": "mocha",
       "watch": "webpack --watch --mode development"
     }
   }
   ```

2. Update webpack configuration:
   - Migrate to Webpack 5 syntax
   - Update loaders and plugins
   - Configure development server

### 4. Breaking Changes to Address

#### .NET 9 Changes
1. Review and update:
   - Authentication/Authorization implementations
   - Middleware configurations
   - Model binding
   - Custom middleware
   - API endpoints
   - Dependency injection patterns

2. Update any deprecated API usage:
   - HTTP client usage
   - Configuration patterns
   - Logging implementations
   - Database access patterns

#### Webpack 5 Changes
1. Update webpack configuration:
   - Asset modules instead of file-loader/url-loader
   - Update module federation if used
   - Update cache configuration
   - Update development server settings

2. Review and update:
   - Custom loaders
   - Plugin configurations
   - Build optimization settings

#### Testing Framework Updates
1. Update test syntax:
   - Mocha test structure
   - Chai assertions
   - TypeScript configurations

2. Review and update:
   - Test helpers
   - Mock implementations
   - Test environment setup

### 5. Implementation Order
1. Create new git branch: `feature/dotnet9-upgrade`
2. Copy this update-plan.md to the new branch
3. Update .NET SDK and project files
4. Update npm packages
5. Convert Windows scripts to cross-platform alternatives
6. Update webpack configuration
7. Fix breaking changes
8. Update tests
9. Test the application
10. Update documentation

### 6. Testing Strategy
1. Unit Tests:
   - Run all existing tests
   - Fix any broken tests
   - Add new tests for updated functionality

2. Integration Tests:
   - Test API endpoints
   - Test database operations
   - Test authentication flows

3. Frontend Tests:
   - Test build process
   - Test development server
   - Test hot reload functionality

4. Cross-platform Testing:
   - Verify build process on Linux
   - Test deployment process
   - Verify all scripts work correctly

### 7. Documentation Updates
1. Update README.md:
   - New setup instructions
   - Development environment requirements
   - Build and test instructions
   - Deployment process

2. Add migration notes:
   - Breaking changes
   - New features
   - Updated dependencies
   - Known issues

## Success Criteria
- Application builds successfully on Linux
- All tests pass
- Development environment works correctly
- Build and deployment processes are automated
- Documentation is up to date
- No Windows-specific dependencies remain

## Notes for AI Implementation
- Follow the order of steps as outlined
- Create commits for each major step
- Test changes before proceeding to next step
- Document any issues or decisions made
- Ensure cross-platform compatibility
- Maintain backward compatibility where possible
- Update all configuration files for Linux environment 