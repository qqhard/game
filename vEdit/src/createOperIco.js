export default function createOperIco(pleft, ptop) {
    var operIco = $("<a>C</a>");
    operIco.css({
        "opacity": 0.6,
        "background-color": "#663300",
        "height": 15,
        "width": 15,
        "position": "absolute",
        "left": pleft,
        "top": ptop,
        "color": "#ffffff",
        "font-size": 12,
    });
    operIco.attr("class", "veditdiv_control_ico");
    return operIco;
}
