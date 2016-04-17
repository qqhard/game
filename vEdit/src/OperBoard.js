import HiddenIco from './HiddenIco.js';
import QuitIco from './QuitIco.js';
import SaveIco from './SaveIco.js';
import TextChanger from './TextChanger.js';
import HrefChanger from './HrefChanger.js';
import FontFamliyChanger from './FontFamliyChanger.js';
import Label from './Label.js';
import FontSizeChanger from './FontSizeChanger.js';
import SliderChanger from './SliderChanger.js';

class OperBoard {
    constructor(listener) {
        this.listener = listener; 
        this.objOperBoard = function () {
            var operBoard = $("<div></div>");
            operBoard.css({
                "background-color": "rgba(0,0,0,0.5)",
                "position": "absolute",
                "left": 0,
                "border-top-right-radius": 10,
                "border-bottom-right-radius": 10,
                "width": 0,
                "height": "100%",
                "z-index": 9999,
                "padding-right": "8px",
                "position": "fixed",

            });
            operBoard.attr("class", "veditdiv_control_board");
            operBoard.attr("hidden", true);
            $('body').prepend(operBoard);
            return operBoard;
        }();
        this.objOperBoard.append(new HiddenIco(this.objOperBoard));
        this.objOperBoard.append(new QuitIco(this));
        this.objOperBoard.append(new SaveIco());
        
        this.objInputTextArea = new TextChanger();
        this.objOperBoard.append(new Label('文字内容'));
        this.objOperBoard.append(this.objInputTextArea);
        this.listener.onTextChange(this.objInputTextArea);
        
        this.objHrefTextArea = new HrefChanger();
        this.listener.onAttrChange(this.objHrefTextArea,'href');
        this.objOperBoard.append(new Label('超链接'));
        this.objOperBoard.append(this.objHrefTextArea);
        
        this.fontFamliy = new FontFamliyChanger();
        this.listener.onSelectCssChange(this.fontFamliy,'font-family');
        this.objOperBoard.append(new Label('字体'));
        this.objOperBoard.append(this.fontFamliy);
        
        // if(this.objOperDiv[0].tagName == 'A'){
        //     this.objHrefInput = new HrefChanger(this.objOperBoard);
        //     this.objOperBoard.append(this.objHrefInput);
        // }
        this.fontSize = new SliderChanger(0,300);
        this.listener.onSliderChange(this.fontSize,'font-size','px');
        this.objOperBoard.append(new Label('字号'));
        this.objOperBoard.append(this.fontSize);
    }
    
    setOperDiv(operDiv){
        this.objOperDiv = operDiv;
    }
    getOperDiv(){
        return this.objOperDiv;
    }
    
    showBoard() {
        this.objOperBoard.attr("hidden", false);
        this.objOperBoard.css('overflow', 'auto');
        this.objOperBoard.css({
            width: 250
        });
        $(".initpos").trigger("initPos");
    }
    
    hiddenBoard() {
        this.objOperBoard.css('overflow', 'hidden');
        this.objOperBoard.css("width", 0);
        this.objOperBoard.attr("hidden", true);
    }
    
    initOperBoard() {
        this.listener.onTextInit(this.objInputTextArea);
        this.listener.onAttrInit(this.objHrefTextArea,'href');
        // if(this.objOperDiv[0].tagName == 'A'){
        //     
        //     this.objHrefInput.val(this.objOperDiv.attr('href'));
        // }else {
        //     if(!!this.objHrefInput)this.objHrefInput.remove(); 
        // }
        $(".initdata").trigger("initData");
    }
}

export default OperBoard;