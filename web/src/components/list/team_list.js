import React from 'react'
import {Link,browserHistory} from 'react-router'
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';
import './list.scss';
import Label from 'react-bootstrap/lib/Label';
import CsrfToken from '../common/csrf_token.js'
import message from 'antd/lib/message';

class TeamList extends React.Component {
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
        var nodes = this.state.data.map(function (team) {
            return (
                <TeamNode key={team.id} team={team} />
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
        var url = '/gameApi/member/apply/' + this.props.team.id;
        var body = '_csrf=' + $('input[name=_csrf]').val();
        $.post(url, body, function (data) {
            if (data == 'ok') {
                message.success('成功发出申请！');
            }
            else {
                message.error(data);
            }
        }.bind(this)).error(function (e) {
            message.error('申请失败,权限问题！');
        }.bind(this));
    }

    render() {
        var href = '/teamshow-' + this.props.team.id + '.html';
        return (
            <li className="list-group-item">
                <PageHeader>
                    <Link to={href}>{this.props.team.cnname}</Link>
                    <small>（{this.props.team.identity}:<Link to={href}>{this.props.team.owner}</Link>）</small>
                    <small> 人数上限:<Label>{this.props.team.limitNum}</Label>人 目前已招募:<Label>{this.props.team.nowNum}</Label>人
                    </small>
                </PageHeader>


                <p className="list-group-item-text">{this.props.team.info}</p>
                <div className="right-bottom"><Button onClick={this.handleClick.bind(this)}>申请加入</Button></div>
            </li>
        )
    }
}

class MyUnEntryedTeamNode extends React.Component {
    render() {
        var href = '/teammanage-' + this.props.team.id + '.html';
        return (
            <li className="list-group-item">
                <PageHeader>
                    <Link to={href}>{this.props.team.cnname}</Link>
                    <small>（{this.props.team.identity}:<Link to={href}>{this.props.team.owner}</Link>）</small>
                    <small> 人数上限:<Label>{this.props.team.limitNum}</Label>人 目前已招募:<Label>{this.props.team.nowNum}</Label>人
                    </small>
                </PageHeader>


                <p className="list-group-item-text">{this.props.team.info}</p>
            </li>
        )
    }
}


class MyEntryedTeamNode extends React.Component {
    render() {
        var href = '/teamshow-' + this.props.team.id + '.html';
        return (
            <li className="list-group-item">
                <PageHeader>
                    <Link to={href}>{this.props.team.cnname}</Link>
                    <small>（{this.props.team.identity}:<Link to={href}>{this.props.team.owner}</Link>）</small>
                    <small> 人数上限:<Label>{this.props.team.limitNum}</Label>人 目前已招募:<Label>{this.props.team.nowNum}</Label>人
                    </small>
                </PageHeader>


                <p className="list-group-item-text">{this.props.team.info}</p>
            </li>
        )
    }
}


class MyMemberTeamNode extends React.Component {
    render() {
        var href = '/teamshow-' + this.props.team.id + '.html';
        return (
            <li className="list-group-item">
                <PageHeader>
                    <Link to={href}>{this.props.team.cnname}</Link>
                    <small>（{this.props.team.identity}:<Link to={href}>{this.props.team.owner}</Link>）</small>
                    <small> 人数上限:<Label>{this.props.team.limitNum}</Label>人 目前已招募:<Label>{this.props.team.nowNum}</Label>人
                    </small>
                </PageHeader>


                <p className="list-group-item-text">{this.props.team.info}</p>
            </li>
        )
    }
}

export class MyUnEntryedTeamList extends TeamList {
    render() {
        var nodes = this.state.data.map(function (team) {
            return <MyUnEntryedTeamNode key={team.id} team={team}/>;
        }.bind(this));
        return (
            <ul className="list-group">
                {nodes}
            </ul>
        )
    }
}

export class MyEntryedTeamList extends TeamList {
    render() {
        var nodes = this.state.data.map(function (team) {
            return <MyEntryedTeamNode key={team.id} team={team}/>;
        }.bind(this));
        return (
            <ul className="list-group">
                {nodes}
            </ul>
        )
    }
}

export class MyMemberTeamList extends TeamList {
    render() {
        var nodes = this.state.data.map(function (team) {
            return (
                <MyMemberTeamNode key={team.id}
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

class MyInviteTeamNode extends React.Component {
    handleClick() {
        var url = '/gameApi/member/memaccept/' + this.props.team.memberid;
        var body = '_csrf=' + $('input[name=_csrf]').val();
        console.log(url);
        $.post(url, body, function (data) {
            if (data == 'ok') {
                message.success('成功发出申请！');
                browserHistory.push('teamshow-'+this.props.team.id+'.html');
            } else {
                message.error(data);
            }
        }.bind(this)).error(function (e) {
            message.error('申请失败,权限问题！');
        }.bind(this));
    }

    render() {
        var href = '/teamshow-' + this.props.team.id + '.html';
        return (
            <li className="list-group-item">
                <PageHeader>
                    <Link to={href}>{this.props.team.cnname}</Link>
                    <small>（{this.props.team.identity}:<Link to={href}>{this.props.team.owner}</Link>）</small>
                    <small> 人数上限:<Label>{this.props.team.limitNum}</Label>人 目前已招募:<Label>{this.props.team.nowNum}</Label>人</small>
                </PageHeader>

                <p className="list-group-item-text">{this.props.team.info}</p>
                <div className="right-bottom"><Button onClick={this.handleClick.bind(this)}>接受邀请</Button></div>
            </li>
        )
    }
}

export class MyInviteTeamList extends TeamList {
    render() {
        var nodes = this.state.data.map(function (team) {
            return (
                <MyInviteTeamNode key={team.id} team={team}/>
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

export default TeamList;
