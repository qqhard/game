import React from 'react';
import EntrysTable from './../components/tables/entrys_table.js';
import TeamEntrysTable from './../components/tables/team_entrys_table.js';
import MessageRecordTable from './../components/tables/message_record_table.js';
import Sider from './../components/sider/sider.js';
import GameInfo from './../components/game_info/game_info.js';
import GameSteps from './../components/game_steps/game_steps.js'
import GameComment from './../components/game_comment/game_comment.js'
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import GameEditModal, {openGameEditModel, closeGameEditModel, updateGame} from '../components/modal/game_edit_modal.js';


const items = ["基本信息", "参赛者管理", "信息记录", "赛事评论"];

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
                    <GameEditModal
                        visible={this.state.visible}
                        game={this.state.game}
                        onCancel={closeGameEditModel.bind(this)}
                        updateGame={updateGame.bind(this)}
                    />
                    <Row>
                        <Col span="18">
                            <GameInfo data={this.state.game}/>
                            <button className="btn btn-default" onClick={openGameEditModel.bind(this)}>信息修改</button>
                        </Col>
                        <Col span="5" offset="1">
                            <GameSteps key="step" game={this.state.game}/>
                        </Col>
                    </Row>

                </div>
            ),
            <EntrysTable gamename={this.props.params.gamename} username={this.props.username}/>,
            <MessageRecordTable gamename={this.props.params.gamename}/>,
            <GameComment game={this.state.game} key={this.state.key}/>
        ];
        if (!(this.state.game.teamSign == 1 && this.state.game.teamNum == 1)) {
            right[2] = <TeamEntrysTable gamename={this.props.params.gamename} username={this.props.username}/>;
        }

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

export default GameManage;
