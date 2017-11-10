/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/chai/index.d.ts" />


import {ConsultantViewModel}  from "../../wwwroot/src/ViewModels/viewModels"
import {ConsultantTimerMock}  from "../Mocks/ConsultantTimerMock"
import chai = require('chai');

describe("ConsultantViewModel", () => {

    let _sut: ConsultantViewModel;

    beforeEach(function () {
        _sut = new ConsultantViewModel(new ConsultantTimerMock(), 1000, 'Test Consultant 1', 1);
        _sut.onTick = () => {};
    });

    describe("new ConsultantViewModel", () => {
        it("should not be running", () => {
            let actual: boolean = _sut.isRunning;
            chai.assert.equal(actual, false, "ConsultantViewModel was running by default");
        });
    });

    describe("ConsultantViewModel", () => {
        it("should report correct cost after five hours running", () => {
            _sut.ticking(5);
            let actual = _sut.getTotalCost();

            chai.assert.equal(actual, 5000, "ConsultantViewModel did not report correct amount after five hours");
        });

        it("should start running when started", () => {
            _sut.start();
            let actual = _sut.isRunning;

            chai.assert.equal(actual, true, "ConsultantViewModel did not start running when started");
        });

        it("should stop running when paused", () => {
            _sut.start();
            let actual = _sut.isRunning;

            chai.assert.equal(actual, true, "ConsultantViewModel did not start running when started");

            _sut.pause();
            _sut.ticking(1);
            actual = _sut.isRunning;
            chai.assert.equal(actual, false, "ConsultantViewModel did not stop running when paused");
        });
    });
});