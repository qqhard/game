const sliderDiv = {
    'margin-left': '20px',
    'margin-right': '20px',
    'margin-top': '5px',
    'margin-bottom': '5px',
    'border-bottom-left-radius': '4px',
    'border-bottom-right-radius': '4px',
    'border-top-left-radius': '4px',
    'border-top-right-radius': '4px',
    'border': '1px solid #aaaaaa',
    'height': '.8em',
    'position': 'relative',
    'text-align': 'left',
};
const sliderRange = {
    'background': 'rgb(75, 140, 223)',
    'height': '100%'
};
const sliderHandle = {
    'border': '1px solid #d3d3d3',
    'background': '#e6e6e6',
    'font-weight': 'normal',
    'color': '#555555',
    'top': '-.3em',
    'margin-left': '-.6em',
    'position': 'absolute',
    'z-index': '2',
    'width': '1.2em',
    'height': '1.2em',
    'cursor': 'default',
    'border-bottom-left-radius': '4px',
    'border-bottom-right-radius': '4px',
    'border-top-left-radius': '4px',
    'border-top-right-radius': '4px',
};

class ColorChanger {
    constructor() {
        this.div = $('<div></div>');
        this.red = $('<div></div>');
        this.green = $('<div></div>');
        this.blue = $('<div></div>');
        this.opac = $('<div></div>');
        this.red.slider({
            orientation: "horizontal",
            range: "min",
            max: 255
        });
        this.red.css(sliderDiv);
        this.red.find('.ui-slider-range').css({'background': '#ef2929', 'height': '100%'});
        this.red.find('a').css(sliderHandle);

        this.green.slider({
            orientation: "horizontal",
            range: "min",
            max: 255
        });
        this.green.css(sliderDiv);
        this.green.find('.ui-slider-range').css({'background': '#8ae234', 'height': '100%'});
        this.green.find('a').css(sliderHandle);

        this.blue.slider({
            orientation: "horizontal",
            range: "min",
            max: 255
        });
        this.blue.css(sliderDiv);
        this.blue.find('.ui-slider-range').css({'background': '#729fcf', 'height': '100%'});
        this.blue.find('a').css(sliderHandle);

        this.opac.slider({
            orientation: "horizontal",
            range: "min",
            max: 100
        });
        this.opac.css(sliderDiv);
        this.opac.find('.ui-slider-range').css({'height': '100%'});
        this.opac.find('a').css(sliderHandle);
        
        this.div.append(this.red);
        this.div.append(this.green);
        this.div.append(this.blue);
        this.div.append(this.opac);
    }

    input() {
        return this.div;
    }
    
    refreshSwatch() {
        var red = this.red.slider("value"),
            green = this.green.slider("value"),
            blue = this.blue.slider("value"),
            opac = this.opac.slider("value")/100.0;
        return `rgba(${red},${green},${blue},${opac})`;
    }
}

export default ColorChanger;
