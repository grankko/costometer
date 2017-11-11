import { ConsultantTimerFactory } from "./Services/services";

declare var require: any
declare var vm: any
declare var riot: any

var viewModules = require('./ViewModels/viewModels');
var services = require('./Services/services');
var utils = require('./utilities');

// self executing entry point for app
(function makeIt() {
    var vm = new viewModules.CostOMeterViewModel(100, new ConsultantTimerFactory());
    var u = new utils.utilities();
    riot.mount('costOMeterBody', {viewModel: vm, utils: u})
    riot.mount('costOMeterFooter', {viewModel: vm, utils: u})
})();