import React from 'react'
import { Link } from 'react-router'
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';
import './list.scss';
import Label from 'react-bootstrap/lib/Label';
import CsrfToken from '../common/csrf_token.js'
import message from 'antd/lib/message';

class TeamList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        $.get(this.props.url,function(data){
            this.setState({data: data});
        }.bind(this)).error(function(e){
            if(e.status == 403){
                top.location='/login';
            }
        });
    }
    render() {
        var nodes = this.state.data.map(function(team){
            if(team.members == null)team.now = 1
            else team.now = team.members.split(',').length + 1;
            return (
                <TeamNode key={team.id}
                          prefix={this.props.prefix}
                          team={team}
                />
            );
        }.bind(this));
        return (
            <ul className="list-group">
                <CsrfToken />
                {nodes}
            </ul>
        )
    }
}

class TeamNode extends React.Component {
    handleClick() {
        var url = '/game/member/apply/'+ this.props.team.id;
        var body = '_csrf='+$('input[name=_csrf]').val();
        $.post(url,body,function (data) {
            if(data == 'ok') {
                message.success('成功发出申请！');
            }
            else{
                message.error(data);
            }
        }.bind(this)).error(function (e) {
            message.error('申请失败,权限问题！');
        }.bind(this));
    }
    render() {
        var href = this.props.prefix + this.props.gamename + '.html';
        return (
            <li className="list-group-item">
                <PageHeader>
                    <Link to={href} >{this.props.team.cnname}</Link>
                    <small>（队长<Link to={href} >{this.props.team.leader}</Link>）</small>
                    <small> 人数上限:<Label>{this.props.team.num}</Label>人 目前已招募:<Label>{this.props.team.now}</Label>人</small>
                </PageHeader>


                <p className="list-group-item-text">{this.props.team.info}</p>
                <div className="right-bottom"><Button onClick={this.handleClick.bind(this)}>申请加入</Button></div>
            </li>
        )
    }
}

class MyTeamNode extends React.Component {
    render() {
        var href = '/teammanage-' + this.props.team.id + '.html';
        return (
            <li className="list-group-item">
                <PageHeader>
                    <Link to={href} >{this.props.team.cnname}</Link>
                    <small>（队长<Link to={href} >{this.props.team.leader}</Link>）</small>
                    <small> 人数上限:<Label>{this.props.team.num}</Label>人 目前已招募:<Label>{this.props.team.now}</Label>人</small>
                </PageHeader>


                <p className="list-group-item-text">{this.props.team.info}</p>
            </li>
        )
    }
}



export class MyUnEntryedTeamList extends TeamList {
    render() {
        var nodes = this.state.data.map(function(team){
            if(team.members == null)team.now = 1
            else team.now = team.members.split(',').length + 1;
            return (
                <MyTeamNode key={team.id}
                          prefix={this.props.prefix}
                          team={team}
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

export class MyEntryedTeamList extends React.Component {
    render(){
        return <TeamList url={this.props.url} prefix={this.props.prefix}/>;
    }
}

export default TeamList;
