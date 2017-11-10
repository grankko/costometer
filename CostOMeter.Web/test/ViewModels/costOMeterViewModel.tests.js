"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var viewModels_1 = require("../../wwwroot/src/ViewModels/viewModels");
var chai = require("chai");
describe("CostOMeterViewModel", function () {
    var _sut;
    describe("new CostOMeterViewModel", function () {
        beforeEach(function () {
            _sut = new viewModels_1.CostOMeterViewModel(100);
        });
        it("should not be runnable", function () {
            var actual = _sut.getIsRunnable();
            chai.assert.equal(actual, false, "ConsultantViewModel was runnable without consultants");
        });
        it("should not be pausable", function () {
            var actual = _sut.getIsPausable();
            chai.assert.equal(actual, false, "ConsultantViewModel was pausable without consultants");
        });
        it("should not be saveable", function () {
            var actual = _sut.getIsSaveable();
            chai.assert.equal(actual, false, "ConsultantViewModel was saveable without consultants");
        });
        it("should not be running", function () {
            var actual = _sut.getIsRunning();
            chai.assert.equal(actual, false, "ConsultantViewModel was running from start");
        });
    });
    describe("CostOMeterViewModel with consultants", function () {
        beforeEach(function () {
            _sut = new viewModels_1.CostOMeterViewModel(100);
            _sut.addConsultant('test dude 1', 1000);
            _sut.addConsultant('test dude 2', 900);
        });
        it("should be runnable", function () {
            var actual = _sut.getIsRunnable();
            chai.assert.equal(actual, true, "ConsultantViewModel was not runnable with consultants");
        });
        it("should be saveable", function () {
            var actual = _sut.getIsSaveable();
            chai.assert.equal(actual, true, "ConsultantViewModel was not saveable with consultants");
        });
        it("should not be pausable", function () {
            var actual = _sut.getIsPausable();
            chai.assert.equal(actual, false, "ConsultantViewModel was pausable when already paused");
        });
        it("should have total hourly cost of 1900", function () {
            var actual = _sut.getTotalHourlyCost();
            chai.assert.equal(actual, '1900', "Total Hourly cost was not calculated correct");
        });
    });
    describe("CostOMeterViewModel with consultants", function () {
        beforeEach(function () {
            _sut = new viewModels_1.CostOMeterViewModel(100);
            _sut.addConsultant('test dude 1', 1000);
            _sut.addConsultant('test dude 2', 900);
        });
        it("should have two consultants", function () {
            var actual = _sut.consultants.length;
            chai.assert.equal(actual, 2, 'Number of consultants not expected');
        });
        it("should be able to remove consultant", function () {
            var consultantToRemouve = _sut.consultants[0];
            _sut.removeConsultant(consultantToRemouve);
            var actual = _sut.consultants.length;
            chai.assert.equal(actual, 1, 'Number of consultants not expected');
        });
        it("should be able to clear all consultants", function () {
            _sut.resetViewModel();
            var actual = _sut.consultants.length;
            chai.assert.equal(actual, 0, 'Number of consultants not expected');
        });
    });
});
//# sourceMappingURL=costOMeterViewModel.tests.js.map