import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import {browserHistory, Link} from 'react-router';
import CsrfToken from '../common/csrf_token.js';
import message from 'antd/lib/message';
import Icon from 'antd/lib/icon';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const styleLayout = {
    labelClassName: "col-xs-2",
    wrapperClassName: "col-xs-6"
};

class EntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            emailActivated: false,
            phone: {'data': '', 'valid': null, 'help': null},
            email: {'data': '', 'valid': null, 'help': null},
            forms: [{'name': 'qq', 'data': '', 'valid': null, 'help': null}],
            teams: [],
            isTeam: false,
            teamSign: 0,
            teamNum: 1,
            team: {data: 0, valid: null, help: null},
            province: {help: '', valid: null},
            college: {help: '', valid: null},
            institute: {help: '', valid: null},
        };
    }

    fetchBelongName(provinceid, collegeid, instituteid) {
        if (!provinceid || !collegeid || !instituteid)return;
        const belong_url = `/gameApi/belong/${provinceid}/${collegeid}/${instituteid}`;
        $.get(belong_url, function (data) {
            this.setState(data);
        }.bind(this));
    }

    componentDidMount() {
        var user_url = '/userApi/userinfo';
        var game_url = '/gameApi/game/' + this.props.gamename;
        var team_url = `/gameApi/teams/${this.props.username}?entryed=false`;
        $.get(user_url, function (data) {
            if(data.length>100){
                message.info('请先登陆再进行报名!');
            }
            var phone = this.state.phone;
            var email = this.state.email;
            phone['data'] = data.phone;
            email['data'] = data.email;
            this.fetchBelongName(data.provinceid, data.collegeid, data.instituteid);
            this.setState({
                phone: phone,
                email: email,
                isEmailActivated: data.isEmailActivated,
                user: data
            });
        }.bind(this)).error(function (e) {
        });
        $.get(game_url, function (data) {
            if (!(data.teamSign == 0 && data.teamNum == 1))this.setState({isTeam: true});
            var forms = data.formList;
            var arr = [];
            for (var i = 0; i < forms.length; i++) {
                arr.push({'name': forms[i].name, 'data': '', 'valid': null, 'help': ''});
            }
            this.setState({game: data});
            this.setState({forms: arr, teamSign: data.teamSign, teamNum: data.teamNum});
        }.bind(this));
        $.get(team_url, function (data) {
            this.setState({teams: data});
        }.bind(this));
    }

    handleBelong() {
        if (!this.state.game || !this.state.user) return;
        if (this.state.game.provinceid != 0 && this.state.game.provinceid != this.state.user.provinceid) {
            this.setState({province: {help: '不满足省份限制！', valid: 'error'}});
            return false;
        }
        this.setState({province: {help: '', valid: 'success'}});
        if (this.state.game.collegeid != 0 && this.state.game.collegeid != this.state.user.collegeid) {
            this.setState({college: {help: '不满足高校限制！', valid: 'error'}});
            return false;
        }
        this.setState({college: {help: '', valid: 'success'}});
        if (this.state.game.instituteid != 0 && this.state.game.instituteid != this.state.user.instituteid) {
            this.setState({institute: {help: '不满足学院限制！', valid: 'error'}});
            return false;
        }
        this.setState({institute: {help: '', valid: 'success'}});
        return true;
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
        if (!this.state.user.isEmailActivated) {
            email.valid = 'error';
            email.help = '邮箱未验证';
        } else if (re.test(email.data)) {
            email.valid = 'success';
            email.help = '';
        } else {
            email.valid = 'error';
            email.help = '电子邮箱格式错误';
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
            if (this.state.teamSign == 0) {
                if (this.state.teamNum == team.nowNum) flag = true;
            } else if (this.state.teamSign == 1) {
                if (team.nowNum < this.state.teamNum) flag = true;
            } else if (this.state.teamSign == 2) {
                if (team.nowNum > this.state.teamNum) flag = true;
            }
        }


        if (flag) {
            val.valid = 'success';
            val.help = '';
        } else if (team == null) {
            val.valid = 'error';
            val.help = '请选择队伍！';
        } else {
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
        this.handleBelong();
        var flag = this.handleBelong() & this.handlePhone(null) & this.handleEmail(null) & (!this.state.isTeam || this.handleTeam(null));
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

        const forms = this.state.forms.map(function (val, index) {
            return <Input type="text" key={index} {...styleLayout}
                          label={val.name} value={val.data} onChange={this.handleUserDefineForm.bind(this,index)}/>;
        }.bind(this));
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

        var emailIcon = null;
        if (this.state.isEmailActivated) {
            emailIcon = <span style={{lineHeight:"30px",color:'green'}}><Icon type="check-circle"/>邮箱已验证</span>;
        } else {
            var userinfo_url = '/';
            if (!!this.state.user)userinfo_url = `/userinfo-${this.state.user.username}.html`;
            emailIcon = (
                <span style={{lineHeight:"30px"}}>
                    <Link to={userinfo_url}><Icon type="exclamation-circle"/>邮箱未验证,前去验证</Link>
                </span>
            );
        }

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <Input type="text" disabled={true} label="省份" value={this.state.provincename}
                       help={this.state.province.help} bsStyle={this.state.province.valid} {...styleLayout}/>
                <Input type="text" disabled={true} label="高校" value={this.state.collegename}
                       help={this.state.college.help} bsStyle={this.state.college.valid} {...styleLayout}/>
                <Input type="text" disabled={true} label="学院" value={this.state.institutename}
                       help={this.state.institute.help} bsStyle={this.state.institute.valid} {...styleLayout} />
                <Input type="text" disabled={true} label="手机" {...styleLayout} help={this.state.phone.help}
                       bsStyle={this.state.phone.valid} value={this.state.phone.data}
                       onChange={this.handlePhone.bind(this)}/>
                <Input label="邮件" {...styleLayout} help={this.state.email.help} bsStyle={this.state.email.valid}>
                    <Row>
                        <Col xs={8}>
                            <Input type="text" name="email" disabled={true}
                                   value={this.state.email.data}
                                   help={this.props.help}
                                   bsStyle={this.props.valid}
                            />
                        </Col>
                        <Col xs={4}>
                            {emailIcon}
                        </Col>
                    </Row>
                </Input>
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
