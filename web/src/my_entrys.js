import React from 'react';
import GameList from './components/game_list/game_list.js';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Sider from './components/sider/sider.js';

const items = ['我报名的', '已经开始', '已经结束'];

class MyEntrys extends React.Component {
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
        const titles = ['我报名的', '已经开始', '已经结束'];
        const states = ['accepted', 'started', 'ended'];
        
        const right = states.map(function (val, index) {
            const url = "/gameApi/game/userentrys/" + this.props.params.username + "?state=" + val;
            return <GameList key={index} prefix="/game-" url={url}/>;
        }.bind(this));

        return (
            <div>
                <Row>
                    <Col key={0} span="3"><Sider callBack={this.callBack.bind(this)} items={items}/></Col>
                    <Col key={1} span="20" offset="1">{right[this.state.current - 1]}</Col>
                </Row>
            </div>
        );
    }
}


export default MyEntrys;
