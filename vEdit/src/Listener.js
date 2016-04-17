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

    onSliderFloatInit(input, attr, unit) {
        let size = this.operDiv.css(attr);
        input.slider('option', 'value', size * 100);
    }

    onSliderFloatChange(input, attr) {
        input.slider({
            slide: ()=>this.operDiv.css(attr, `${input.slider('value') / 100.0}`),
            change: ()=>this.operDiv.css(attr, `${input.slider('value') / 100.0}`)
        });
    }

    onSliderInit(input, attr, unit) {
        let sizeStr = this.operDiv.css(attr);
        let size = sizeStr.substring(0, sizeStr.indexOf(unit));
        input.slider('option', 'value', size);
    }

    onSliderChange(input, attr, unit) {
        input.slider({
            slide: ()=>this.operDiv.css(attr, `${input.slider('value')}${unit}`),
            change: ()=>this.operDiv.css(attr, `${input.slider('value')}${unit}`)
        });
    }

    onColorInit(input, attr) {
        let color = this.operDiv.css(attr);
        var arr = color.substring(color.indexOf('(')+1,color.indexOf(')')).split(',');
        for(let i in arr){
            arr[i] = arr[i].trim();
        }
        input.red.slider('option','value',parseInt(arr[0]));
        input.green.slider('option','value',parseInt(arr[1]));
        input.blue.slider('option','value',parseInt(arr[2]));
    }


    onColorChange(input, attr) {
        input.red.slider({
            slide: ()=>this.operDiv.css(attr, input.refreshSwatch()),
            change: ()=>this.operDiv.css(attr, input.refreshSwatch())
        });
        input.green.slider({
            slide: ()=>this.operDiv.css(attr, input.refreshSwatch()),
            change: ()=>this.operDiv.css(attr, input.refreshSwatch())
        });
        input.blue.slider({
            slide: ()=>this.operDiv.css(attr, input.refreshSwatch()),
            change: ()=>this.operDiv.css(attr, input.refreshSwatch())
        });
    }
}

export default Listener;