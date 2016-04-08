import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import {browserHistory} from 'react-router';
import CsrfToken from '../common/csrf_token.js';
import BelongsForm, {callbackParent} from '../belong_form/belong_form.js';
import message from 'antd/lib/message';

class EntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceid: 0,
            collegeid: 0,
            instituteid: 0,
            phone: {'data': '', 'valid': null, 'help': null},
            email: {'data': '', 'valid': null, 'help': null},
            forms: [{'name': 'qq', 'data': '', 'valid': null, 'help': null}],
            teams: [],
            isTeam: false,
            teamSign: 1,
            teamNum: 1,
            team: {data: 0, valid: null, help: null}
        };
    }

    componentWillMount() {
        var url = '/userApi/userinfo/' + this.props.username;
        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            async: false,
            success: function (data) {
                console.log(data);
                this.setState({
                    provinceid: data.provinceid,
                    collegeid: data.collegeid,
                    instituteid: data.instituteid
                });
            }.bind(this)
        });
    }

    componentDidMount() {
        var user_url = '/userApi/userinfo/' + this.props.username;
        var game_url = '/gameApi/game/' + this.props.gamename;
        var team_url = `/gameApi/teams/${this.props.username}?entryed=false`;
        $.get(user_url, function (data) {
            var phone = this.state.phone;
            var email = this.state.email;
            phone['data'] = data.phone;
            email['data'] = data.email;
            this.setState({
                provinceid: data.provinceid,
                collegeid: data.collegeid,
                instituteid: data.instituteid,
                phone: phone,
                email: email
            });
        }.bind(this));
        $.get(game_url, function (data) {
            if (!(data.teamSign == 1 && data.teamNum == 1))this.setState({isTeam: true});
            this.setState
            var forms = data.formList;
            var arr = [];
            for (var i = 0; i < forms.length; i++) {
                arr.push({'name': forms[i].name, 'data': '', 'valid': null, 'help': ''});
            }
            this.setState({forms: arr, teamSign: data.teamSign, teamNum: data.teamNum});
        }.bind(this));
        $.get(team_url, function (data) {
            this.setState({teams: data});
        }.bind(this));
    }

    handleUserDefineForm(index, event) {
        var val = event.target.value;
        var forms = this.state.forms;
        forms[index]['data'] = val;
        this.setState({forms: forms});
    }

    handlePhone(e) {
        var phone = this.state.phone;
        if (e != null)phone['data'] = e.target.value;
        if (phone.data.length == 11) {
            phone['valid'] = 'success';
            phone['help'] = '';
        } else {
            phone['valid'] = 'error';
            phone['help'] = '手机号码格式错误';
        }
        this.setState({phone: phone});
        if (phone.valid == 'success')return true;
        return false;
    }

    handleEmail(e) {
        var email = this.state.email;
        if (e != null)email['data'] = e.target.value;
        var re = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if (re.test(email.data)) {
            email['valid'] = 'success';
            email['help'] = '';
        } else {
            email['valid'] = 'error';
            email['help'] = '电子邮箱格式错误';
        }
        this.setState({email: email});
        if (email.valid == 'success')return true;
        return false;
    }

    userDefineFormToStr() {
        var list = this.state.forms;
        var len = list.length;
        var new_lsit = [];
        for (var i = 0; i < len; i++) {
            new_lsit.push(list[i].name + "=" + list[i].data);
        }
        return new_lsit.join('#');
    }

    handleTeam(e) {
        var val = this.state.team;
        if (!!e) val.data = e.target.value;

        const team = this.state.teams[this.state.team.data];
        var flag = false;
        if (team != null) {
            if (this.state.teamSign == 1) {
                if (this.state.teamNum == team.nowNum) flag = true;
            } else if (this.state.teamSign == 2) {
                if (team.nowNum < this.state.teamNum) flag = true;
            } else if (this.state.teamSign == 3) {
                if (team.nowNum > this.state.teamNum) flag = true;
            }
        }


        if (flag) {
            val.valid = 'success';
            val.help = '';
        } else if (team==null) {
            val.valid = 'error';
            val.help = '请选择队伍！';
        }else {
            val.valid = 'error';
            val.help = '所选队伍不符合赛事要求！';
        }
        this.setState({team: val});
        return !!flag;
    }

    getIndividualBody() {
        return 'username=' + this.props.username
            + '&gamename=' + this.props.gamename
            + '&phone=' + this.state.phone.data
            + '&email=' + this.state.email.data
            + '&forms=' + this.userDefineFormToStr()
            + '&_csrf=' + $('input[name=_csrf]').val();
    }

    getTeamBody() {
        return 'username=' + this.props.username
            + '&gamename=' + this.props.gamename
            + '&teamid=' + this.state.teams[this.state.team.data].id
            + '&forms=' + this.userDefineFormToStr()
            + '&_csrf=' + $('input[name=_csrf]').val();
    }

    postEntry(url, body) {
        const gamename = this.props.gamename;
        $.post(url, body, function (data) {
            if (data.status == 'ok') {
                message.success("报名成功！");
                setTimeout(function () {
                    browserHistory.push('game-' + gamename + '.html');
                }, 1500);
            } else {
                message.error(data.data)
            }
            console.log(data);
        }.bind(this), 'json').error(function (e) {
            message.error("报名失败！")
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        var flag = this.handlePhone(null) & this.handleEmail(null) & (!this.state.isTeam || this.handleTeam(null));
        if (!flag)return;

        var url = null;
        var body = null;
        if (this.state.isTeam) {
            url = '/gameApi/game/entry/team';
            body = this.getTeamBody();
        } else {
            url = '/gameApi/game/entry/individual';
            body = this.getIndividualBody();
        }
        this.postEntry(url, body);
    }

    render() {
        const styleLayout = {
            labelClassName: "col-xs-2",
            wrapperClassName: "col-xs-6"
        };
        // const right = {display: 'inline'}
        const forms = this.state.forms.map(function (val, index) {
            return <Input type="text" key={index} {...styleLayout}
                          label={val.name} value={val.data} onChange={this.handleUserDefineForm.bind(this,index)}/>;
        }.bind(this));
        const params = {
            'first': '不选择',
            'provincelabel': '省份',
            'collegelabel': '高校',
            'institutelabel': '学院'
        };
        var teamSelect = <div></div>;
        if (this.state.isTeam) {
            const options = this.state.teams.map(function (val, index) {
                return <option key={index} value={index}>{val.cnname}({val.enname})</option>
            });
            teamSelect = (
                <Input type="select" {...styleLayout} name="team" label="队伍选择" placeholder="select"
                       value={this.state.team.data}
                       onChange={this.handleTeam.bind(this)}
                       bsStyle={this.state.team.valid}
                       help={this.state.team.help}
                >
                    {options}
                </Input>
            );
        }

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <BelongsForm
                    callbackParent={callbackParent.bind(this)} p={params}
                    provinceid={this.state.provinceid} provincename={this.state.provincename}
                    collegeid={this.state.collegeid} collegename={this.state.collegename}
                    instituteid={this.state.instituteid} institutename={this.state.institutename}
                />
                <Input type="text" label="手机" {...styleLayout} help={this.state.phone.help}
                       bsStyle={this.state.phone.valid} value={this.state.phone.data}
                       onChange={this.handlePhone.bind(this)}/>
                <Input type="text" label="邮件" {...styleLayout} help={this.state.email.help}
                       bsStyle={this.state.email.valid} value={this.state.email.data}
                       onChange={this.handleEmail.bind(this)}/>
                {forms}
                {teamSelect}
                <CsrfToken/>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-6">
                        <Button type="submit">提交</Button>
                    </div>
                </div>
            </form>
        );
    }
}

export default EntryForm;
