import React from 'react';
import {Row, Col} from 'antd';
import TeamInfo from '../components/info/team_info.js';
import TeamList from '../components/list/member_list.js';
import MemberApplyTable from '../components/tables/member_apply_table.js';
import MemberInviteTable from '../components/tables/member_invite_table.js';
import CsrfToken from '../components/common/csrf_token.js';
import MemberInviteModal from '../components/modal/member_invite_modal.js'

const addKey = function (data) {
    for (var i in data) {
        data[i].key = data[i].username;
    }
    return data;
}


class TeamManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: null,
            members: [],
            applys: [],
            invites: []
        };
    }

    fetchTeam() {
        var url = '/gameApi/game/team/' + this.props.params.teamid;
        $.get(url, function (data) {
            console.log(data);
            this.setState({team: data});
        }.bind(this));
    }

    fetchMembers() {
        var url = '/game/members/' + this.props.params.teamid;
        $.get(url, function (data) {
            this.setState({members: addKey(data)});
        }.bind(this));
    }

    fetchApplys() {
        var url = '/game/members/apply/' + this.props.params.teamid;
        $.get(url, function (data) {
            this.setState({applys: addKey(data)});
        }.bind(this));
    }

    fetchInvites() {
        var url = '/game/members/invite/' + this.props.params.teamid;
        $.get(url, function (data) {
            this.setState({invites: addKey(data)});
        }.bind(this));
    }

    callApprove(member) {
        var members = this.state.members;
        members.push(member);
        var applys = this.state.applys;
        for (var i in applys) {
            if (applys[i].username == member.username) {
                applys.splice(i, 1);
                break;
            }
        }
        this.setState({members: members, applys: applys});
    }

    callRefuse(member) {
        var applys = this.state.applys;
        for (var i in applys) {
            if (applys[i].username == member.username) {
                applys.splice(i, 1);
                break;
            }
        }
        this.setState({ applys: applys});
    }

    callRevoke(member) {
        var invites = this.state.applys;
        for (var i in invites) {
            if (invites[i].username == member.username) {
                invites.splice(i, 1);
                break;
            }
        }
        this.setState({ invites: invites});
    }

    componentDidMount() {
        this.fetchTeam();
        this.fetchMembers();
        this.fetchApplys();
        this.fetchInvites();
    }

    render() {
        return (
            <div>
                <Row>
                    <CsrfToken />
                    <Col span="11">
                        <Row>
                            <TeamInfo data={this.state.team}/>
                        </Row>
                        <Row>
                            <TeamList members={this.state.members}/>
                        </Row>
                    </Col>
                    <Col span="11" offset="2">
                        <Row>
                            <MemberApplyTable
                                data={this.state.applys}
                                onApprove={this.callApprove.bind(this)}
                                onRefuse={this.callRefuse.bind(this)}
                                csrf={$('input[name=_csrf]').val()}
                            />
                            <MemberInviteTable
                                data={this.state.invites}
                                onRevoke={this.callRevoke.bind(this)}
                                csrf={$('input[name=_csrf]').val()}
                            />
                            <MemberInviteModal />
                        </Row>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default TeamManage;