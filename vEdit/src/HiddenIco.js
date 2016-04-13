import createIco from './createIco.js';

class HiddenIco {
    constructor(operBoard){
        var self = createIco('hidden');
        self.on("mouseover.veditdiv mouseout.veditdiv", function (event) {
            event.stopPropagation();
            if (event.type == "mouseover") {
                self.css("cursor", "pointer");
                operBoard.css("opacity", 0);
            }
            else if (event.type == "mouseout") {
                self.css("cursor", "auto");
                operBoard.css("opacity", 1);
            }
        }.bind(this));
        return self;
    }
    
}

export default HiddenIco;