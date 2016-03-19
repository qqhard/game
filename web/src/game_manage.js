import React from 'react';
import GameList from './components/game_list/game_list.js';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Table from 'antd/lib/table';

const info = function () {
    message.info('这是一条普通的提醒');
};

const confirm = Modal.confirm;

function showConfirm(key) {
    confirm({
        title: '您是否确认要清退'+key+",请给出理由",
        content: (
            <div>
                <textarea className="form-control"></textarea>
            </div>
        ),
        onOk() {
            console.log('确定');
        },
        onCancel() {}
    });
}

class MessageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    handleInput(e){
        this.setState({text:e.target.value});
    }

    handleOk() {
        alert(this.props.url);
        alert(this.props.users);
    }

    handleConcel() {
        this.setState({text:''});
        this.props.onCancel();
    }

    render() {
        const textarea = (
            <textarea className="form-control" value={this.state.text} onChange={this.handleInput.bind(this)}></textarea>
        );
        return (
            <Modal title="填写待发送信息"
                   visible={this.props.visible}
                   onOk={this.handleOk.bind(this)}
                   onCancel={this.handleConcel.bind(this)}>
                <p>{textarea}</p>
            </Modal>
        );
    }
};

class EntryTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            entrys: [],
            url:''
        }
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

    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    handleClick() {
        alert(this.state.selectedRowKeys);
    }

    showModal(url) {
        this.setState({
            visible: true,
            url: url
        });
    }

    callCancel() {
        this.setState({
            visible: false
        });
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
                console.log(record);
                return (
                    <span>
                        <a onClick={_this.showModal.bind(_this)}  >私信</a>
                        <span className="ant-divider"></span>
                        <a onClick={_this.showModal.bind(_this)}  >短信</a>
                        <span className="ant-divider"></span>
                        <a onClick={_this.showModal.bind(_this)}  >邮件</a>
                        <span className="ant-divider"></span>
                        <a className="btn btn-danger btn-sm" onClick={showConfirm.bind(this,record.key)}>清退</a>
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
                <MessageModal visible={this.state.visible} url={this.state.url} users={this.state.selectedRowKeys} onCancel={_this.callCancel.bind(_this)}/>
                <div style={{ marginBottom: 16 }}>
                    <ButtonGroup>
                        <Button onClick={this.showModal.bind(this,"test")}
                                loading={loading}>跨页全选</Button>
                        <Button onClick={this.showModal.bind(this)} disabled={!hasSelected}
                                loading={loading}>群发私信</Button>
                        <Button onClick={this.showModal.bind(this)} disabled={!hasSelected}
                                loading={loading}>群发邮件</Button>
                        <Button onClick={this.showModal.bind(this)} disabled={!hasSelected}
                                loading={loading}>群发短信</Button>
                        <Button onClick={this.handleClick.bind(this)} disabled={!hasSelected} bsStyle="danger"
                                loading={loading}>批量清退</Button>
                    </ButtonGroup>
                    <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个参赛者` : ''}</span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.entrys}/>
            </div>
        );
    }
}

class GameManage extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={info}>显示普通提醒</Button>
                <EntryTable gamename={this.props.params.gamename}/>
            </div>
        );

    }
}


export default GameManage;
