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
    if (inString === "RUN")
    {
        if (RunContext.vm.isRunning)
            console.log('already running');
        else   
            RunContext.vm.run();
    }
    else if (inString === "STOP")
    {
        RunContext.vm.stop();
    }
    else if (inString == "ADD")
    {
        RunContext.vm.consultants.push(new Models.Consultant(1000, "Janne"));
    }
    else if (inString == "PRINT")
    {
        RunContext.vm.printStats();
    } else if (inString == "EXIT") {
        process.exit(1);
    } else {
        console.log('What?');
    }
  });

  RunContext.main();