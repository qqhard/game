import React from 'react';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input'

class MemberInviteModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            username: '',
            user: null,
            help: ''
        }
    }
    showModal() {
        this.setState({
            visible: true
        });
    }
    handleOk() {
        alert(this.state.username);
    }
    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false
        });
    }

    handleChange(e){
        this.setState({username:e.target.value});
    }

    render() {
        var userDetail = <p>{this.state.help}</p>;
        if(!!this.state.user){
            userDetail = (
                <p>
                    {this.state.user.name}
                </p>
            );
        }
        return (
            <div>
                <Button type="primary" onClick={this.showModal.bind(this)}>邀请</Button>
                <Modal title="第一个 Modal" visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <label>输入用户名</label>
                    <input type="text" className="form-control"
                           value={this.state.username}
                           onChange={this.handleChange.bind(this)}
                    />
                    <p></p>
                </Modal>
            </div>
        );
    }
}

export default MemberInviteModal;