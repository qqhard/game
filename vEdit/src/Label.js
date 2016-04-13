import { labCss } from './styel.js';
class Label {
    constructor(name){
        this.label= function () {
            var lableText = $(`<div>${name}</div>`);
            lableText.css(labCss);
            lableText.css("width", "100%");
            return lableText;
        }.bind(this)();
        return this.label;
    } 
}

export default Label;