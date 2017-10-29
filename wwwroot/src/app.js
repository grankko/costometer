var Models;
(function (Models) {
    var Consultant = /** @class */ (function () {
        function Consultant(cost, name, id, timerInterval) {
            this.name = name;
            this.hourlyCost = cost;
            this.id = id;
            this.timerInterval = timerInterval;
            this.isPausePending = false;
            this.isRunning = false;
            this.previousTimespanCosts = 0;
            this.currentTimespanCost = 0;
        }
        Consultant.prototype.getTotalCostFormatted = function () {
            return (this.previousTimespanCosts + this.currentTimespanCost).toFixed(2);
        };
        Consultant.prototype.getTotalCost = function () {
            return (this.previousTimespanCosts + this.currentTimespanCost);
        };
        Consultant.prototype.ticking = function () {
            if (this.isPausePending === true) {
                clearInterval(this.timer);
                var currentTotalCost = (this.previousTimespanCosts + this.currentTimespanCost);
                this.previousTimespanCosts = currentTotalCost;
                this.currentTimespanCost = 0;
                this.isPausePending = false;
                this.isRunning = false;
            }
            else {
                var elapsed = (new Date().getTime() - this.lastStarted);
                var elapsedHours = (elapsed / 1000) / 3600;
                this.currentTimespanCost = elapsedHours * this.hourlyCost;
            }
            this.onTick();
        };
        Consultant.prototype.start = function () {
            var _this = this;
            console.log('Starting calculator for ' + this.id);
            this.isRunning = true;
            this.currentTimespanCost = 0;
            this.lastStarted = new Date().getTime();
            this.timer = setInterval(function () {
                _this.ticking();
            }, this.timerInterval);
        };
        Consultant.prototype.pause = function () {
            console.log('Pausing calculator for ' + this.id);
            console.log('Previous cost is for ' + this.id + ' is: ' + this.previousTimespanCosts.toFixed(2));
            this.isPausePending = true;
        };
        return Consultant;
    }());
    Models.Consultant = Consultant;
})(Models || (Models = {}));
///<reference path="../Models/Consultant.ts" />
var ViewModels;
(function (ViewModels) {
    var CostOMeterViewModel = /** @class */ (function () {
        function CostOMeterViewModel(newTimerInterval) {
            this.consultants = [];
            this.timerInterval = newTimerInterval;
            this.lastId = 0;
        }
        CostOMeterViewModel.prototype.getTotalHourlyCost = function () {
            var totalHourlySummed = 0;
            for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
                var cons = _a[_i];
                totalHourlySummed = Number(totalHourlySummed) + Number(cons.hourlyCost);
            }
            return totalHourlySummed.toFixed(2);
        };
        CostOMeterViewModel.prototype.getTotalCost = function () {
            var totalCostSummed = 0;
            for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
                var cons = _a[_i];
                totalCostSummed = Number(totalCostSummed) + Number(cons.getTotalCost());
            }
            return totalCostSummed.toFixed(2);
        };
        CostOMeterViewModel.prototype.getIsRunnable = function () {
            if (this.consultants.length === 0)
                return false;
            return !this.getIsRunning();
        };
        CostOMeterViewModel.prototype.getIsPausable = function () {
            if (this.consultants.length === 0)
                return false;
            return this.getIsRunning();
        };
        CostOMeterViewModel.prototype.getIsRunning = function () {
            var isRunning = false;
            for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
                var cons = _a[_i];
                if (cons.isRunning) {
                    isRunning = true;
                    break;
                }
            }
            return isRunning;
        };
        CostOMeterViewModel.prototype.startCalculator = function () {
            console.log('Starting calculator.');
            for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
                var cons = _a[_i];
                cons.start();
            }
        };
        CostOMeterViewModel.prototype.stopCalculator = function () {
            console.log('Stopping calculator.');
            for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
                var cons = _a[_i];
                cons.pause();
            }
        };
        CostOMeterViewModel.prototype.addConsultant = function (name, cost) {
            console.log('Adding consultant.');
            this.lastId = this.lastId + 1;
            var newConsultant = new Models.Consultant(cost, name, this.lastId, this.timerInterval);
            newConsultant.onTick = this.onTick;
            var lastConsultantIndex = this.consultants.push(newConsultant);
            return newConsultant;
        };
        CostOMeterViewModel.prototype.removeConsultant = function (item) {
            console.log('Removing consultant with id ' + item.id);
            var index = this.consultants.indexOf(item);
            console.log('Index of this one is: ' + index);
            this.consultants.splice(index, 1);
        };
        return CostOMeterViewModel;
    }());
    ViewModels.CostOMeterViewModel = CostOMeterViewModel;
})(ViewModels || (ViewModels = {}));
///<reference path="Models/Consultant.ts" />
///<reference path="ViewModels/CostOMeterViewModel.ts" />
console.log('Hi there');
var vm = new ViewModels.CostOMeterViewModel(200);
//# sourceMappingURL=app.js.map