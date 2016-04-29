import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import {Link} from 'react-router';
import PrivateMessageControl from '../control/private_message_control.js';

class TeamInfo extends React.Component {
    getLimitNum(){
        var limitNum = null;
        if (this.props.data.entryed) {
            limitNum = (
                <div>
                    <h3>队伍人数：{this.props.data.nowNum}</h3><br />
                </div>
            );
        } else {
            if (this.props.data.minNum == this.props.data.maxNum) {
                limitNum = (
                    <div>
                        <h3>招募人数：{this.props.data.minNum}</h3><br/>
                        <h3>目前人数：{this.props.data.nowNum}</h3><br />
                    </div>
                );
            } else {
                limitNum = (
                    <div>
                        <h3>招募人数：{this.props.data.minNum}到{this.props.data.maxNum}人</h3><br/>
                        <h3>目前人数：{this.props.data.nowNum}</h3><br />
                    </div>
                );
            }
        }
        return limitNum; 
    }
    render() {
        if (!this.props.data)return <Jumbotron></Jumbotron>;
        const href = `game-${this.props.data.gamename}.html`;
        const userHref = `userinfoshow-${this.props.data.owner}.html`;
        const owner = <Link to={userHref}>{this.props.data.owner}</Link>;
        var messageControl = null;
        if (this.props.hasMessage) messageControl = <PrivateMessageControl recver={this.props.data.owner}/>;
        return (
            <Jumbotron>
                {messageControl}

                <h2>{this.props.data.cnname}({this.props.data.enname})</h2><br/>
                <h3>参与赛事：<Link to={href}>{this.props.data.gamename}</Link></h3><br />
                <h3>{this.props.data.identity}：{owner}</h3><br/>
                {this.getLimitNum()}

                <p>{this.props.data.info}</p><br/>
            </Jumbotron>
        )
    }
}

export default TeamInfo;
