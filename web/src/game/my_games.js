import React from 'react';
import GameList from './../components/game_list/game_list.js';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import {Link} from 'react-router';
import Sider from '../components/sider/sider.js';

const items = ['待审核的', '未开始的', '报名中的', '报名截止的', '已经结束的', '审核失败的'];

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
        const states = ['submited', 'unstarted', 'entryed', 'dued', 'ended', 'failed'];
        const prefixs = ['/gamesubmited-', '/gamemanage-', '/gamemanage-', '/gamemanage-','/gamemanage-', '/gamefailed-'];

        const right = states.map(function (val, index) {
            const url = "/gameApi/games/owned/" + val;
            return <GameList key={index} prefix={prefixs[index]} url={url}/>;
        }.bind(this));

        return (
            <div>
                <Row>
                    <Col key={0} span="3">
                        <Sider callBack={this.callBack.bind(this)} items={items}/>
                        <div style={{textAlign:'center'}}>
                            <Link className="btn btn-default" to="/game.html">创建赛事</Link>
                        </div>
                    </Col>
                    <Col key={1} span="20" offset="1">{right[this.state.current - 1]}</Col>
                </Row>
            </div>

        );
    }
}

export default MyGames;
