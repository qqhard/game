import React from 'react';
import CsrfToken from './../components/common/csrf_token.js';
import Input from 'react-bootstrap/lib/Input';
import {browserHistory} from 'react-router';
import message from 'antd/lib/message';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {data: '', valid: null, help: null},
            password: {data: '', valid: null, help: null},
            repassword: {data: '', valid: null, help: null},
        };
    }

    handleUsername(e) {
        var username = this.state.username;
        if (!!e) username.data = e.target.value;
        var re = /^\w+$/g;
        if (username.data.length == 0) {
            username.valid = "error";
            username.help = "用户名不能为空!";
        } else if (username.data.length < 5) {
            username.valid = "error";
            username.help = "用户名长度低于5位!";
        } else if (!re.test(username.data)) {
            username.valid = "error";
            username.help = "用户名只能是字母和数字!";
        } else {
            username.valid = "success";
            username.help = "";
        }
        this.setState({username: username});
        if (username.valid == "success") return true;
        return false;
    }

    handlePassword(e) {
        var password = this.state.password;
        if (!!e) password.data = e.target.value;
        var re = /^\w+$/g;
        if (password.data.length == 0) {
            password.valid = "error";
            password.help = "密码不能为空!";
        } else if (password.data.length < 8) {
            password.valid = "error";
            password.help = "密码不能少于8位!";
        } else if (!re.test(password.data)) {
            password.valid = "error";
            password.help = "密码只能是字母和数字!";
        } else {
            password.valid = "success";
            password.help = "";
        }
        this.setState({password: password});
        if (password.valid == "success") return true;
        return false;
    }

    handleRepassword(e) {
        var repassword = this.state.repassword;
        if (!!e) repassword.data = e.target.value;
        if (repassword.data != this.state.password.data) {
            repassword.valid = "error";
            repassword.help = "两次密码不一致!";
        } else {
            repassword.valid = "success";
            repassword.help = "";
        }
        this.setState({repassword: repassword});
        if (repassword.valid == "success") return true;
        return false;
    }

    autoLogin(username, password) {
        var data = {
            username: username,
            password: password,
            _csrf: $('input[name=_csrf]').val()
        };
        console.log(data);
        $.post('/userApi/login', data, function (data) {
            top.location = `/userinfo-${username}.html`;
        }.bind(this)).error(function (e) {
            message.error('自动登陆失败');
            browserHistory.push("/login.html");
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var flag = this.handleUsername(null) & this.handlePassword(null) & this.handleRepassword(null);
        if (!flag) return;

        var data = {
            username: this.state.username.data,
            password: this.state.password.data,
            rePassword: this.state.repassword.data,
            _csrf: $('input[name=_csrf]').val()
        };
        $.post('/userApi/register', data, function (data) {
            if (data.status == "ok") {
                message.success("注册成功！");
                this.autoLogin(this.state.username.data, this.state.password.data);
            } else {
                message.error(data.data);
            }
        }.bind(this));
    }

    render() {
        return (
            <div className="regist-form-div" style={{marginTop:'-20px'}}>
                <CsrfToken />
                <div className="regist-info">
                    <div className="in-info">
                        <h1>Game Factory 简介</h1>
                        <h3> 校园赛事平台将校园中赛事举办流程抽象为计算机系统，为赛事的举办者和参与者提供一个统一的web平台，以解决现在单纯线下赛事所遇到的种种问题。</h3>
                        <h3>
                            通过赛事平台，用户可以发布和管理赛事，通过模版为赛事制定个性化主页，通过唯一的二级域名进行访问。而参与者可以通过平台了解到校内网的赛事信息并参与报名，针对需要组队的赛事系统给出了队伍招募的解决方案。平台提供必要的短信，邮件和私信等信息交互手段。针对赛事列表，系统将完成对其个性化排序。</h3>
                    </div>
                </div>
                <div className="regist-form" onSubmit={this.handleSubmit.bind(this)}>
                    <form className="regist-form-signin">
                        <h2>Fast Register</h2>
                        <Input type="text" placeholder="用户名"
                               onChange={this.handleUsername.bind(this)}
                               bsStyle={this.state.username.valid}
                               help={this.state.username.help}
                        />
                        <Input type="password" placeholder="密码"
                               onChange={this.handlePassword.bind(this)}
                               bsStyle={this.state.password.valid}
                               help={this.state.password.help}
                        />
                        <Input type="password" placeholder="密码确认"
                               onChange={this.handleRepassword.bind(this)}
                               bsStyle={this.state.repassword.valid}
                               help={this.state.repassword.help}
                        />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                    </form>
                </div>
                <div>
                    <h1>Join in Game Factory</h1>
                </div>
            </div>
        );
    }
}

export default Register;
