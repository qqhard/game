import React from 'react';
import CsrfToken from '../common/csrf_token.js';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/bootstrap.css';
import Editor from '../editor/editor.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import message from 'antd/lib/message';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import './form.scss';

const tipText = `在此输入赛事详情，选中文字会出现编辑条！
支持h1,h2,h3,h4,h5
`;

const buttons = [
    'bold', 'italic', 'underline', 'anchor',
    'justifyLeft', 'justifyCenter', 'justifyRight',
    'h1', 'h2', 'h3', 'h4', 'h5', 'quote', 'orderedlist', 'unorderedlist',
    'removeFormat','strikethrough','image','pre','justifyFull'
];


class GameDetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            html: '',
            tip: '',
            view: 0
        }
    }

    componentDidMount() {
        const url = `/gameApi/game/detail/${this.props.gamename}`;
        $.get(url, (data)=> {
            if (!!data) {
                this.setState({html: data.text});
            } else {
                this.setState({tip: tipText});
                console.log('tes')
            }
        });
    }

    handleClick() {
        const url = `/gameApi/game/detail/${this.props.gamename}`;
        $.ajax({
            url: url,
            type: "PUT",
            data: {
                text: this.state.html,
                _csrf: $("input[name=_csrf]").val()
            },
            success: (data)=> {
                console.log(data);
                message.success('保存成功！');
            },
            error: (error)=> {
                console.log(error);
            }
        });
    }

    handleChange(text, medium) {
        this.setState({html: text});
    }

    handleView(view) {
        this.setState({view: view});
    }

    render() {
        const pla = {
            text: 'fjisType your text',
            hideOnClick: true
        };
        const views = [
            <div className="form-game-detail" dangerouslySetInnerHTML={{__html: this.state.html}}>
            </div>,
            <div className="form-game-detail" style={{border:"1px #000"}}>
                <Editor
                    placeholder={tipText}
                    text={this.state.html}
                    options={{
                        toolbar: {buttons: buttons},
                        placeholder:{text:this.state.tip,hideOnClick:true}
                    }}
                    onChange={this.handleChange.bind(this)}
                />
            </div>,
        ];
        const heads = [
            <PageHeader>赛事详情
                <small>&nbsp;&nbsp;&nbsp;预览模式</small>
            </PageHeader>,
            <PageHeader>编辑模式
                <small>&nbsp;&nbsp;&nbsp;选中文字会出现编辑选项</small>
            </PageHeader>,
        ];
        const entry_url = `/game-${this.props.gamename}.html`;
        return (
            <div>
                {heads[this.state.view]}
                <CsrfToken />
                {views[this.state.view]}
                <ButtonGroup style={{marginTop:'30px'}}>
                    <button className="btn btn-primary" disabled={this.state.view==0}
                            onClick={this.handleView.bind(this,0)}>
                        预览
                    </button>
                    <button className="btn btn-primary" disabled={this.state.view==1}
                            onClick={this.handleView.bind(this,1)}>
                        编辑
                    </button>
                    <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>
                        保存
                    </button>
                    <a className="btn btn-primary" href={entry_url} target="__blank">参赛者视角</a>
                </ButtonGroup>
            </div>
        );

    }
}

export default GameDetailForm;
