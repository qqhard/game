import React from 'react';
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/bootstrap.css';
import './form.scss';
const tipText = `
在此输入赛事详情，选中文字会出现编辑条！
支持h1,h2,h3,h4,h5
`;

class GameDetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            html: ''
        }
    }

    componentDidMount() {
        var editor = new MediumEditor('.editable', {
            placeholder: {
                text: tipText,
                hideOnClick: true
            },
            toolbar: {
                allowMultiParagraphSelection: true,
                buttons: ['bold', 'italic', 'underline', 'anchor',
                    'justifyLeft','justifyCenter','justifyRight',
                    'h1', 'h2', 'h3', 'h4', 'h5', 'quote','orderedlist','unorderedlist']
            },
            paste: {
                /* This example includes the default options for paste,
                 if nothing is passed this is what it used */
                forcePlainText: true,
                cleanPastedHTML: false,
                cleanReplacements: [],
                cleanAttrs: ['class', 'style', 'dir'],
                cleanTags: ['meta']
            }
        });
        this.editor = editor;
    }

    handleClick() {
        var temp = this.editor.serialize();
        this.setState({html: temp['element-0'].value});
    }

    render() {
        return (
            <div className="container">
                <div className="editable form-game-detail">
                </div>
                <button className="btn btn-primary" style={{marginTop:'50px'}} onClick={this.handleClick.bind(this)}>
                    保存
                </button>
                <div className="form-game-detail" dangerouslySetInnerHTML={{__html: this.state.html}}>
                </div>
            </div>
        );
    }
}

export default GameDetailForm;
