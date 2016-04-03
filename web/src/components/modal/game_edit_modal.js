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
            current: 'duetime',
            duetime: {data: null, help: ''},
            gametime: {data: null, help: ''},
            gameplace: {data: null, help: ''}
        }
    }

    componentDidMount(){
        var duetime = this.state.duetime;
        duetime.data = this.props.game.dueTime;
        var gametime = this.state.gametime;
        gametime.data = this.props.game.gametime;
        var gameplace = this.state.gameplace;
        gameplace.data = this.props.game.gameplace;
        this.setState({
            duetime:duetime,
            gametime:gametime,
            gameplace:gameplace
        });
    }


    handleDuetime(value) {
        var duetime = this.state.duetime;
        if (value != 0)duetime.data = value;
        if (!duetime.data || duetime.data.length == 0) {
            duetime.help = '不能为空！';
        } else if (duetime.data <= new Date()) {
            duetime.help = '不能选择一个比现在早的时间！';
        } else {
            duetime.help = '';
        }
        this.setState({duetime: duetime});
        if (duetime.help.length > 0)return false;
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

    put(url, data ,newGame) {
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            success: function (data) {
                if(data == 'ok'){
                    message.success('修改成功！');
                    this.props.onCancel()
                    this.props.updateGame(newGame);
                   
                }else{
                    message.error('修改失败！');
                }
            }.bind(this),
            error: function (e) {
                message.error('修改失败！');
            }
        });
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
            'duetime': this.submitDuetime.bind(this),
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

        const duetime = (
            <div className="form-group">
                <label >报名截止时间 </label>
                <DatePicker showTime defaultValue={new Date(this.state.duetime.data)} format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间"
                            onChange={this.handleDuetime.bind(this)}/>
                <p>{this.state.duetime.help}</p>
            </div>
        );

        const timeTextarea = (
            <div className="form-group">
                <label >赛事的时间描述</label>
                <textarea key="1" className="form-control" value={this.state.gametime.data}
                          onChange={this.handleGametime.bind(this)}></textarea>
                <p>{this.state.gametime.help}</p>
            </div>
        );

        const placeTextarea = (
            <div className="form-group">
                <label >赛事的地点描述</label>
                <textarea  key="2" className="form-control" value={this.state.gameplace.data}
                          onChange={this.handleGameplace.bind(this)}></textarea>
                <p>{this.state.gameplace.help}</p>
            </div>
        );

        const body = {
            'duetime': duetime,
            'gametime': timeTextarea,
            'gameplace': placeTextarea
        };
        console.log('model render');
        return (
            <Modal
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleConcel.bind(this)}>
                <Menu onClick={this.handleClick.bind(this)}
                      selectedKeys={[this.state.current]}
                      mode="horizontal">
                    <Menu.Item key="duetime">
                        <Icon type="mail"/>报名截止时间
                    </Menu.Item>
                    <Menu.Item key="gametime">
                        <Icon type="mail"/>赛事时间描述
                    </Menu.Item>
                    <Menu.Item key="gameplace">
                        <Icon type="mail"/>赛事地点描述
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