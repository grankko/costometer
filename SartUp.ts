class StartUp {

    vm: CostOMeterViewModel;

    public main(): number {
        
        let alive:boolean = true;

        this.vm = new CostOMeterViewModel(100);
        this.vm.consultants.push(new Consultant(1000, 'Anders'));
        this.vm.consultants.push(new Consultant(1200, 'David'));
        this.vm.run();

        return 0;
    }
}

class CostOMeterViewModel {
    consultants: Consultant[] = [];
    timePassed: number;
    isRunning: boolean;
    timeInterval: number;
    timer;

    constructor(timeInterval: number) {
        this.timeInterval = timeInterval;
        this.timePassed = 0;
    }

    public run() {
        console.log('Starting calculator');
        this.isRunning = true;

        let startTime = new Date().getTime();
        let prevElapsed = this.timePassed;
        this.timer = setInterval(() => {
            this.timePassed = new Date().getTime() - startTime + prevElapsed;
        }, this.timeInterval);
    }

    public stop() {
        console.log("Stopping calculator");
        this.isRunning = false;
        clearInterval(this.timer);
    }

    private totalHourlyCost() :number {
        let totalCost = 0;
        for (let cons of this.consultants) {
            totalCost += cons.hourlyCost;
        }
        return totalCost;
    }

    private currentCost() :number {
        let hours = (this.timePassed / 1000) / 3600;
        return hours * this.totalHourlyCost();
    }

    public printStats()
    {
        let logLine = 'time passed: ' + (this.timePassed / 1000) + " | current cost: " + this.currentCost() + " | total hourly cost: " + this.totalHourlyCost();
        console.log(logLine);
    }
    
}

class Consultant {

    public name: string;
    public hourlyCost: number;

    constructor(cost: number, name: string) {
        this.name = name;
        this.hourlyCost = cost;
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
        RunContext.vm.consultants.push(new Consultant(1000, "Janne"));
    }
    else if (inString == "PRINT")
    {
        RunContext.vm.printStats();
    } else {
        console.log('What?');
    }
  });

  RunContext.main();