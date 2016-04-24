import React from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Table from 'antd/lib/table';
import PrivateMessageModal from '../message_modal/private_message_modal.js';
import PhoneMessageModal from '../message_modal/phone_message_modal.js';
import EmailMessageModal from '../message_modal/email_message_modal.js';
import EntryDelModal from '../message_modal/entry_del_modal.js';
import FileDownloadForm from '../forms/file_download_form.js';

class EntrysTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            entrys: [],
            url: '',
            users: [],
            emails: [],
            phones: []
        }
    }

    componentWillMount() {
        console.log('test');
        $.get('/userApi/username', function (data) {
            this.setState({username: data});
        }.bind(this)).error(function (e) {
            if (e.status == 403) top.location = '/userApi/auth';
        });
    }

    componentDidMount() {
        $.get('/gameApi/gameentrys/' + this.props.gamename + '/individual', function (data) {
            var arr = [];
            console.log(data);
            for (var i in data) {
                arr.push({
                    key: data[i].entry.username,
                    username: data[i].entry.username,
                    phone: data[i].user.phone,
                    email: data[i].user.email,
                    sociolname: data[i].user.sociolname,
                    studentid: data[i].user.studentid
                });
            }
            this.setState({entrys: arr});
        }.bind(this));
    }

    onSelectChange(selectedRowKeys, selectedRecords) {
        console.log('selectedRowKeys changed: ', selectedRecords);
        this.setState({selectedRowKeys});
        var users = [];
        var emails = [];
        var phones = [];
        for (var i in selectedRecords) {
            users.push(selectedRecords[i].username);
            emails.push(selectedRecords[i].email);
            phones.push(selectedRecords[i].phone);
        }
        this.setState({users: users, emails: emails, phones: phones});
    }

    showModal(url, record) {
        this.setState({
            visible: true,
            url: url,
            users: [record.username],
            emails: [record.email],
            phones: [record.phone]
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
            users: [record.username],
            emails: [record.email],
            phones: [record.phone]
        });
    }

    showPrivateModalBatch(record) {
        this.setState({
            visible2: true
        });
    }

    showDelModal(record) {
        this.setState({
            visible3: true,
            users: [record.username],
            emails: [record.email],
            phones: [record.phone]
        });
    }

    showDelModalBatch(record) {
        this.setState({
            visible3: true
        });
    }

    showPhoneModal(record) {
        this.setState({
            visible4: true,
            users: [record.username],
            emails: [record.email],
            phones: [record.phone]
        });
    }

    showPhoneModalBatch(record) {
        this.setState({
            visible4: true
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

    callCancel3() {
        this.setState({
            visible3: false
        });
    }

    callCancel4() {
        this.setState({
            visible4: false
        });
    }

    callDelEntry(filter) {
        var entrys = [];
        for (var i in this.state.entrys) {
            if (filter[this.state.entrys[i].username] === true)continue;
            entrys.push(this.state.entrys[i]);
        }
        this.setState({entrys: entrys, recvs: []});
    }

    selectAll() {
        if (this.state.selectedRowKeys.length < this.state.entrys.length) {
            var keys = [];
            var users = [];
            var emails = [];
            var phones = [];
            for(var i in this.state.entrys){
                keys.push(this.state.entrys[i].key);
                users.push(this.state.entrys[i].username);
                emails.push(this.state.entrys[i].email);
                phones.push(this.state.entrys[i].phone);
            }
            this.setState({
                selectedRowKeys: keys,
                users: users,
                emails: emails,
                phones: phones
            });
        } else {
            this.setState({
                selectedRowKeys: [],
                users: [],
                emails: [],
                phones: []
            });
        }

    }

    render() {
        console.log(this.state.text);
        var _this = this;
        const columns = [{
            title: '用户名',
            dataIndex: 'username'
        }, {
            title: '手机',
            dataIndex: 'phone'
        }, {
            title: '邮箱',
            dataIndex: 'email'
        },{
            title: '姓名',
            dataIndex: 'sociolname'
        },{
            title: '学号',
            dataIndex: 'studentid'
        }, {
            title: '操作',
            key: 'operation',
            render(text, record){

                return (
                    <span>
                        <a onClick={_this.showPrivateModal.bind(_this,record)}>私信</a>
                        <span className="ant-divider"/>
                        <a onClick={_this.showPhoneModal.bind(_this,record)}>短信</a>
                        <span className="ant-divider"/>
                        <a onClick={_this.showModal.bind(_this,'/message/email' , record)}>邮件</a>
                        <span className="ant-divider"/>
                        <a className="btn btn-danger btn-sm" onClick={_this.showDelModal.bind(_this,record)}>清退</a>
                    </span>
                );
            }
        }];

        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this)
        };
        const hasSelected = selectedRowKeys.length > 0;
        console.log('test');
        return (
            <div>
                <EmailMessageModal
                    username={this.state.username}
                    gamename={this.props.gamename}
                    visible={this.state.visible}
                    url={this.state.url}
                    users={this.state.users}
                    onCancel={_this.callCancel.bind(_this)}
                />
                <PrivateMessageModal
                    username={this.state.username}
                    gamename={this.props.gamename}
                    visible={this.state.visible2}
                    users={this.state.users}
                    onCancel={_this.callCancel2.bind(_this)}
                />
                <PhoneMessageModal
                    username={this.state.username}
                    gamename={this.props.gamename}
                    visible={this.state.visible4}
                    url={this.state.url}
                    users={this.state.users}
                    onCancel={_this.callCancel4.bind(_this)}
                />
                <EntryDelModal
                    users={this.state.users}
                    username={this.state.username}
                    gamename={this.props.gamename}
                    visible={this.state.visible3}
                    onCancel={_this.callCancel3.bind(_this)}
                    onClear={_this.callDelEntry.bind(_this)}
                />

                <div style={{ marginBottom: 16 }}>
                    <ButtonGroup>
                        <Button onClick={this.selectAll.bind(this)}>跨页全选</Button>
                        <Button onClick={this.showPrivateModalBatch.bind(this)} disabled={!hasSelected}>群发私信</Button>
                        <Button onClick={this.showModalBatch.bind(this,'/message/email')}
                                disabled={!hasSelected}>群发邮件</Button>
                        <Button onClick={this.showPhoneModalBatch.bind(this)} disabled={!hasSelected}>群发短信</Button>
                        <FileDownloadForm type="excel" gamename={this.props.gamename}/>
                        <Button onClick={this.showDelModalBatch.bind(this)} disabled={!hasSelected} bsStyle="danger">批量清退</Button>
                    </ButtonGroup>
                    <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个参赛者` : ''}</span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.entrys}/>
            </div>
        );
    }
}

export default EntrysTable;