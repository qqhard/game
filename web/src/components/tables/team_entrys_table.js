import React from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Table from 'antd/lib/table';
import PrivateMessageModal from '../modal/private_message_modal.js';
import EmailMessageModal from '../modal/email_message_modal.js';
import PhoneMessageModal from '../modal/phone_message_modal.js';
import TeamEntryDelModal from '../modal/team_entry_del_modal.js';
import {Link} from 'react-router';

class TeamEntrysTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            entrys: [],
            url: '',
            teams: []
        }
    }

    componentWillMount() {
        $.get('/userApi/username', function (data) {
            this.setState({username: data});
        }.bind(this)).error(function (e) {
            if (e.status == 403) top.location = '/userApi/auth';
        });
    }

    componentDidMount() {
        const entrys_url = `/gameApi/gameentrys/${this.props.gamename}/team`;
        $.get(entrys_url, function (data) {
            var arr = [];
            for (var i in data) {
                const team_href = `teamshow-${data[i].id}.html`;
                const owner_href = `userinfoshow-${data[i].owner}.html`;
                const cnname = <Link to={team_href}>{data[i].cnname}</Link>;
                const enname = <Link to={team_href}>{data[i].enname}</Link>;
                const owner = <Link to={team_href}>{`${data[i].identity}:${data[i].owner}`}</Link>;
                arr.push({
                    key: data[i].id,
                    cnname: cnname,
                    enname: enname,
                    owner: owner,
                    nowNum: data[i].nowNum
                });
            }
            this.setState({entrys: arr});
        }.bind(this));
    }

    onSelectChange(selectedRowKeys, selectedRecords) {
        console.log('selectedRowKeys changed: ', selectedRecords);
        this.setState({selectedRowKeys});

        var teams = [];
        var phones = [];
        for (var i in selectedRecords) {
            teams.push(selectedRecords[i].key);
        }
        this.setState({teams: teams});
    }

    showModal(url, record) {
        this.setState({
            visible: true,
            url: url,
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
        this.setState({entrys: entrys, teams: []});
    }

    selectAll() {
        if (this.state.selectedRowKeys.length < this.state.entrys.length) {
            var keys = [];
            var teams = [];
            for (var i in this.state.entrys) {
                keys.push(this.state.entrys[i].key);
                teams.push(this.state.entrys[i].key);
            }
            this.setState({
                selectedRowKeys: keys,
                teams: teams,
            });
        } else {
            this.setState({
                selectedRowKeys: [],
                teams: [],
            });
        }

    }

    render() {
        var _this = this;
        const columns = [{
            title: '中文队名',
            dataIndex: 'cnname'
        }, {
            title: '英文队名',
            dataIndex: 'enname'
        }, {
            title: '人数',
            dataIndex: 'nowNum'
        }, {
            title: '拥有者',
            dataIndex: 'owner'
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

        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
            getCheckboxProps(record) {
                return {
                    disabled: record.isSon
                };
            }
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <EmailMessageModal
                    username={this.state.username}
                    gamename={this.props.gamename}
                    visible={this.state.visible}
                    teams={this.state.teams}
                    onCancel={_this.callCancel.bind(_this)}
                />
                <PrivateMessageModal
                    username={this.state.username}
                    gamename={this.props.gamename}
                    teams={this.state.teams}
                    visible={this.state.visible2}
                    onCancel={_this.callCancel2.bind(_this)}
                />
                <PhoneMessageModal
                    username={this.state.username}
                    gamename={this.props.gamename}
                    teams={this.state.teams}
                    visible={this.state.visible4}
                    onCancel={_this.callCancel4.bind(_this)}
                />
                <TeamEntryDelModal
                    teams={this.state.teams}
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