import React from 'react';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import CsrfToken from '../common/csrf_token.js';

class PrivateMessageModal extends React.Component {
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
        if(val.length > 0){
            this.setState({text: val,textHelp: ''});
            return true;
        }else{
            this.setState({text: val,textHelp: '消息不能为空'});
            return false;
        }
    }

    handleOk() {
        var ok = this.handleText(null);
        if(ok === false)return ;
        
        var body = 'users=' + this.props.users.join(',')
            + '&text=' + this.state.text
            + '&sender=' + this.props.username
            + '&gamename=' + this.props.gamename
            + '&_csrf=' + $("input[name=_csrf]").val();

        $.post('/message/messages', body, function (data) {
            if (data == 'ok') {
                this.setState({text: '', textHelp: ''});
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
        this.setState({text: '',textHelp:''});
        this.props.onCancel();
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
            <Modal title="填写待发送信息"
                   visible={this.props.visible}
                   onOk={this.handleOk.bind(this)}
                   onCancel={this.handleConcel.bind(this)}>
                <form>{textarea}</form>
            </Modal>
        );
    }
}

export default PrivateMessageModal;