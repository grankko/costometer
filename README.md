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

### Todo
- ~~Build support for setting currency (defaults to )kr~~ DONE
- Build backend to save/load configurations (ongoing)

### Notes
- Publish.bat builds and replaces web.config with web.production.config. Ignore it.
- Visual Studio Code tasks.json defines buildTs that transpiles TypeScript to app.js.