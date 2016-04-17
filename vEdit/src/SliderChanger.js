class SliderChanger {
    constructor(min,max) {
        this.input = function () {
            var input = $(`<div></div>`);
            input.slider();
            input.css({
                'margin-top':'10px',
                'border-bottom-left-radius': '4px',
                'border-bottom-right-radius': '4px',
                'border-top-left-radius': '4px',
                'border-top-right-radius': '4px',
                'border': '1px solid #aaaaaa',
                'height': '.8em',
                'position': 'relative',
                'text-align': 'left',
            });
            input.find('a').css({
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
            });
            input.slider('option', 'min', min);
            input.slider('option', 'max', max);
            return input;
        }.bind(this)();

        return this.input;
    }

}

export default SliderChanger;
