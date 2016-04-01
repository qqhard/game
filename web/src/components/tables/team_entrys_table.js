import React from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Table from 'antd/lib/table';
import PrivateMessageModal from '../message_modal/private_message_modal.js';
import EmailMessageModal from '../message_modal/email_message_modal.js';
import PhoneMessageModal from '../message_modal/phone_message_modal.js';
import TeamEntryDelModal from '../message_modal/team_entry_del_modal.js';
import {Link} from 'react-router';

class TeamEntrysTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            entrys: [],
            url: '',
            users: [],
            emails: [],
            phones: [],
            teams: []
        }
    }

    componentWillMount() {
        $.get('/userApi/username', function (data) {
            this.setState({username: data});
        }.bind(this)).error(function (e) {
            if (e.status == 403) top.location = '/userApi/login';
        });
    }

    componentDidMount() {
        $.get('/gameApi/gameentrys/' + this.props.gamename + '/team', function (data) {
            console.log(data);
            var arr = [];
            for (var i in data) {
                const team_href = 'teamshow-' + data[i].teamid + '.html';
                var teamName = data[i].teamCnname;
                if (!!data[i].teamEnname) teamName += `(${data[i].teamEnname})`;
                var teamName = <Link to={team_href}>{teamName}</Link>;
                const users = data[i].users.map(function (val, index) {
                    const userinfo = 'userinfoshow-' + val + '.html';
                    return {
                        key: data[i].teamid + val,
                        teamName: <Link to={userinfo}>{val}</Link>,
                        isSon: true
                    }
                });
                console.log(users);
                arr.push({
                    key: data[i].teamid,
                    teamName: teamName,
                    teamNum: data[i].teamNum,
                    emails: data[i].emails,
                    phones: data[i].phones,
                    users: data[i].users,
                    isSon: false,
                    children: users
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
        var teams = [];
        var phones = [];
        for (var i in selectedRecords) {
            users = users.concat(selectedRecords[i].users);
            emails = emails.concat(selectedRecords[i].emails);
            phones = phones.concat(selectedRecords[i].phones);
            teams.push(selectedRecords[i].key);
        }
        this.setState({users: users, emails: emails, teams: teams, phones: phones});
    }

    showModal(url, record) {
        this.setState({
            visible: true,
            url: url,
            users: record.users,
            emails: record.emails,
            teams: [record.key]
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
            users: record.users,
            emails: record.emails,
            teams: [record.key]
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
            users: record.users,
            emails: record.emails,
            teams: [record.key]
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
            phones: record.phones,
            teams: [record.key]
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
            if (filter[this.state.entrys[i].key] === true)continue;
            entrys.push(this.state.entrys[i]);
        }
        this.setState({entrys: entrys, users: [], emails: [], teams: [], phones: []});
    }

    selectAll() {
        if (this.state.selectedRowKeys.length < this.state.entrys.length) {
            var keys = [];
            var users = [];
            var emails = [];
            var teams = [];
            var phones = [];
            for (var i in this.state.entrys) {
                keys.push(this.state.entrys[i].key);
                users = users.concat(this.state.entrys[i].users);
                emails = emails.concat(this.state.entrys[i].emails);
                teams.push(this.state.entrys[i].key);
                phones.push(this.state.entrys[i].phone);
            }
            this.setState({
                selectedRowKeys: keys,
                users: users,
                emails: emails,
                teams: teams,
                phones: phones
            });
        } else {
            this.setState({
                selectedRowKeys: [],
                users: [],
                emails: [],
                teams: [],
                phones: []
            });
        }

    }

    render() {
        console.log(this.state.text);
        var _this = this;
        const columns = [{
            title: '队名',
            dataIndex: 'teamName'
        }, {
            title: '人数',
            dataIndex: 'teamNum'
        }, {
            title: '操作',
            key: 'operation',
            render(text, record){
                if (record.isSon)return <span></span>;
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

        return (
            <div>
                <EmailMessageModal
                    username={this.state.username}
                    gamename={this.props.gamename}
                    visible={this.state.visible}
                    url={this.state.url}
                    users={this.state.users}
                    emails={this.state.emails}
                    onCancel={_this.callCancel.bind(_this)}
                />
                <PrivateMessageModal
                    username={this.state.username}
                    gamename={this.props.gamename}
                    visible={this.state.visible2}
                    users={this.state.users}
                    url='/message/messages'
                    onCancel={_this.callCancel2.bind(_this)}
                />
                <PhoneMessageModal
                    username={this.state.username}
                    gamename={this.props.gamename}
                    visible={this.state.visible4}
                    url={this.state.url}
                    users={this.state.users}
                    phones={this.state.phones}
                    onCancel={_this.callCancel4.bind(_this)}
                />
                <TeamEntryDelModal
                    users={this.state.users}
                    teams={this.state.teams}
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
                        <Button onClick={this.showDelModalBatch.bind(this)} disabled={!hasSelected} bsStyle="danger">批量清退</Button>
                    </ButtonGroup>
                    <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个参赛者` : ''}</span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.entrys}/>
            </div>
        );
    }
}

export default TeamEntrysTable;