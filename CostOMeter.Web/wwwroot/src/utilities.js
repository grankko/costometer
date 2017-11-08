"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities = (function () {
    function utilities() {
    }
    utilities.prototype.isEmptyOrSpaces = function (inputText) {
        return inputText === null || inputText.match(/^ *$/) !== null;
    };
    utilities.prototype.selectText = function (element) {
        var doc = document, text = doc.getElementById(element), range, selection;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        }
        else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
    utilities.prototype.supportFormData = function () {
        if (window.File && window.FileReader && window.FileList && window.Blob)
            return true;
        return false;
    };
    utilities.prototype.download = function (text, name) {
        var a = document.createElement("a");
        var file = new Blob([text], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = name + '.json';
        a.click();
    };
    return utilities;
}());
exports.utilities = utilities;
//# sourceMappingURL=utilities.js.map