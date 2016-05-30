
function fun(val) {
    if(val < 10)return '0'+val;
    return val;
}

export function timeFormat(time) {
    var now = new Date(time);
    var year = now.getFullYear();
    var month = fun(now.getMonth()+1);
    var date = fun(now.getDate());
    var hour = fun(now.getHours());
    var minute = fun(now.getMinutes());
    var second = fun(now.getSeconds());
    return   year+"年"+month+"月"+date+"日  "+hour+":"+minute+":"+second;
}
