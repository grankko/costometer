# cost-o-meter
Calculates and displays costs in real time for resources with hourly rates.
Load presets from api.
Save your own configurations to json and load.

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

### Todo
- ~~Build support for setting currency (defaults to )kr~~ DONE
- ~~Build backend to save/load configurations~~ DONE
- Feature complete. Refactor.

### Refactor
- ~~TypeScript Modules~~ introduced Webpack
- Break up ViewModel and introduce client services
- UnitTest (api and client)
- ~~Break up RiotJS tags. Seperate modal dialogs.~~

### Notes
- Publish.bat builds and replaces web.config with web.production.config. Ignore it.