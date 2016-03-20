
export function timeFormat(time) {
    var now = new Date(time);
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return   year+"年"+month+"月"+date+"日  "+hour+":"+minute+":"+second;
}
