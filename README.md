# cost-o-meter
Calculates and displays costs in real time for resources with hourly rates.
Load presets from api. Save your own configurations to json.

Built this just to explore the tech.

Live at: https://granaker.se/costometer

### Built with
- TypeScript
- Aspnet Core 2.0
- RiotJS
- Bootstrap
- jQuery
- listgroupjs (http://rickardn.github.io/listgroup.js/)
- Webpack
- Mocha
- Chai

### Notes
- Markup references /wwwroot/out/ dir for .js, .map and .tag files.
- VS Code task 'webpack watch' starts webpack in background to watch for changes in /transpiled dir and packs it to /wwwroot/out/ dir.
- VS Code task 'buildTs' transpiles TypeScript files in /wwwroot/src/ and /test to /transpiled dir. It also copies RiotJS .tag files to /wwwroot/out dir.
- Launch configuratiuon 'Run Mocha' runs task 'buildTs' and then runs Mocha for tests in /transpiled dir.

### Project structure
├───.vscode			<- launch as tasks configs
├───CostOMeter.Web
│   ├───Controllers		<- Api and home controller (aspnet core)
│   ├───Models			<- Api models (aspnet core)
│   ├───node_modules		<- mocha/chai modules used by tests
│   ├───test			<- TypeScript mocha/chai tests
│   │   ├───Mocks	
│   │   └───ViewModels
│   ├───transpiled		<- tsc outputs js here
│   │   ├───test		<- ..for tests
│   │   │   ├───Mocks
│   │   │   └───ViewModels
│   │   └───wwwroot		<- ..and the client application
│   │       └───src
│   │           ├───Models
│   │           ├───Services
│   │           └───ViewModels
│   ├───Views			<- Aspnet MVC View
│   │   └───Home
│   └───wwwroot	
│       ├───css
│       ├───img
│       ├───out			<- Webpack packs transpiled code and puts it here. Ignored by git.
│       │   └───tags		<- RiotJS tags are copied here when built
│       │   
│       └───src			<- TypeScript code and RiotJS tags
│           ├───Models		
│           ├───Services
│           ├───Tags		
│           │   └───modals
│           └───ViewModels
├───CostOMeter.Web.Tests	<- dotnet tests for Api
│   ├───Controllers
└───EnvironmentConfigs		<- web.config for different environments. Copied in by publish task.


### Todo
- Install Istanbul to generate code coverage
- Refactor out logic from RiotJS tags