import React from 'react';
import {Row, Col} from 'antd';
import TeamInfo from '../components/info/team_info.js';
import TeamList from '../components/list/member_list.js';
import MemberApplyTable from '../components/tables/member_apply_table.js';
import MemberInviteTable from '../components/tables/member_invite_table.js';

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
        var url = '/game/team/' + this.props.params.teamid;
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
                    <Col span="11">
                        <Row>
                            <TeamInfo data={this.state.team}/>
                        </Row>
                        <Row>
                            <TeamList members={this.state.members}/>
                        </Row>
                    </Col>
                    <Col span="12" offset="1">
                        <Row>
                            <MemberApplyTable data={this.state.applys}/>
                            <MemberInviteTable data={this.state.invites}/>
                        </Row>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default TeamManage;