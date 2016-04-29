import React from 'react';
import EntrysTable from './../components/tables/entrys_table.js';
import ManagerTable from './../components/tables/manager_table.js';
import TeamEntrysTable from './../components/tables/team_entrys_table.js';
import MessageRecordTable from './../components/tables/message_record_table.js';
import Sider from './../components/sider/sider.js';
import GameInfo from './../components/info/game_info.js';
import GameSteps from './../components/game_steps/game_steps.js'
import GameComment from './../components/game_comment/game_comment.js'
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import {updateGame} from '../components/modal/game_edit_modal.js';
import GameDetailForm from '../components/forms/game_detail_form.js';

const items = ["基本信息", "赛事详情", "参赛者", "管理组", "信息记录", "赛事评论"];

class GameManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            game: null,
            key: 0
        }
    }

    componentDidMount() {
        $.get('/gameApi/game/' + this.props.params.gamename, function (data) {
            this.setState({game: data});
        }.bind(this));
    }

    callBack(current) {
        this.setState({current: current});
    }

    render() {
        if (this.state.game == null) return <div></div>;
        var right = ["",
            (
                <div>
                    <Row>
                        <Col span="18">
                            <GameInfo data={this.state.game} hasEdit={true} updateGame={updateGame.bind(this)}/>
                        </Col>
                        <Col span="5" offset="1">
                            <GameSteps key="step" game={this.state.game}/>
                        </Col>
                    </Row>

                </div>
            ),
            <GameDetailForm gamename={this.props.params.gamename}/>,
            <EntrysTable gamename={this.props.params.gamename}/>,
            <ManagerTable gamename={this.props.params.gamename}
                          owner={this.state.game.owner}/>,
            <MessageRecordTable gamename={this.props.params.gamename}/>,
            <GameComment game={this.state.game} key={this.state.key}/>
        ];
        if(this.state.game.teamMin>1){
            right[3] = <TeamEntrysTable gamename={this.props.params.gamename}/>;
        }
        return (
            <div className="container">
                <Row>
                    <Col key={0} span="3"><Sider callBack={this.callBack.bind(this)} items={items}/></Col>
                    <Col key={1} span="20" offset="1">{right[this.state.current]}</Col>
                </Row>
            </div>
        );

    }
}

export default GameManage;
