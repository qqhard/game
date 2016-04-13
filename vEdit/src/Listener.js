class Listener {
    setOperDiv(operDiv) {
        this.operDiv = operDiv;
    }

    onTextInit(input) {
        input.val(this.operDiv.html());
    }

    onTextChange(input) {
        input.on('keyup.veditdiv', function () {
            this.operDiv.html(input.val());
        }.bind(this));
    }

    onAttrInit(input, attr) {
        input.val(this.operDiv.attr(attr));
    }

    onAttrChange(input, attr) {
        input.on('keyup.veditdiv', function () {
            this.operDiv.attr(attr, input.val());
        }.bind(this));
    }

    onSelectCssChange(input, attr) {
        input.on('change.veditdiv', () => {
            let val = input.val();
            this.operDiv.css(attr, `${val}`);
        });
    }
}

export default Listener;