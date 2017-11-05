function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

interface HTMLInputElement {
    createTextRange?(): Range;
}

function selectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;    
    if ((<HTMLInputElement>doc.body).createTextRange) {
        range = (<HTMLInputElement>document.body).createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function supportFormData() {
    if ((<any>window).File && (<any>window).FileReader && (<any>window).FileList && window.Blob)
        return true;

    return false;
}

function download(text, name) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = name + '.json';
    a.click();
}