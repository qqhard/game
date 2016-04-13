import { selectCss } from './styel.js';
const fontFamliys = [
    {name:'宋体',value:'SimSun'},
    {name:'黑体',value:'SimHei'},
    {name:'微软雅黑',value:'Microsoft YaHei'},
    {name:'微软正黑体',value:'Microsoft JhengHei'},
    {name:'新宋体',value:'NSimSun'},
    {name:'新细明体',value:'PMingLiU'},
    {name:'细明体',value:'MingLiU'},
    {name:'标楷体',value:'DFKai-SB'},
    {name:'仿宋',value:'FangSong'},
    {name:'楷体',value:'KaiTi'},
    {name:'仿宋',value:'GB2312 FangSong_GB2312'},
    {name:'楷体',value:'GB2312 KaiTi_GB2312'},
]

class FontFamliyChanger {
    constructor() {
        var options = fontFamliys.map((val,index)=> {
            return `<option value="${val.value}">${val.name}</option>`;  
        });
        
        var select = $(`<select>${options}</select>`);
        select.css(selectCss); 
        return select; 
    }

}

export default FontFamliyChanger;