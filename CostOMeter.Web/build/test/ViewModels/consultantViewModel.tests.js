"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var viewModels_1 = require("../../wwwroot/src/ViewModels/viewModels");
var ConsultantTimerMock_1 = require("../Mocks/ConsultantTimerMock");
var chai = require("chai");
describe("ConsultantViewModel", function () {
    var _sut;
    beforeEach(function () {
        _sut = new viewModels_1.ConsultantViewModel(new ConsultantTimerMock_1.ConsultantTimerMock(), 1000, 'Test Consultant 1', 1);
        _sut.onTimerTicking = function () { };
    });
    describe("new ConsultantViewModel", function () {
        it("should not be running", function () {
            var actual = _sut.isRunning;
            chai.assert.equal(actual, false, "ConsultantViewModel was running by default");
        });
    });
    describe("ConsultantViewModel", function () {
        it("should report correct cost after five hours running", function () {
            _sut.ticking(5, _sut);
            var actual = _sut.getTotalCost();
            chai.assert.equal(actual, 5000, "ConsultantViewModel did not report correct amount after five hours");
        });
        it("should start running when started", function () {
            _sut.start();
            var actual = _sut.isRunning;
            chai.assert.equal(actual, true, "ConsultantViewModel did not start running when started");
        });
        it("should stop running when paused", function () {
            _sut.start();
            var actual = _sut.isRunning;
            chai.assert.equal(actual, true, "ConsultantViewModel did not start running when started");
            _sut.pause();
            _sut.ticking(1, _sut);
            actual = _sut.isRunning;
            chai.assert.equal(actual, false, "ConsultantViewModel did not stop running when paused");
        });
    });
});
//# sourceMappingURL=consultantViewModel.tests.js.map