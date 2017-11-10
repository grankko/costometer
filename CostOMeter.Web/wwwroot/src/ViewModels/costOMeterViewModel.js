"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewModels = require("./viewModels");
var Models = require("../Models/Models");
var CostOMeterViewModel = (function () {
    function CostOMeterViewModel(newTimerInterval, timerFactory) {
        this.consultants = [];
        this.loadedConfigurations = [];
        this.timerInterval = newTimerInterval;
        this.lastId = 0;
        this.deletedConsultantCosts = 0;
        this.currency = 'SEK';
        this.timerFactory = timerFactory;
    }
    CostOMeterViewModel.prototype.getTotalHourlyCost = function () {
        var totalHourlySummed = 0;
        for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
            var cons = _a[_i];
            totalHourlySummed = Number(totalHourlySummed) + Number(cons.hourlyCost);
        }
        return totalHourlySummed.toFixed(0);
    };
    CostOMeterViewModel.prototype.getTotalCost = function () {
        var totalCostSummed = 0;
        for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
            var cons = _a[_i];
            totalCostSummed = Number(totalCostSummed) + Number(cons.getTotalCost());
        }
        totalCostSummed = totalCostSummed + this.deletedConsultantCosts;
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
    CostOMeterViewModel.prototype.getIsSaveable = function () {
        if (this.consultants.length === 0)
            return false;
        return true;
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
        for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
            var cons = _a[_i];
            cons.start();
        }
    };
    CostOMeterViewModel.prototype.stopCalculator = function () {
        for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
            var cons = _a[_i];
            cons.pause();
        }
    };
    CostOMeterViewModel.prototype.addConsultant = function (name, cost) {
        this.lastId = this.lastId + 1;
        var newConsultantTimer = this.timerFactory.createTimer(this.timerInterval);
        var newConsultant = new ViewModels.ConsultantViewModel(newConsultantTimer, cost, name, this.lastId);
        newConsultantTimer.vmInstance = newConsultant;
        newConsultant.onTimerTicking = this.onTick;
        this.consultants.push(newConsultant);
        return newConsultant;
    };
    CostOMeterViewModel.prototype.removeConsultant = function (item) {
        var itemCost = item.getTotalCost();
        var index = this.consultants.indexOf(item);
        this.consultants.splice(index, 1);
        this.deletedConsultantCosts = Number(this.deletedConsultantCosts) + Number(itemCost);
    };
    CostOMeterViewModel.prototype.loadAllConfigurations = function (data) {
        this.loadedConfigurations = [];
        for (var i = 0; i < data.length; i++) {
            var parsedConfig = new Models.CostConfiguration();
            parsedConfig.id = data[i].id;
            parsedConfig.name = data[i].name;
            this.loadedConfigurations.push(parsedConfig);
        }
    };
    CostOMeterViewModel.prototype.loadCostConfigurationResult = function (data) {
        this.resetViewModel();
        for (var i = 0; i < data.consultants.length; i++) {
            this.addConsultant(data.consultants[i].name, Number(data.consultants[i].hourlyCost));
        }
    };
    CostOMeterViewModel.prototype.serializeCurrentSetup = function (configName) {
        var currentConfig = new Models.CostConfiguration();
        currentConfig.id = -1;
        currentConfig.name = configName;
        for (var _i = 0, _a = this.consultants; _i < _a.length; _i++) {
            var cons = _a[_i];
            var apiConsultant = new Models.Consultant();
            apiConsultant.hourlyCost = cons.hourlyCost;
            apiConsultant.name = cons.name;
            currentConfig.consultants.push(apiConsultant);
        }
        return JSON.stringify(currentConfig);
    };
    CostOMeterViewModel.prototype.resetViewModel = function () {
        if (this.getIsPausable()) {
            this.stopCalculator();
        }
        this.consultants = [];
        this.lastId = 0;
        this.deletedConsultantCosts = 0;
    };
    return CostOMeterViewModel;
}());
exports.CostOMeterViewModel = CostOMeterViewModel;
//# sourceMappingURL=CostOMeterViewModel.js.map