"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../wwwroot/src/utilities");
var chai = require("chai");
describe("Utilities", function () {
    var _sut;
    beforeEach(function () {
        _sut = new utilities_1.utilities();
    });
    describe("isEmptyOrSpaces", function () {
        it("should evaluate spaces as blank", function () {
            var actual = _sut.isEmptyOrSpaces('   ');
            chai.assert.equal(actual, true, "did not evaluate spaces as blank");
        });
        it('should evaluate empty string as blank', function () {
            var actual = _sut.isEmptyOrSpaces('');
            chai.assert.equal(actual, true, "did not evaluate empty string as blank");
        });
        it('should evaluate asdf string as not blank', function () {
            var actual = _sut.isEmptyOrSpaces('asdf');
            chai.assert.equal(actual, false, "did not evaluate asdf string as not blank");
        });
    });
});
//# sourceMappingURL=utilities.tests.js.map