import React from 'react';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Button from 'react-bootstrap/lib/Button';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

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
        if(!this.state.username){
            this.setState({help:'不能为空！'});
            return ;
        }
        var url = `/game/member/invite/${this.props.team.id}/${this.state.username}`;
        var body = '_csrf='+this.props.csrf;
        $.post(url,body,function (data) {
            if(data == 'ok'){
                this.setState({user:data,help:'已成功发出邀请！'});
                this.props.onInvite({});
            }else{
                this.setState({help:data});
            }
        }.bind(this));
    }
    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false,
            username: '',
            help:''
        });
    }

    handleChange(e){
        this.setState({username:e.target.value});
    }

    render() {
        return (
            <div>
                <Button onClick={this.showModal.bind(this)}>邀请</Button>
                <Modal title="用户邀请" visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <input type="text" className="form-control"
                           value={this.state.username}
                           onChange={this.handleChange.bind(this)}
                    />
                    <p>{this.state.help}</p>
                </Modal>
            </div>
        );
    }
}

export default MemberInviteModal;