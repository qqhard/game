class TextChanger {
    constructor(){
        this.objInputTextArea = function () {
            var textArea = $("<textarea></textarea>");
            textArea.css({
                "width": "100%",
                "resize": "none",
            });
            textArea.attr("rows", 5);
            return textArea;
        }.bind(this)();
        return this.objInputTextArea;
    }
    
}

export default TextChanger;