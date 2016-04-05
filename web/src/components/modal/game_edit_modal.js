import React from 'react';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import CsrfToken from '../common/csrf_token.js';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import DatePicker from 'antd/lib/date-picker';


export const openGameEditModel = function () {
    this.setState({visible: true});
}

export const closeGameEditModel = function () {
    this.setState({visible: false});
}

export const updateGame = function (game) {
    this.setState({game: game});
}

class GameEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'starttime',
            starttime: {data: null, help: ''},
            duetime: {data: null, help: ''},
            endtime: {data: null, help: ''},
            gametime: {data: null, help: ''},
            gameplace: {data: null, help: ''}
        }
    }

    componentDidMount() {
        var newState = {
            starttime: this.state.starttime,
            duetime: this.state.duetime,
            endtime: this.state.endtime,
            gametime: this.state.gametime,
            gameplace: this.state.gameplace
        };
        newState.starttime.data = this.props.game.startTime;
        newState.duetime.data = this.props.game.dueTime;
        newState.endtime.data = this.props.game.endTime;
        newState.gametime.data = this.props.game.gametime;
        newState.gameplace.data = this.props.game.gameplace;
        this.setState(newState);
    }

    handleStarttime(value) {
        var starttime = this.state.starttime;
        if (value != 0)starttime.data = value;
        if (!starttime.data || starttime.data.length == 0) {
            starttime.help = '不能为空！';
        } else if (starttime.data <= new Date()) {
            starttime.help = '不能选择一个比现在早的时间！';
        } else if (starttime.data >= this.state.duetime.data) {
            starttime.help = '开始报名时间不能晚于报名截止时间！';
        } else if (starttime.data >= this.state.endtime.data) {
            starttime.help = '开始报名时间不能晚于赛事结束时间！';
        } else {
            starttime.help = '';
        }
        this.setState({starttime: starttime});
        if (starttime.help.length > 0)return false;
        return true;
    }

    handleDuetime(value) {
        var duetime = this.state.duetime;
        if (value != 0)duetime.data = value;
        if (!duetime.data || duetime.data.length == 0) {
            duetime.help = '不能为空！';
        } else if (duetime.data <= new Date()) {
            duetime.help = '不能选择一个比现在早的时间！';
        } else if (duetime.data <= this.state.starttime.data) {
            duetime.help = '报名截止时间不能早于报名开始时间！';
        } else if (duetime.data >= this.state.endtime.data) {
            duetime.help = '报名截止时间不能晚于赛事结束时间！';
        } else {
            duetime.help = '';
        }
        this.setState({duetime: duetime});
        if (duetime.help.length > 0)return false;
        return true;
    }

    handleEndtime(value) {
        console.log(value);
        var endtime = this.state.endtime;
        if (value != 0)endtime.data = value;
        if (!endtime.data || endtime.data.length == 0) {
            endtime.help = '不能为空！';
        } else if (endtime.data <= new Date()) {
            endtime.help = '不能选择一个比现在早的时间！';
        } else if (endtime.data <= this.state.starttime.data) {
            endtime.help = '赛事结束时间不能早于报名开始时间！';
        } else if (endtime.data <= this.state.duetime.data) {
            endtime.help = '赛事结束时间不能早于报名截止时间！';
        } else {
            endtime.help = '';
        }
        this.setState({endtime: endtime});
        if (endtime.help.length > 0)return false;
        return true;
    }

    handleGametime(e) {
        var gametime = this.state.gametime;
        if (e != null) gametime.data = e.target.value;
        if (gametime.data.length == 0) {
            gametime.help = '不能为空！';
        } else {
            gametime.help = '';
        }
        this.setState({gametime: gametime});
        if (gametime.help.length > 0)return false;
        return true;
    }

    handleGameplace(e) {
        var gameplace = this.state.gameplace;
        if (e != null) gameplace.data = e.target.value;
        if (gameplace.data.length == 0) {
            gameplace.help = '不能为空！';
        } else {
            gameplace.help = '';
        }
        this.setState({gameplace: gameplace});
        if (gameplace.help.length > 0)return false;
        return true;
    }

    put(url, data, newGame) {
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            success: function (data) {
                if (data == 'ok') {
                    message.success('修改成功！');
                    this.props.onCancel()
                    this.props.updateGame(newGame);

                } else {
                    message.error('修改失败！');
                }
            }.bind(this),
            error: function (e) {
                message.error('修改失败！');
            }
        });
    }

    submitStarttime() {
        if (!this.handleStarttime(0))return;
        const url = `/gameApi/game/${this.props.game.gamename}/starttime`;
        const data = {
            'startTime': Date.parse(this.state.starttime.data),
            '_csrf': $('input[name=_csrf]').val()
        };
        var game = this.props.game;
        game.startTime = Date.parse(this.state.starttime.data);
        this.put(url, data, game);
    }

    submitDuetime() {
        if (!this.handleDuetime(0))return;
        const url = `/gameApi/game/${this.props.game.gamename}/duetime`;
        const data = {
            'dueTime': Date.parse(this.state.duetime.data),
            '_csrf': $('input[name=_csrf]').val()
        };
        var game = this.props.game;
        game.dueTime = Date.parse(this.state.duetime.data);
        this.put(url, data, game);
    }

    submitEndtime() {
        if (!this.handleEndtime(0))return;
        const url = `/gameApi/game/${this.props.game.gamename}/endtime`;
        const data = {
            'endTime': Date.parse(this.state.endtime.data),
            '_csrf': $('input[name=_csrf]').val()
        };
        var game = this.props.game;
        game.endTime = Date.parse(this.state.endtime.data);
        this.put(url, data, game);
    }

    submitGametime() {
        if (!this.handleGametime(null))return;
        const url = `/gameApi/game/${this.props.game.gamename}/gametime`;
        const data = {
            'gameTime': this.state.gametime.data,
            '_csrf': $('input[name=_csrf]').val()
        };
        var game = this.props.game;
        game.gametime = this.state.gametime.data;
        this.put(url, data, game);
    }

    submitGameplace() {
        if (!this.handleGameplace(null))return;
        const url = `/gameApi/game/${this.props.game.gamename}/gameplace`;
        const data = {
            'gamePlace': this.state.gameplace.data,
            '_csrf': $('input[name=_csrf]').val()
        };
        var game = this.props.game;
        game.gameplace = this.state.gameplace.data;
        this.put(url, data, game);
    }

    handleOk() {
        const submitMap = {
            'starttime': this.submitStarttime.bind(this),
            'duetime': this.submitDuetime.bind(this),
            'endtime': this.submitEndtime.bind(this),
            'gametime': this.submitGametime.bind(this),
            'gameplace': this.submitGameplace.bind(this)
        };

        var submit = submitMap[this.state.current];
        submit();

    }

    handleConcel() {
        this.props.onCancel();
    }

    handleClick(e) {
        this.setState({current: e.key});
    }

    render() {

        const starttime = (
            <div className="form-group">
                <label>报名开始时间 </label>
                <DatePicker key="starttime" showTime defaultValue={new Date(this.state.starttime.data)}
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间"
                            onChange={this.handleStarttime.bind(this)}/>
                <p>{this.state.starttime.help}</p>
            </div>
        );

        const duetime = (
            <div className="form-group">
                <label>报名截止时间 </label>
                <DatePicker key="duetime" showTime defaultValue={new Date(this.state.duetime.data)}
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间"
                            onChange={this.handleDuetime.bind(this)}/>
                <p>{this.state.duetime.help}</p>
            </div>
        );

        const endtime = (
            <div className="form-group">
                <label >赛事结束时间 </label>
                <DatePicker key="endtime" showTime defaultValue={new Date(this.state.endtime.data)}
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间"
                            onChange={this.handleEndtime.bind(this)}/>
                <p>{this.state.endtime.help}</p>
            </div>
        );

        const timeTextarea = (
            <div className="form-group">
                <label >赛事的时间描述</label>
                <textarea key="gametime" className="form-control" value={this.state.gametime.data}
                          onChange={this.handleGametime.bind(this)}></textarea>
                <p>{this.state.gametime.help}</p>
            </div>
        );

        const placeTextarea = (
            <div className="form-group">
                <label >赛事的地点描述</label>
                <textarea key="gameplace" className="form-control" value={this.state.gameplace.data}
                          onChange={this.handleGameplace.bind(this)}></textarea>
                <p>{this.state.gameplace.help}</p>
            </div>
        );

        const body = {
            'starttime': starttime,
            'duetime': duetime,
            'endtime': endtime,
            'gametime': timeTextarea,
            'gameplace': placeTextarea
        };
        console.log('model render');
        return (
            <Modal
                width={600}
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleConcel.bind(this)}>
                <Menu onClick={this.handleClick.bind(this)}
                      selectedKeys={[this.state.current]}
                      mode="horizontal">
                    <Menu.Item key="starttime">
                        <Icon type="edit"/>报名开始
                    </Menu.Item>
                    <Menu.Item key="duetime">
                        <Icon type="edit"/>报名截止
                    </Menu.Item>
                    <Menu.Item key="endtime">
                        <Icon type="edit"/>赛事结束
                    </Menu.Item>
                    <Menu.Item key="gametime">
                        <Icon type="edit"/>时间描述
                    </Menu.Item>
                    <Menu.Item key="gameplace">
                        <Icon type="edit"/>地点描述
                    </Menu.Item>
                </Menu>
                <CsrfToken />
                <div style={{paddingTop:'20px'}}>
                    {body[this.state.current]}
                </div>
            </Modal>
        );
    }
}

export default GameEditModal;