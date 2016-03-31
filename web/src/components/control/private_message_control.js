import React from 'react';
import './control.scss';
import CsrfToken from '../common/csrf_token.js';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';

class PrivateMessageControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            textHelp: '',
            username: '',
            visible: false
        }
    }

    handleText(e) {
        var val = this.state.text;
        if (e != null)val = e.target.value;
        if (val.length > 0) {
            this.setState({text: val, textHelp: ''});
            return true;
        } else {
            this.setState({text: val, textHelp: '消息不能为空'});
            return false;
        }
    }

    handleClick() {
        this.setState({visible: true});
    }

    handleOk() {
        var ok = this.handleText(null);
        if (ok === false)return;

        var body = 'recver=' + this.props.recver
            + '&text=' + this.state.text
            + '&_csrf=' + $("input[name=_csrf]").val();
        alert(body);
        $.post('/message/message', body, function (data) {
            if (data == 'ok') {
                this.setState({text: '', textHelp: '', visible: false});
                message.success("信息成功发送！");
            } else {
                message.error("信息成功失败！");
            }
        }.bind(this)).error(function (e) {
            message.error("信息成功失败！");
        });

    }

    handleConcel() {
        this.setState({text: '', textHelp: '', visible: false});
    }

    render() {
        const textarea = (
            <div className="form-group">
                <label >消息</label>
                <textarea className="form-control" value={this.state.text}
                          onChange={this.handleText.bind(this)}></textarea>
                <p>{this.state.textHelp}</p>
                <CsrfToken />
            </div>
        );
        return (
            <div className="message" onClick={this.handleClick.bind(this)}>
                <Modal title="填写待发送信息"
                       visible={this.state.visible}
                       onOk={this.handleOk.bind(this)}
                       onCancel={this.handleConcel.bind(this)}>
                    <form>{textarea}</form>
                </Modal>
                <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                <div>私信</div>
            </div>
        );
    }
}

export default PrivateMessageControl;