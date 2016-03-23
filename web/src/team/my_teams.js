import React from 'react';
import TeamList,{MyUnEntryedTeamList,MyEntryedTeamList} from '../components/list/team_list.js';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import {Row, Col} from 'antd';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Sider from '../components/sider/sider.js';

const items = ['招募中的队伍', '已参赛的队伍', '我加入的队伍'];

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
        const titles = ['招募中的队伍', '已参赛的队伍', '我加入的队伍'];
        const username = this.props.params.username;
        const urls = [
            '/gameApi/game/teams/' + username + '?entryed=false',
            '/gameApi/game/teams/' + username + '?entryed=true',
            '/gameApi/game/teams/'
        ];
        const prefixs = ['/gamesubmited-', '/gamemanage-', '/gamemanage-'];


        const right = ['',
            <MyUnEntryedTeamList prefix={''} url={urls[0]}/>,
            <MyEntryedTeamList prefix={''} url={urls[1]}/>
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
