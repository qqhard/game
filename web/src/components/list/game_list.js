import React from 'react'
import {Link} from 'react-router'

const ACTIVE = {color: 'white'}

class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        $.get(this.props.url, function (data) {
            this.setState({data: data});
        }.bind(this)).error(function (e) {
            if (e.status == 403) {
                top.location = '/userApi/auth';
            }
        });
    }

    render() {
        var nodes = this.state.data.map(function (game) {
            return (
                <GameNode key={game.gamename}
                          prefix={this.props.prefix}
                          isManage={this.props.isManage}
                          game = {game}
                />
            );
        }.bind(this));
        return (
            <ul className="list-group">
                {nodes}
            </ul>
        )
    }
}

const getGameStatus = function (game) {
    if(game.step == 0) return "审核失败";
    if(game.step == 1) return "审核中";
    if(game.step == 2) {
        var now = Date.parse(new Date());
        if(now < game.startTime) return "未开始";
        else if(now > game.startTime && now < game.dueTime)return "报名中";
        else if(now > game.dueTime && now < game.endTime) return "截止报名";
        else if(now > game.endTime) return "已完结";
    }
}

const getGameHref = function (game, isManage) {
    if(isManage){
        if(game.step == 0) return `/gamefailed-${game.gamename}.html`;
        if(game.step == 1) return `/gamesubmited-${game.gamename}.html`;
        if(game.step == 2) return `/gamemanage-${game.gamename}.html`;
    }else{
        var now = Date.parse(new Date());
        if(now > game.dueTime) return `/gameevaluate-${game.gamename}.html`;
        else{
            return `/game-${game.gamename}.html`;
        }
    }
}

class GameNode extends React.Component {
    render() {
        const href = getGameHref(this.props.game, this.props.isManage);
        return (
            <li className="list-group-item">
                <h2 className="list-group-item-heading">
                    <Link to={href} activeStyle={ACTIVE}>{this.props.game.gamename}</Link>
                </h2>
                <p className="list-group-item-text">{this.props.game.briefinfo}</p>
                <div className="right-top">{getGameStatus(this.props.game)}</div>
            </li>
        )
    }
}

export default GameList;
