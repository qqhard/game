import createIco from './createIco.js';

class QuitIco {
    constructor(operBoard){
        var self = createIco("close");
        self.on("mouseover.veditdiv mouseout.veditdiv", function (event) {
            event.stopPropagation();
            if (event.type == "mouseover") {
                self.css("cursor", "pointer");
            }
            else if (event.type == "mouseout") {
                self.css("cursor", "auto");
            }
        });
        self.on("click.veditdiv", function (event, obj) {
            event.stopPropagation();
            operBoard.hiddenBoard();
        }.bind(this));
        return self;
    }

}

export default QuitIco;
