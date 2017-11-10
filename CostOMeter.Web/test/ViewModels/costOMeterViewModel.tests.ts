/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/chai/index.d.ts" />


import {CostOMeterViewModel}  from "../../wwwroot/src/ViewModels/viewModels"
import chai = require('chai');
import {TimerMockFactory}  from "../Mocks/ConsultantTimerMock"

describe("CostOMeterViewModel", () => {

    let _sut: CostOMeterViewModel;

    describe("new CostOMeterViewModel", () => {
        beforeEach(function () {
            _sut = new CostOMeterViewModel(100, new TimerMockFactory());
        });

        it("should not be runnable", () => {
            let actual: boolean = _sut.getIsRunnable();
            chai.assert.equal(actual, false, "ConsultantViewModel was runnable without consultants");
        });
        it("should not be pausable", () => {
            let actual: boolean = _sut.getIsPausable();
            chai.assert.equal(actual, false, "ConsultantViewModel was pausable without consultants");
        });
        it("should not be saveable", () => {
            let actual: boolean = _sut.getIsSaveable();
            chai.assert.equal(actual, false, "ConsultantViewModel was saveable without consultants");
        });
        it("should not be running", () => {
            let actual: boolean = _sut.getIsRunning();
            chai.assert.equal(actual, false, "ConsultantViewModel was running from start");
        });
    });

    describe("CostOMeterViewModel with consultants", () => {
        beforeEach(function () {
            _sut = new CostOMeterViewModel(100, new TimerMockFactory());
            _sut.addConsultant('test dude 1', 1000);
            _sut.addConsultant('test dude 2', 900);
        });

        it("should be runnable", () => {
            let actual: boolean = _sut.getIsRunnable();
            chai.assert.equal(actual, true, "ConsultantViewModel was not runnable with consultants");
        });
        it("should be saveable", () => {
            let actual: boolean = _sut.getIsSaveable();
            chai.assert.equal(actual, true, "ConsultantViewModel was not saveable with consultants");
        });
        it("should not be pausable", () => {
            let actual: boolean = _sut.getIsPausable();
            chai.assert.equal(actual, false, "ConsultantViewModel was pausable when already paused");
        });
        it("should have total hourly cost of 1900", () => {
            let actual: string = _sut.getTotalHourlyCost();
            chai.assert.equal(actual, '1900', "Total Hourly cost was not calculated correct");
        });
    });

    describe("CostOMeterViewModel with consultants", () => {
        beforeEach(function () {
            _sut = new CostOMeterViewModel(100, new TimerMockFactory());
            _sut.addConsultant('test dude 1', 1000);
            _sut.addConsultant('test dude 2', 900);
        });

        it("should have two consultants", () => {
            var actual = _sut.consultants.length;
            chai.assert.equal(actual, 2, 'Number of consultants not expected');
        });

        it("should be able to remove consultant", () => {
            var consultantToRemouve = _sut.consultants[0];
            _sut.removeConsultant(consultantToRemouve);

            var actual = _sut.consultants.length;
            chai.assert.equal(actual, 1, 'Number of consultants not expected');
        });

        it("should be able to clear all consultants", () => {
            _sut.resetViewModel();
            var actual = _sut.consultants.length;
            chai.assert.equal(actual, 0, 'Number of consultants not expected');
        });

    });
});