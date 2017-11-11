"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var services_1 = require("./Services/services");
var viewModules = require('./ViewModels/viewModels');
var services = require('./Services/services');
var utils = require('./utilities');
(function makeIt() {
    var vm = new viewModules.CostOMeterViewModel(100, new services_1.ConsultantTimerFactory());
    var u = new utils.utilities();
    riot.mount('costOMeterBody', { viewModel: vm, utils: u });
    riot.mount('costOMeterFooter', { viewModel: vm, utils: u });
})();
//# sourceMappingURL=main.js.map