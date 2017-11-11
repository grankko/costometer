/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/chai/index.d.ts" />


import {utilities}  from "../wwwroot/src/utilities"
import chai = require('chai');

describe("Utilities", () => {

    let _sut: utilities;

    beforeEach(function () {
        _sut = new utilities();
    });

    describe("isEmptyOrSpaces", () => {
        it("should evaluate spaces as blank", () => {
            let actual: boolean = _sut.isEmptyOrSpaces('   ');
            chai.assert.equal(actual, true, "did not evaluate spaces as blank");
        });
        
        it('should evaluate empty string as blank', () => {
            let actual: boolean = _sut.isEmptyOrSpaces('');
            chai.assert.equal(actual, true, "did not evaluate empty string as blank");
        });
        it('should evaluate asdf string as not blank', () => {
            let actual: boolean = _sut.isEmptyOrSpaces('asdf');
            chai.assert.equal(actual, false, "did not evaluate asdf string as not blank");
        });
    });
});