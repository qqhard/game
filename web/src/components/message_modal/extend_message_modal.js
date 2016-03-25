import React from 'react';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import CsrfToken from '../common/csrf_token.js';


class ExtendMessageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            titleHelp: '',
            body: '',
            bodyHelp: ''
        }
    }


    handleTitle(e) {
        var val = this.state.title;
        if (e != null)val = e.target.value;
        if (val.length > 0) {
            this.setState({title: val, titleHelp: ''});
            return true;
        } else {
            this.setState({title: val, titleHelp: '标题不能为空'});
        }

    }

    handleBody(e) {
        var val = this.state.body;
        if (e != null)val = e.target.value;
        if (val.length > 0) {
            this.setState({body: val, bodyHelp: ''});
            return true;
        } else {
            this.setState({body: val, bodyHelp: '标题不能为空'});
        }

    }

    handleOk() {
        alert(this.props.username);
        var ok = this.handleTitle(null) & this.handleBody(null);
        if (ok === false)return;
        var addrs = [];
        var users = [];

        for (var i in this.props.users) {
            users.push(this.props.users[i].username);
            addrs.push(this.props.users[i].email);
        }
        var body = 'users=' + users.join(',')
            + '&addrs=' + addrs.join(',')
            + '&title=' + this.state.title
            + '&body=' + this.state.body
            + '&sender=' + this.props.username
            + '&gamename=' + this.props.gamename
            + '&_csrf=' + $("input[name=_csrf]").val();

        $.post(this.props.url, body, function (data) {
            if (data == 'ok') {
                this.setState({title: '', titleHelp: '', body: '', bodyHelp: ''});
                message.success("信息成功发送！");
                this.props.onCancel();
            } else {
                message.error("信息成功失败！");
            }
        }.bind(this)).error(function (e) {
            message.error("信息成功失败！");
        });
    }

    handleConcel() {
        this.setState({title: '', titleHelp: '', body: '', bodyHelp: ''});
        this.props.onCancel();
    }

    render() {
        const input = (
            <div className="form-group">
                <label >标题</label>
                <input className="form-control" value={this.state.title} onChange={this.handleTitle.bind(this)}/>
                <p>{this.state.titleHelp}</p>

            </div>

        );
        const textarea = (
            <div className="form-group">
                <label >正文</label>
                <textarea className="form-control" value={this.state.body}
                          onChange={this.handleBody.bind(this)}></textarea>
                <p>{this.state.bodyHelp}</p>
            </div>
        );
        return (
            <Modal title="填写待发送信息"
                   visible={this.props.visible}
                   onOk={this.handleOk.bind(this)}
                   onCancel={this.handleConcel.bind(this)}>
                <form>{input}{textarea} <CsrfToken /></form>
            </Modal>
        );
    }
}

export default ExtendMessageModal;