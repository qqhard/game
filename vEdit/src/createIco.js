export default function createIco(instr) {
    var hidButton = $("<div>" + instr + "</div>")
    hidButton.css({

        'display': "inline-block",
        'margin-left': 2,
        'margin-top': 1,
        'background-color': "rgba(33,33,33,0.4ss)",
        'border': 'solid 2px #999999',
        "color": "#ffffff",
        "border-radius": 5,
        'box-align': "auto",
        "overflow": "auto",
        "margin-top": "auto",
        "margin-buttom": "auto",
    });

    $(document).on('mouseover.veditdiv mouseout.valseek_mouse', hidButton, function (event) {
        if (event.type == 'mouseover') {
            hidButton.css("cursor", "pointer");
        }
        else if (event.type == "mouseout") {
            hidButton.css('cursor', 'auto');
        }
    });
    return hidButton;
};

