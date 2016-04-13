class HrefChanger {
    constructor(){
        this.objHrefInput = function () {
            var textArea = $("<textarea></textarea>");
            textArea.css({
                "width": "100%",
                "resize": "none",
            });
            textArea.attr("rows", 3);
            return textArea;
        }.bind(this)();
        return this.objHrefInput;
    }
    
}

export default HrefChanger;
