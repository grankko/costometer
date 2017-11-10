"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsultantViewModel = (function () {
    function ConsultantViewModel(timer, cost, name, id) {
        this.timer = timer;
        this.timer.onTick = this.ticking;
        this.name = name;
        this.hourlyCost = cost;
        this.id = id;
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
    ConsultantViewModel.prototype.ticking = function (elapsedHours) {
        if (this.isPausePending === true) {
            this.timer.stop();
            var currentTotalCost = (this.previousTimespanCosts + this.currentTimespanCost);
            this.previousTimespanCosts = currentTotalCost;
            this.currentTimespanCost = 0;
            this.isPausePending = false;
            this.isRunning = false;
        }
        else {
            this.currentTimespanCost = elapsedHours * this.hourlyCost;
        }
        this.onTick();
    };
    ConsultantViewModel.prototype.start = function () {
        this.isRunning = true;
        this.currentTimespanCost = 0;
        this.timer.start();
    };
    ConsultantViewModel.prototype.pause = function () {
        this.isPausePending = true;
    };
    return ConsultantViewModel;
}());
exports.ConsultantViewModel = ConsultantViewModel;
//# sourceMappingURL=ConsultantViewModel.js.map