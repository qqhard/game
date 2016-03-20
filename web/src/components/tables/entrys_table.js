import React from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Table from 'antd/lib/table';
import CsrfToken from '../common/csrf_token.js';
import PrivateMessageModal from '../message_modal/private_message_modal.js';
import ExtendMessageModal from '../message_modal/extend_message_modal.js';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';

const confirm = Modal.confirm;

function showConfirm(record) {
    confirm({
        title: '您是否确认要清退' + record.key + ",请给出理由",
        content: (
            <div>
                <textarea className="form-control"></textarea>
            </div>
        ),
        onOk() {
            console.log('确定');
        },
        onCancel() {
        }
    });
}

class EntrysTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            entrys: [],
            url: '',
            recvs: []
        }
    }

    componentWillMount() {
        $.get('/username', function (data) {
            this.setState({username: data});
        }.bind(this)).error(function (e) {
            if (e.status == 403) top.location = '/login';
        });
    }

    componentDidMount() {
        $.get('/game/gameentrys/' + this.props.gamename, function (data) {
            var arr = [];
            for (var i in data) {
                arr.push({
                    key: data[i].username,
                    username: data[i].username,
                    phone: data[i].phone,
                    email: data[i].email
                });
            }
            this.setState({entrys: arr});
        }.bind(this));
    }

    onSelectChange(selectedRowKeys, selectedRecords) {
        console.log('selectedRowKeys changed: ', selectedRecords);
        this.setState({selectedRowKeys});
        this.setState({recvs: selectedRecords});
    }

    handleClick() {
        alert(this.state.selectedRowKeys);
    }

    showModal(url, record) {
        this.setState({
            visible: true,
            url: url,
            recvs: [record]
        });
    }

    showModalBatch(url) {
        this.setState({
            visible: true,
            url: url
        });
    }

    showPrivateModal(record) {
        this.setState({
            visible2: true,
            recvs: [record]
        });
    }

    showPrivateModalBatch(record) {
        this.setState({
            visible2: true
        });
    }


    callCancel() {
        this.setState({
            visible: false
        });
    }

    callCancel2() {
        this.setState({
            visible2: false
        });
    }

    selectAll() {
        if(this.state.selectedRowKeys.length < this.state.entrys.length){
            var keys = [];
            for(var i in this.state.entrys){
                keys.push(this.state.entrys[i].key);
            }
            this.setState({
                selectedRowKeys: keys
            });
        }else{
            this.setState({
                selectedRowKeys: []
            });
        }

    }

    render() {
        console.log(this.state.text);
        var _this = this;
        const columns = [{
            title: '用户名',
            dataIndex: 'username',
        }, {
            title: '手机',
            dataIndex: 'phone',
        }, {
            title: '邮箱',
            dataIndex: 'email',
        }, {
            title: '操作',
            key: 'operation',
            render(text, record){

                return (
                    <span>
                        <a onClick={_this.showPrivateModal.bind(_this,record)}>私信</a>
                        <span className="ant-divider"></span>
                        <a onClick={_this.showModal.bind(_this)}>短信</a>
                        <span className="ant-divider"></span>
                        <a onClick={_this.showModal.bind(_this,'/message/email' , record)}>邮件</a>
                        <span className="ant-divider"></span>
                        <a className="btn btn-danger btn-sm" onClick={showConfirm.bind(this,record)}>清退</a>
                    </span>
                );
            }
        }];

        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <ExtendMessageModal
                    username={this.state.username}
                    gamename={this.props.gamename}
                    visible={this.state.visible}
                    url={this.state.url}
                    users={this.state.recvs}
                    onCancel={_this.callCancel.bind(_this)}
                />
                <PrivateMessageModal
                    username={this.state.username}
                    gamename={this.props.gamename}
                    visible={this.state.visible2}
                    users={this.state.recvs}
                    url='/message/messages'
                    onCancel={_this.callCancel2.bind(_this)}
                />

                <div style={{ marginBottom: 16 }}>
                    <ButtonGroup>
                        <Button onClick={this.selectAll.bind(this)} >跨页全选</Button>
                        <Button onClick={this.showPrivateModalBatch.bind(this)} disabled={!hasSelected} >群发私信</Button>
                        <Button onClick={this.showModalBatch.bind(this,'/message/email')} disabled={!hasSelected} >群发邮件</Button>
                        <Button onClick={this.showModal.bind(this)} disabled={!hasSelected} >群发短信</Button>
                        <Button onClick={this.handleClick.bind(this)} disabled={!hasSelected} bsStyle="danger" >批量清退</Button>
                    </ButtonGroup>
                    <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个参赛者` : ''}</span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.entrys}/>
            </div>
        );
    }
}

export default EntrysTable;