import React from 'react';
import GameList from './components/game_list/game_list.js';
import {browserHistory} from 'react-router';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import {Row, Col} from 'antd';
import PageHeader from 'react-bootstrap/lib/PageHeader';

class MyGames extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const titles = ['提交的赛事', '审核的赛事', '已经开始', '已经结束', '审核失败的'];
        const states = ['submited', 'accepted', 'started', 'ended', 'failed'];
        const prefixs = ['/gamesubmited-', '/gamemanage-', '/gamemanage-', '/gamemanage-', '/gamefailed-'];
        const tabs = states.map(function (val, index) {
            const url = "/gameApi/games/" + this.props.params.username + "?state=" + val;
            return <Tab key={index} eventKey={index} title={titles[index]}><GameList prefix={prefixs[index]} url={url}/></Tab>;
        }.bind(this));

        return (

            <div>
                <Row>
                    <Col>
                        <PageHeader>我管理的赛事
                            <small></small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Tabs defaultActiveKey={0} position="left" bsStyle="pills" tabWidth={2}>
                        {tabs}
                    </Tabs>
                </Row>

            </div>

        );
    }
}

export default MyGames;
