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