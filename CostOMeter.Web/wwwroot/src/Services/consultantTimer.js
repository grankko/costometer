"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsultantTimerFactory = (function () {
    function ConsultantTimerFactory() {
    }
    ConsultantTimerFactory.prototype.createTimer = function (timerInterval) {
        return new ConsultantTimer(timerInterval);
    };
    return ConsultantTimerFactory;
}());
exports.ConsultantTimerFactory = ConsultantTimerFactory;
var ConsultantTimer = (function () {
    function ConsultantTimer(timerInterval) {
        this.timerInterval = timerInterval;
    }
    ConsultantTimer.prototype.start = function () {
        var _this = this;
        this.timer = setInterval(function () {
            _this.ticking();
        }, this.timerInterval);
    };
    ConsultantTimer.prototype.stop = function () {
        clearInterval(this.timer);
    };
    ConsultantTimer.prototype.ticking = function () {
        var elapsed = (new Date().getTime() - this.lastStarted);
        var elapsedHours = (elapsed / 1000) / 3600;
        this.onTick(elapsedHours);
    };
    return ConsultantTimer;
}());
exports.ConsultantTimer = ConsultantTimer;
//# sourceMappingURL=consultantTimer.js.map