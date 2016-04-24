import React from 'react';
import ReactDOM from 'react-dom';

var MediumEditor = require('medium-editor');

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text
        }
    }

    componentDidMount() {
        var dom = ReactDOM.findDOMNode(this);

        this.medium = new MediumEditor(dom, this.props.options);
        this.medium.subscribe('editableInput', (e) => {
            this._updated = true;
            this.change(dom.innerHTML);
        });
    }

    componentWillUnmount() {
        this.medium.destroy();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.text !== this.state.text && !this._updated) {
            this.setState({text: nextProps.text});
        }

        if (this._updated) this._updated = false;
    }

    render() {
        return <div dangerouslySetInnerHTML={{__html: this.state.text}}></div>;
    }

    change(text) {
        if (this.props.onChange) this.props.onChange(text, this.medium);
    }
}

export default Editor;
