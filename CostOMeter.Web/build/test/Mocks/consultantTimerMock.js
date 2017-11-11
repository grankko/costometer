"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsultantTimerMock = (function () {
    function ConsultantTimerMock() {
    }
    ConsultantTimerMock.prototype.start = function () {
    };
    ConsultantTimerMock.prototype.stop = function () {
    };
    return ConsultantTimerMock;
}());
exports.ConsultantTimerMock = ConsultantTimerMock;
var TimerMockFactory = (function () {
    function TimerMockFactory() {
    }
    TimerMockFactory.prototype.createTimer = function () {
        return new ConsultantTimerMock();
    };
    return TimerMockFactory;
}());
exports.TimerMockFactory = TimerMockFactory;
//# sourceMappingURL=consultantTimerMock.js.map