var StartUp = /** @class */ (function () {
    function StartUp() {
    }
    StartUp.prototype.main = function () {
        var alive = true;
        this.vm = new CostOMeterViewModel(100);
        this.vm.consultants.push(new Consultant(1000, 'Anders'));
        this.vm.consultants.push(new Consultant(1200, 'David'));
        this.vm.run();
        return 0;
    };
    return StartUp;
}());
var CostOMeterViewModel = /** @class */ (function () {
    function CostOMeterViewModel(timeInterval) {
        this.consultants = [];
        this.timeInterval = timeInterval;
        this.timePassed = 0;
    }
    CostOMeterViewModel.prototype.run = function () {
        var _this = this;
        console.log('Starting calculator');
        this.isRunning = true;
        var startTime = new Date().getTime();
        var prevElapsed = this.timePassed;
        this.timer = setInterval(function () {
            _this.timePassed = new Date().getTime() - startTime + prevElapsed;
        }, this.timeInterval);
    };
    CostOMeterViewModel.prototype.stop = function () {
        console.log("Stopping calculator");
        this.isRunning = false;
        clearInterval(this.timer);
    };
    CostOMeterViewModel.prototype.totalHourlyCost = function () {
        var totalCost = 0;
        for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
            var cons = _a[_i];
            totalCost += cons.hourlyCost;
        }
        return totalCost;
    };
    CostOMeterViewModel.prototype.currentCost = function () {
        var hours = (this.timePassed / 1000) / 3600;
        return hours * this.totalHourlyCost();
    };
    CostOMeterViewModel.prototype.printStats = function () {
        var logLine = 'time passed: ' + (this.timePassed / 1000) + " | current cost: " + this.currentCost() + " | total hourly cost: " + this.totalHourlyCost();
        console.log(logLine);
    };
    return CostOMeterViewModel;
}());
var Consultant = /** @class */ (function () {
    function Consultant(cost, name) {
        this.name = name;
        this.hourlyCost = cost;
    }
    return Consultant;
}());
var RunContext = new StartUp();
var stdin = process.openStdin();
stdin.addListener("data", function (d) {
    var inString = d.toString().trim().toUpperCase();
    if (inString === "RUN") {
        if (RunContext.vm.isRunning)
            console.log('already running');
        else
            RunContext.vm.run();
    }
    else if (inString === "STOP") {
        RunContext.vm.stop();
    }
    else if (inString == "ADD") {
        RunContext.vm.consultants.push(new Consultant(1000, "Janne"));
    }
    else if (inString == "PRINT") {
        RunContext.vm.printStats();
    }
    else if (inString == "EXIT") {
        process.exit(1);
    }
    else {
        console.log('What?');
    }
});
RunContext.main();
//# sourceMappingURL=StartUp.js.map