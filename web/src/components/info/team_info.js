import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import {Link} from 'react-router';

class TeamInfo extends React.Component {
    render() {
        if (!this.props.data )return <Jumbotron></Jumbotron>;
        var info = null;
        if(!this.props.data.gamename){
            info = <h3>目前人数：{this.props.data.nowNum}</h3>;
        }else{
            const href = `game-${this.props.data.gamename}.html`;
            info = <h3>参与赛事：<Link to={href}>{this.props.data.gamename}</Link></h3>
        }
        return (
            <Jumbotron>
                <h2>{this.props.data.cnname} (英文名:{this.props.data.enname})</h2><br/>
                <h3>队长：{this.props.data.leader}</h3><br/>
                <h3>招募人数：{this.props.data.limitNum}</h3><br/>
                {info}<br/>
                <p>{this.props.data.info}</p><br/>
            </Jumbotron>
        )
    }
}

export default TeamInfo;
