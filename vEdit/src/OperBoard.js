import HiddenIco from './HiddenIco.js';
import QuitIco from './QuitIco.js';
import SaveIco from './SaveIco.js';
import TextChanger from './TextChanger.js';
import HrefChanger from './HrefChanger.js';
import FontFamliyChanger from './FontFamliyChanger.js';
import Label from './Label.js';
import SliderChanger from './SliderChanger.js';
import ColorChanger from './ColorChanger.js';

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
        this.listener.onAttrChange(this.objHrefTextArea, 'href');
        this.objOperBoard.append(new Label('超链接'));
        this.objOperBoard.append(this.objHrefTextArea);

        this.fontFamliy = new FontFamliyChanger();
        this.listener.onSelectCssChange(this.fontFamliy, 'font-family');
        this.objOperBoard.append(new Label('字体'));
        this.objOperBoard.append(this.fontFamliy);
        
        this.colors = [
            {label:'内容颜色',attr:'color',input:null},
            {label:'背景颜色',attr:'background-color',input:null},
            {label:'边框颜色',attr:'border-color',input:null},
        ];
       
        for(let i in this.colors){
            let input = new ColorChanger();
            this.listener.onColorChange(input,this.colors[i].attr);
            this.objOperBoard.append(new Label(this.colors[i].label));
            this.objOperBoard.append(input.input());
            this.colors[i].input = input;
        }
        
        this.opacity = new SliderChanger(0,100);
        this.listener.onSliderFloatChange(this.opacity,'opacity');
        this.objOperBoard.append(new Label('透明度'));
        this.objOperBoard.append(this.opacity);
       
        // var objInputBackgroundColor = textInputBlock("背景颜色 ：", "background-color", null);
        // var objInputTextColor = textInputBlock("文字颜色 ：", "color", null);
        // var objInputBorder = textInputBlock("边框属性 ：", "border", null);
        // var objInputOpacity = textInputBlock("透明度值 ：", "opacity", null);
        this.inputs = [
            {label: '字体大小', attr: 'font-size', min: 0, max: 300, unit: 'px', input: null},
            {label: '总圆角', attr: 'border-radius', min: 0, max: 100, unit: 'px', input: null},
            {label: '边框宽度', attr: 'border-width', min: 0, max: 10, unit: 'px', input: null},
            {label: '元素宽度', attr: 'width', min: 0, max: 1500, unit: 'px', input: null},
            {label: '元素高度', attr: 'height', min: 0, max: 1500, unit: 'px', input: null},
            // {label: '元素左距', attr: 'left', min: 0, max: 500, unit: 'px', input: null},
            // {label: '元素上距', attr: 'top', min: 0, max: 500, unit: 'px', input: null},
            // {label: '元素右距', attr: 'right', min: 0, max: 500, unit: 'px', input: null},
            // {label: '元素下距', attr: 'bottom', min: 0, max: 500, unit: 'px', input: null},
            {label: '上外边距', attr: 'margin-top', min: 0, max: 500, unit: 'px', input: null},
            {label: '下外边距', attr: 'margin-bottom', min: 0, max: 500, unit: 'px', input: null},
            {label: '左外边距', attr: 'margin-left', min: 0, max: 500, unit: 'px', input: null},
            {label: '右外边距', attr: 'margin-right', min: 0, max: 500, unit: 'px', input: null},
            {label: '上内边距', attr: 'padding-top', min: 0, max: 500, unit: 'px', input: null},
            {label: '下内边距', attr: 'padding-bottom', min: 0, max: 500, unit: 'px', input: null},
            {label: '左内边距', attr: 'padding-left', min: 0, max: 500, unit: 'px', input: null},
            {label: '右内边距', attr: 'padding-right', min: 0, max: 500, unit: 'px', input: null},
            {label: '左上圆角', attr: 'border-top-left-radius', min: 0, max: 100, unit: 'px', input: null},
            {label: '左下圆角', attr: 'border-bottom-left-radius', min: 0, max: 100, unit: 'px', input: null},
            {label: '右上圆角', attr: 'border-top-right-radius', min: 0, max: 100, unit: 'px', input: null},
            {label: '右下圆角', attr: 'border-bottom-right-radius', min: 0, max: 100, unit: 'px', input: null},
        ];

        for (let i in this.inputs) {
            let input = new SliderChanger(this.inputs[i].min, this.inputs[i].max);
            this.listener.onSliderChange(input, this.inputs[i].attr, this.inputs[i].unit);
            this.objOperBoard.append(new Label(this.inputs[i].label));
            this.objOperBoard.append(input);
            this.inputs[i].input = input;
        }

    }

    setOperDiv(operDiv) {
        this.objOperDiv = operDiv;
    }

    getOperDiv() {
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
        this.listener.onAttrInit(this.objHrefTextArea, 'href');
        this.listener.onSliderFloatInit(this.opacity,'opacity');
        for(let i in this.colors){
            this.listener.onColorInit(this.colors[i].input, this.colors[i].attr);
        }
        for (let i in this.inputs) {
            this.listener.onSliderInit(this.inputs[i].input, this.inputs[i].attr, this.inputs[i].unit);
        }
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