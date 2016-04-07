import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import TeamInfo from '../components/info/team_info.js';
import TeamList from '../components/list/member_list.js';


const addKey = function (data) {
    for (var i in data) {
        data[i].key = data[i].username;
    }
    return data;
}


class TeamShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: null,
            members: []
        };
    }

    fetchTeam() {
        var url = '/gameApi/team/' + this.props.params.teamid;
        $.get(url, function (data) {
            console.log(data);
            this.setState({team: data});
        }.bind(this));
    }

    fetchMembers() {
        var url = '/gameApi/members/' + this.props.params.teamid;
        $.get(url, function (data) {
            this.setState({members: addKey(data)});
        }.bind(this));
    }

    componentDidMount() {
        this.fetchTeam();
        this.fetchMembers();
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col span="16">
                        <TeamInfo data={this.state.team} hasMessage={true}/>
                    </Col>
                    <Col span="6" offset="2">
                        <Row>
                            <TeamList members={this.state.members}/>
                        </Row>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default TeamShow;