import React from 'react';
import EntrysTable from './components/tables/entrys_table.js';
import MessageRecordTable from './components/tables/message_record_table.js';
import {Row, Col} from 'antd';
import Sider from './components/sider/sider.js';
import GameInfo from './components/game_info/game_info.js';
import GameSteps from './components/game_steps/game_steps.js'
import GameComment from './components/game_comment/game_comment.js'
import Badge from 'react-bootstrap/lib/Badge';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const items = ["基本信息","参赛者管理","信息记录","赛事评论"];

class GameManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            game: null,
            key: 0
        }
    }

    componentDidMount(){
        $.get('/gameApi/game/' + this.props.params.gamename, function (data) {
            this.setState({game: data});
            console.log(data);
        }.bind(this));
    }

    callBack(current) {
        this.setState({current: current});
    }

    render() {
        if(this.state.game == null) return <div></div>;
        var right = {
            1: (
                <div>
                    <Row>
                        <Col span="18">
                            <GameInfo data={this.state.game}/>
                        </Col>
                        <Col span="5" offset="1">
                            <GameSteps game={this.state.game}/>
                        </Col>
                    </Row>

                </div>
            ),
            2: <EntrysTable gamename={this.props.params.gamename} username={this.props.username}/>,
            3: <MessageRecordTable gamename={this.props.params.gamename}/>,
            4:<GameComment game={this.state.game} key={this.state.key}/>
        }

        return (
            <div>
                <Row>
                    <Col key={0} span="3"><Sider callBack={this.callBack.bind(this)} items={items} /></Col>
                    <Col key={1} span="20" offset="1">{right[this.state.current]}</Col>
                </Row>
            </div>
        );

    }
}

export default GameManage;
