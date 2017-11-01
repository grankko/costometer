# cost-o-meter
Calculates and displays costs in real time for resources with hourly rates. Built this just to explore the tech.

Live at: https://granaker.se/costometer

### Built with
- TypeScript
- Aspnet core 2.0
- RiotJS
- Bootstrap

### Todo
- Build support for setting currency (defaults to kr)
- Build backend to save/load configurations (ongoing)

### Notes
- Publish.bat builds and replaces web.config with web.production.config. Ignore it.
- Visual Studio Code tasks.json defines buildTs that transpiles TypeScript to app.js.