var viewModules = require('./ViewModels/viewModels');
var utils = require('./utilities');
(function makeIt() {
    var vm = new viewModules.CostOMeterViewModel(100);
    var u = new utils.utilities();
    riot.mount('costOMeterBody', { viewModel: vm, utils: u });
    riot.mount('costOMeterFooter', { viewModel: vm, utils: u });
})();
//# sourceMappingURL=main.js.map