import React from 'react';
import GameList from './../components/list/game_list.js';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import {Link} from 'react-router';
import Sider from '../components/sider/sider.js';

const items = ['待审核的', '进行中的', '已经结束的', '参与管理的', '审核失败的'];
const states = ['owned/submited', 'owned/keeped', 'owned/ended', 'managed', 'owned/failed'];
const right = states.map(function (val, index) {
    const url = "/gameApi/games/" + val;
    return <GameList key={index} isManage={true} url={url}/>;
}.bind(this));

class MyGames extends React.Component {
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


        const aButton = {
            href:'/game.html',
            text:'创建赛事'
        };
        return (
            <div className="container">
                <Row>
                    <Col key={0} span="3">
                        <Sider callBack={this.callBack.bind(this)} items={items} aButton={aButton}/>
                    </Col>
                    <Col key={1} span="20" offset="1">{right[this.state.current - 1]}</Col>
                </Row>
            </div>

        );
    }
}

export default MyGames;
