import React from 'react';
import GameList from './components/game_list/game_list.js';
import {browserHistory} from 'react-router';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PageHeader from 'react-bootstrap/lib/PageHeader';

class MyEntrys extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const titles = ['我报名的', '已经开始', '已经结束'];
        const states = ['accepted', 'started', 'ended'];
        const tabs = states.map(function (val, index) {
            const url = "/gameApi/game/userentrys/" + this.props.params.username + "?state=" + val;
            return <Tab key={index} eventKey={index} title={titles[index]}><GameList prefix="/game-" url={url}/></Tab>;
        }.bind(this));

        return (
            <div>
                <Row>
                    <Col>
                        <PageHeader>我参与的赛事
                            <small> </small>
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


export default MyEntrys;
