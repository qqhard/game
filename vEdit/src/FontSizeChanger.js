import { selectCss } from './styel.js';
const fontSizes = [
    {name:'小六',value:'8px'},
    {name:'六号',value:'10px'},
    {name:'五号',value:'14px'},
    {name:'小四',value:'16px'},
    {name:'四号',value:'18px'},
    {name:'小三',value:'20px'},
]

class FontSizeChanger{
    constructor() {
        var options = fontSizes.map((val,index)=> {
            return `<option value="${val.value}">${val.name}</option>`;
        });

        var select = $(`<select>${options}</select>`);
        select.css(selectCss); 
        return select;
    }

}

export default FontSizeChanger;
