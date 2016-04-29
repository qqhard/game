import React from 'react';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import CsrfToken from '../common/csrf_token.js';

class EntryDelModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            textHelp: '',
            username: ''
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

    delEntrys(userStr, csrf ,filter) {
        var body = {
            users: userStr,
            gamename: this.props.gamename,
            _csrf: csrf
        }
        $.ajax({
            url: '/gameApi/entrys/individual',
            type: 'PUT',
            data: body,
            success: function (data) {
                if (data == 'ok') {
                    this.setState({text: '', textHelp: ''});
                    message.success("清退成功！");
                    this.props.onCancel();
                    this.props.onClear(filter);
                } else {
                    message.error("清退失败！");
                }
            }.bind(this),
            error: function (error) {
                message.error("清退失败！");
            }
        });
    }

    msgEntrys(userStr, csrf) {
        var body = 'users=' + userStr
            + '&text=' + this.state.text
            + '&sender=' + this.props.username
            + '&gamename=' + this.props.gamename
            + '&_csrf=' + csrf;
        $.post('/message/messages/users', body, function (data) {
            console.log(data);
        }.bind(this));
    }

    handleOk() {
        console.log(this.props.users);
        var ok = this.handleText(null);
        if (ok === false)return;

        var userStr = this.props.users.join(",");
        var csrf = $("input[name=_csrf]").val();

        var filter = [];
        for(var i in this.props.users){
            filter[this.props.users[i]] = true;
        }

        this.msgEntrys(userStr, csrf);
        this.delEntrys(userStr, csrf, filter);

    }

    handleConcel() {
        this.setState({text: '', textHelp: ''});
        this.props.onCancel();
    }

    render() {
        console.log(this.props.users);
        const textarea = (
            <div className="form-group">
                <label >请给出理由！</label>
                <textarea className="form-control" value={this.state.text}
                          onChange={this.handleText.bind(this)}></textarea>
                <p>{this.state.textHelp}</p>
                <CsrfToken />
            </div>
        );
        return (
            <Modal title="是否确认清退参赛者？"
                   visible={this.props.visible}
                   onOk={this.handleOk.bind(this)}
                   onCancel={this.handleConcel.bind(this)}>
                <form>{textarea}</form>
            </Modal>
        );
    }
}

export default EntryDelModal;