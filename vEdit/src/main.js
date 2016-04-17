import createOperIco from './createOperIco.js';
import OperBoard from './OperBoard.js';
import Listener from './Listener.js';
global.$ = require('jquery');
require('jquery-ui/slider.js');
(()=> {
    var operateIco = null;
    var operateBoard = null;
    var listener = new Listener();
    $(document).on('mouseover.veditdiv', '.veditdiv', function (event) {
        event.stopPropagation();
        if (operateIco != null) operateIco.remove();
        var pleft = event.target.offsetLeft;
        var ptop = event.target.offsetTop;
        operateIco = createOperIco(pleft, ptop);
        $(event.target).append(operateIco);
    });
    $(document).on('mouseover.veditdiv mouseout.veditdiv', '.veditdiv_control_ico', function (event) {
        if (event.type == 'mouseover') {
            event.stopPropagation();
            $(event.target).css({
                "cursor": "pointer"
            });
        }
        else if (event.type == 'mouseout') {
            $(event.target).css({
                "cursor": "auto"
            });
        }
    });
    $(document).on('click.veditdiv', '.veditdiv_control_ico', function (event) {
        console.log('click');
        event.stopPropagation();
        listener.setOperDiv($(this).parent());
        if (operateBoard == null) {
            operateBoard = new OperBoard(listener);
        }
        operateBoard.showBoard();
        $(event.target).remove();
        operateBoard.initOperBoard();
        return false;
    });
})();

