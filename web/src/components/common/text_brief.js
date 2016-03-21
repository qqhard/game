
export function textBrief(text, num){
    if(text.length <= num)return text;
    var left = num/2;
    var right = num - left;
    return text.substr(0,left)+"..."+text.substr(text.length-right,right);
}