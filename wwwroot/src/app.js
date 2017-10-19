var Models;
(function (Models) {
    var Consultant = /** @class */ (function () {
        function Consultant(cost, name) {
            this.name = name;
            this.hourlyCost = cost;
        }
        return Consultant;
    }());
    Models.Consultant = Consultant;
})(Models || (Models = {}));
///<reference path="../Models/Consultant.ts" />
var ViewModels;
(function (ViewModels) {
    var CostOMeterViewModel = /** @class */ (function () {
        function CostOMeterViewModel(timeInterval) {
            this.consultants = [];
            this.timeInterval = timeInterval;
            this.timePassed = 0;
            this.debugText = "Hi from vm!";
        }
        CostOMeterViewModel.prototype.run = function () {
            var _this = this;
            console.log('Starting calculator');
            this.isRunning = true;
            var startTime = new Date().getTime();
            var prevElapsed = this.timePassed;
            this.timer = setInterval(function () {
                _this.timePassed = new Date().getTime() - startTime + prevElapsed;
                _this.totalCost = _this.calculateCurrentCost();
                _this.updated();
            }, this.timeInterval);
        };
        CostOMeterViewModel.prototype.stop = function () {
            console.log("Stopping calculator");
            this.isRunning = false;
            clearInterval(this.timer);
        };
        CostOMeterViewModel.prototype.addConsultant = function (name, cost) {
            this.consultants.push(new Models.Consultant(cost, name));
        };
        CostOMeterViewModel.prototype.calculateTotalHourlyCost = function () {
            var totalHourlyCostNow = 0;
            for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
                var cons = _a[_i];
                totalHourlyCostNow = totalHourlyCostNow + cons.hourlyCost;
            }
            this.totalHourlyCost = totalHourlyCostNow;
            return totalHourlyCostNow;
        };
        CostOMeterViewModel.prototype.calculateCurrentCost = function () {
            var hours = (this.timePassed / 1000) / 3600;
            return hours * this.calculateTotalHourlyCost();
        };
        CostOMeterViewModel.prototype.printStats = function () {
            var logLine = 'time passed: ' + (this.timePassed / 1000) + " | current cost: " + this.totalCost + " | total hourly cost: " + this.totalHourlyCost;
            console.log(logLine);
        };
        return CostOMeterViewModel;
    }());
    ViewModels.CostOMeterViewModel = CostOMeterViewModel;
})(ViewModels || (ViewModels = {}));
///<reference path="Models/Consultant.ts" />
///<reference path="ViewModels/CostOMeterViewModel.ts" />
console.log('Hi there');
var vm = new ViewModels.CostOMeterViewModel(100);
//# sourceMappingURL=app.js.map