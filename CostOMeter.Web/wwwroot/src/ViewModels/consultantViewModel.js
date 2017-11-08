"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsultantViewModel = (function () {
    function ConsultantViewModel(cost, name, id, timerInterval) {
        this.name = name;
        this.hourlyCost = cost;
        this.id = id;
        this.timerInterval = timerInterval;
        this.isPausePending = false;
        this.isRunning = false;
        this.previousTimespanCosts = 0;
        this.currentTimespanCost = 0;
    }
    ConsultantViewModel.prototype.getTotalCostFormatted = function () {
        return this.getTotalCost().toFixed(2);
    };
    ConsultantViewModel.prototype.getTotalCost = function () {
        return (this.previousTimespanCosts + this.currentTimespanCost);
    };
    ConsultantViewModel.prototype.ticking = function () {
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
    ConsultantViewModel.prototype.start = function () {
        var _this = this;
        console.log('Starting calculator for ' + this.id);
        this.isRunning = true;
        this.currentTimespanCost = 0;
        this.lastStarted = new Date().getTime();
        this.timer = setInterval(function () {
            _this.ticking();
        }, this.timerInterval);
    };
    ConsultantViewModel.prototype.pause = function () {
        console.log('Pausing calculator for ' + this.id);
        console.log('Previous cost is for ' + this.id + ' is: ' + this.previousTimespanCosts.toFixed(2));
        this.isPausePending = true;
    };
    return ConsultantViewModel;
}());
exports.ConsultantViewModel = ConsultantViewModel;
//# sourceMappingURL=consultantViewModel.js.map