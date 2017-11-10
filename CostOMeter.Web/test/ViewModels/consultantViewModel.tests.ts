/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/chai/index.d.ts" />


import {ConsultantViewModel}  from "../../wwwroot/src/ViewModels/viewModels"
import chai = require('chai');

describe("ConsultantViewModel", () => {

    let _sut: ConsultantViewModel;

    beforeEach(function () {
        _sut = new ConsultantViewModel(1000, 'Test consultant 1', 1, 100);
    });

    describe("new ConsultantViewModel", () => {
        it("should not be running", () => {
            let actual: boolean = _sut.isRunning;
            chai.assert.equal(actual, false, "ConsultantViewModel was running by default");
        });
    });
});