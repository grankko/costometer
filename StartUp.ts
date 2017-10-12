/// <reference path="Models/Consultant.ts" />
/// <reference path="ViewModels/CostOMeterViewModel.ts" />

class StartUp {

    vm: ViewModels.CostOMeterViewModel;

    public main(): number {
        
        let alive:boolean = true;

        this.vm = new ViewModels.CostOMeterViewModel(100);
        this.vm.consultants.push(new Models.Consultant(1000, 'Anders'));
        this.vm.consultants.push(new Models.Consultant(1200, 'David'));
        this.vm.run();

        return 0;
    }
}

let RunContext = new StartUp();

var stdin = process.openStdin();
stdin.addListener("data", function(d) {
    
    let inString = d.toString().trim().toUpperCase();
    
    switch (inString)
    {
        case "RUN": {
            if (RunContext.vm.isRunning)
                console.log('already running');
            else   
                RunContext.vm.run();
            break;
        }
        case "STOP": {
            RunContext.vm.stop();
            break;
        }
        case "ADD": {
            console.log('Added resource with 1000 in hourly rate');
            RunContext.vm.consultants.push(new Models.Consultant(1000, "Janne"));
            break;
        }
        case "PRINT": {
            RunContext.vm.printStats();
            break;
        }
        case "EXIT": {
            process.exit(1);
            break;
        }
        case "HELP": {
            console.log('Possible commands are: EXIT, PRINT, RUN, STOP and ADD');
            break;
        }
        default: {
            console.log('What?');
        }
    }
  });

  RunContext.main();