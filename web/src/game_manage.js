import React from 'react';
import GameList from './components/game_list/game_list.js';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Table from 'antd/lib/table';
import CsrfToken from './components/common/csrf_token.js';

const info = function () {
    message.info('这是一条普通的提醒');
};

const confirm = Modal.confirm;

function showConfirm(key) {
    confirm({
        title: '您是否确认要清退' + key + ",请给出理由",
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

class MessageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            username: ''
        }
    }

    componentWillMount() {
        $.get('/username', function (data) {
            this.setState({username: data});
        }.bind(this)).error(function (e) {
            if (e.status == 403) top.location = '/login';
        });
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    handleTitle(e) {
        this.setState({title: e.target.value});
    }

    handleBody(e) {
        this.setState({body: e.target.value});
    }

    handleOk() {
        var addrs = [];
        var users = [];
        alert(this.props.url);
        for (var i in this.props.users) {
            users.push(this.props.users[i].username);
            addrs.push(this.props.users[i].email);
        }
        var body = 'users=' + users.join(',')
            + '&addrs=' + addrs.join(',')
            + '&title=' + this.state.title
            + '&body=' + this.state.body
            + '&sender=' + this.state.username
            + '&gamename=' + this.props.gamename
            + '&_csrf=' + $("input[name=_csrf]").val();
        alert(body);
        $.post(this.props.url,body,function(data){
            alert(data);
        });
    }

    handleConcel() {
        this.setState({title: '', body: ''});
        this.props.onCancel();
    }

    render() {
        const input = (
            <input className="form-control" value={this.state.title} onChange={this.handleTitle.bind(this)}/>
        );
        const textarea = (
            <textarea className="form-control" value={this.state.body}
                      onChange={this.handleBody.bind(this)}></textarea>
        );
        return (
            <Modal title="填写待发送信息"
                   visible={this.props.visible}
                   onOk={this.handleOk.bind(this)}
                   onCancel={this.handleConcel.bind(this)}>
                <p>{input}{textarea}</p>
            </Modal>
        );
    }
}
;

class EntryTable extends React.Component {

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
        this.setState({recvs:selectedRecords});
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

                return (
                    <span>
                        <a onClick={_this.showModal.bind(_this)}>私信</a>
                        <span className="ant-divider"></span>
                        <a onClick={_this.showModal.bind(_this)}>短信</a>
                        <span className="ant-divider"></span>
                        <a onClick={_this.showModal.bind(_this,'/message/email' , record)}>邮件</a>
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
                <MessageModal
                    username={this.props.username}
                    gamename={this.props.gamename}
                    visible={this.state.visible}
                    url={this.state.url}
                    users={this.state.recvs}
                    onCancel={_this.callCancel.bind(_this)}
                />
                <CsrfToken />
                <div style={{ marginBottom: 16 }}>
                    <ButtonGroup>
                        <Button onClick={this.showModal.bind(this,"test")}
                                loading={loading}>跨页全选</Button>
                        <Button onClick={this.showModal.bind(this)} disabled={!hasSelected}
                                loading={loading}>群发私信</Button>
                        <Button onClick={this.showModalBatch.bind(this,'/message/email')} disabled={!hasSelected}
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
                <EntryTable gamename={this.props.params.gamename} username={this.props.username}/>
            </div>
        );

    }
}


export default GameManage;
