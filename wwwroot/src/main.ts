// import * as ViewModels from './ViewModels/viewModels'

//  // Initiates object to bind in view and sets timer interval to 100ms
//  var vm = new ViewModels.CostOMeterViewModel(100);

declare var require: any
declare var vm: any
declare var riot: any

var viewModules = require('./ViewModels/viewModels');
var utils = require('./utilities');

(function makeIt() {
    var vm = new viewModules.CostOMeterViewModel(100);
    var u = new utils.utilities();
    riot.mount('costOMeterBody', {viewModel: vm, utils: u})
    riot.mount('costOMeterFooter', {viewModel: vm, utils: u})
})();