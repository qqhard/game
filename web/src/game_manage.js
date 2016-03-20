import React from 'react';
import EntrysTable from './components/tables/entrys_table.js';
import MessageRecordTable from './components/tables/message_record_table.js';
import {Row, Col} from 'antd';

import GameInfo from './components/game_info/game_info.js';
import GameSteps from './components/game_steps/game_steps.js'
import GameComment from './components/game_comment/game_comment.js'
import Badge from 'react-bootstrap/lib/Badge';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Sider = React.createClass({
    getInitialState() {
        return {
            current: '1',
            openKeys: []
        };
    },
    handleClick(e) {
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1)
        });
        this.props.callBack(e.key);
    },
    onToggle(info) {
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
        });
    },
    render() {
        return (
            <Menu onClick={this.handleClick}
                  openKeys={this.state.openKeys}
                  onOpen={this.onToggle}
                  onClose={this.onToggle}
                  selectedKeys={[this.state.current]}
                  mode="inline">
                <Menu.Item key="1">基本信息</Menu.Item>
                <Menu.Item key="2">参赛者管理</Menu.Item>
                <Menu.Item key="3">信息记录</Menu.Item>
                <Menu.Item key="4">赛事评论</Menu.Item>
            </Menu>
        );
    }
});


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
        $.get('/game/' + this.props.params.gamename, function (data) {
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
            2: <EntrysTable gamename={this.props.params.gamename} username={this.props.username}/>,
            3: <MessageRecordTable gamename={this.props.params.gamename}/>,
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
            4:<GameComment game={this.state.game} key={this.state.key}/>
        }

        return (
            <div>
                <Row>

                    <Col key={0} span="3"><Sider callBack={this.callBack.bind(this)}/></Col>
                    <Col key={1} span="20" offset="1">{right[this.state.current]}</Col>
                </Row>
            </div>
        );

    }
}

export default GameManage;
