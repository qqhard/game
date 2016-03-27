import React from 'react';
import TeamList,{MyUnEntryedTeamList,MyEntryedTeamList,MyMemberTeamList,MyInviteTeamList} from '../components/list/team_list.js';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Sider from '../components/sider/sider.js';

const items = ['招募中的队伍', '已参赛的队伍', '我加入的队伍','我收到的邀请'];

class MyTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1
        };
    }

    callBack(current) {
        this.setState({current: current});
    }

    render() {
        const username = this.props.params.username;
        const right = ['',
            <MyUnEntryedTeamList url={'/gameApi/teams/' + username + '?entryed=false'}/>,
            <MyEntryedTeamList url={'/gameApi/teams/' + username + '?entryed=true'}/>,
            <MyMemberTeamList url={'/gameApi/teams/membered'} />,
            <MyInviteTeamList url={'/gameApi/teams/invited'} />
        ];
        return (


            <div>

                <Row>
                    <Col key={0} span="3"><Sider callBack={this.callBack.bind(this)} items={items}/></Col>
                    <Col key={1} span="20" offset="1">{right[this.state.current]}</Col>
                </Row>
            </div>

        );
    }
}

export default MyTeams;
