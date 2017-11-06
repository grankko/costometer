interface HTMLInputElement {
    createTextRange?(): Range;
}

export class utilities {

    constructor() {}

    public isEmptyOrSpaces(inputText :string) :boolean {
        return inputText === null || inputText.match(/^ *$/) !== null;
    }
    
    public selectText(element) {
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
    
    public supportFormData() {
        if ((<any>window).File && (<any>window).FileReader && (<any>window).FileList && window.Blob)
            return true;
    
        return false;
    }
    
    public download(text, name) {
        var a = document.createElement("a");
        var file = new Blob([text], {type: 'application/json'});
        a.href = URL.createObjectURL(file);
        a.download = name + '.json';
        a.click();
    }
}
