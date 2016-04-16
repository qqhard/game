import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import {browserHistory} from 'react-router';
import CsrfToken from '../common/csrf_token.js';
import message from 'antd/lib/message';

class RegisterForm extends React.Component {
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
            message.success('自动登录成功');
        }.bind(this)).error(function (e) {
            message.error('自动登陆失败');
            browserHistory.push("/login.html");
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var flag = this.handleUsername(null) & this.handlePassword(null) & this.handleRepassword(null);
        if (flag == false) return;

        var data = {
            username: this.state.username.data,
            password: this.state.password.data,
            rePassword: this.state.repassword.data,
            _csrf: $('input[name=_csrf]').val()
        };
        $.post('/userApi/register', data, function (data) {
            if (data.status == "ok") {
                message.success("注册成功！");
                if (!!this.props.nextStep) this.props.nextStep();
                this.autoLogin(this.state.username.data, this.state.password.data);
            } else {
                message.error(data.data);
            }
        }.bind(this));
    }

    render() {
        return (
            <div>
                <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                    <CsrfToken />
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
        );
    }
}

export default RegisterForm;
