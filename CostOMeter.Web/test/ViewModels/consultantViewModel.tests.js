"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var viewModels_1 = require("../../wwwroot/src/ViewModels/viewModels");
var chai = require("chai");
describe("ConsultantViewModel", function () {
    var _sut;
    beforeEach(function () {
        _sut = new viewModels_1.ConsultantViewModel(1000, 'Test consultant 1', 1, 100);
    });
    describe("new ConsultantViewModel", function () {
        it("should not be running", function () {
            var actual = _sut.isRunning;
            chai.assert.equal(actual, false, "ConsultantViewModel was running by default");
        });
    });
});
//# sourceMappingURL=consultantViewModel.tests.js.map