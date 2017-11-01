# cost-o-meter
Calculates and displays costs in real time for resources with hourly rates.
Add and remove resources and save/load from an api.

Built this just to explore the tech.

Live at: https://granaker.se/costometer

### Built with
- TypeScript
- Aspnet Core 2.0
- RiotJS
- Bootstrap
- jQuery
- listgroupjs (http://rickardn.github.io/listgroup.js/)

### Known issues
- listgroupjs sometime missbehaves. Items don't get selectable (load configuration modal).

### Todo
- ~~Build support for setting currency (defaults to )kr~~ DONE
- Build backend to save/load configurations (ongoing)

### Refactor
- TypeScript Modules
- Break up ViewModel and introduce client services
- UnitTest (api and client)
- Break up RiotJS tags. Seperate modal dialogs.

### Notes
- Publish.bat builds and replaces web.config with web.production.config. Ignore it.
- Visual Studio Code tasks.json defines buildTs that transpiles TypeScript to app.js.