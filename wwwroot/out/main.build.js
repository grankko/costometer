/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ConsultantViewModel_1 = __webpack_require__(2);
exports.ConsultantViewModel = ConsultantViewModel_1.ConsultantViewModel;
var CostOMeterViewModel_1 = __webpack_require__(3);
exports.CostOMeterViewModel = CostOMeterViewModel_1.CostOMeterViewModel;
//# sourceMappingURL=viewModels.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var viewModules = __webpack_require__(0);
var utils = __webpack_require__(7);
(function makeIt() {
    var vm = new viewModules.CostOMeterViewModel(100);
    var u = new utils.utilities();
    riot.mount('costOMeterBody', { viewModel: vm, utils: u });
    riot.mount('costOMeterFooter', { viewModel: vm, utils: u });
})();
//# sourceMappingURL=main.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ViewModels = __webpack_require__(0);
var Models = __webpack_require__(4);
var CostOMeterViewModel = (function () {
    function CostOMeterViewModel(newTimerInterval) {
        this.consultants = [];
        this.loadedConfigurations = [];
        this.timerInterval = newTimerInterval;
        this.lastId = 0;
        this.deletedConsultantCosts = 0;
        this.currency = 'SEK';
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
        var newConsultant = new ViewModels.ConsultantViewModel(cost, name, this.lastId, this.timerInterval);
        newConsultant.onTick = this.onTick;
        this.consultants.push(newConsultant);
        return newConsultant;
    };
    CostOMeterViewModel.prototype.removeConsultant = function (item) {
        console.log('Removing consultant with id ' + item.id);
        var itemCost = item.getTotalCost();
        var index = this.consultants.indexOf(item);
        console.log('Index of this one is: ' + index);
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
//# sourceMappingURL=costOMeterViewModel.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Consultant_1 = __webpack_require__(5);
exports.Consultant = Consultant_1.Consultant;
var CostConfiguration_1 = __webpack_require__(6);
exports.CostConfiguration = CostConfiguration_1.CostConfiguration;
//# sourceMappingURL=models.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Consultant = (function () {
    function Consultant() {
    }
    return Consultant;
}());
exports.Consultant = Consultant;
//# sourceMappingURL=consultant.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CostConfiguration = (function () {
    function CostConfiguration() {
        this.consultants = [];
    }
    return CostConfiguration;
}());
exports.CostConfiguration = CostConfiguration;
//# sourceMappingURL=costConfiguration.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utilities = (function () {
    function utilities() {
    }
    utilities.prototype.isEmptyOrSpaces = function (inputText) {
        return inputText === null || inputText.match(/^ *$/) !== null;
    };
    utilities.prototype.selectText = function (element) {
        var doc = document, text = doc.getElementById(element), range, selection;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        }
        else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
    utilities.prototype.supportFormData = function () {
        if (window.File && window.FileReader && window.FileList && window.Blob)
            return true;
        return false;
    };
    utilities.prototype.download = function (text, name) {
        var a = document.createElement("a");
        var file = new Blob([text], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = name + '.json';
        a.click();
    };
    return utilities;
}());
exports.utilities = utilities;
//# sourceMappingURL=utilities.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=main.build.js.map