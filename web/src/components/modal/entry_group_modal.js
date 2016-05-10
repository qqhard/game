import React from 'react';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import CsrfToken from '../common/csrf_token.js';

export const showGroupModal = function () {
    this.setState({
        groupModalVisible: true
    });
}

export const cancelGroupModal = function () {
    this.setState({
        groupModalVisible: false
    });
}

export const addGroup = function (group) {
    let groups = this.state.groups;
    groups.push(group)
    this.setState({groups:groups});
}

class EntryGroupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameHelp: '',
            username: ''
        }
    }

    handleName(e) {
        var val = this.state.name;
        if (e != null)val = e.target.value;
        if(val.length > 0){
            this.setState({name: val,nameHelp: ''});
            return true;
        }else{
            this.setState({name: val,nameHelp: '分组名称不能为空'});
            return false;
        }
    }

    handleOk() {
        var ok = this.handleName(null);
        if(ok === false)return ;

        var body = 'entryids=' + this.props.entryids.join(',')
            + '&groupname=' + this.state.name
            + '&gamename=' + this.props.gamename
            + '&_csrf=' + $("input[name=_csrf]").val();
        console.log(body);
        $.post(`/gameApi/group/${this.props.type}`,body,(data)=>{
            message.success('增加分组成功！');
            this.props.addGroup(data);
            this.props.onCancel();
        }).error((e)=>{
            if(e.status == 403)
                message.error('权限不足！');
            else{
                message.error('增加分组失败！');
            }
        });
    }

    handleConcel() {
        this.setState({name: '',nameHelp:''});
        this.props.onCancel();
    }

    render() {
        const textarea = (
            <div className="form-group">
                <label >填写分组名称</label>
                <input className="form-control" value={this.state.name}
                          onChange={this.handleName.bind(this)} />
                <p>{this.state.nameHelp}</p>
                <CsrfToken />
            </div>
        );
        return (
            <Modal title="增加分组"
                   visible={this.props.visible}
                   onOk={this.handleOk.bind(this)}
                   onCancel={this.handleConcel.bind(this)}>
                <form>{textarea}</form>
            </Modal>
        );
    }
}

export default EntryGroupModal;
