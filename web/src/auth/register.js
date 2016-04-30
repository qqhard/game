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
            email: {data: '', valid: null, help: null},
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

    handleEmail(e) {
        var data = e == null ? this.state.email.data : e.target.value;
        var newEmail = {data: data, valid: '', help: ''};
        var re = /^.+@.+$/gi;
        if (data == null || data.length == 0) {
            newEmail.valid = 'error';
            newEmail.help = '请输入邮箱地址'
        } else if (!re.test(data)) {
            newEmail.valid = 'error';
            newEmail.help = '无效的邮箱地址'
        }
        else {
            newEmail.valid = 'success';
            newEmail.help = ''
        }
        this.setState({email: newEmail});
        return newEmail.valid == 'success'
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
            email: this.state.email.data,
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
                </div>
                <div className="regist-form" onSubmit={this.handleSubmit.bind(this)}>
                    <form className="regist-form-signin">
                        <Input type="text" placeholder="用户名"
                               onChange={this.handleUsername.bind(this)}
                               bsStyle={this.state.username.valid}
                               help={this.state.username.help}
                        />
                        <Input type="text" placeholder="邮箱"
                               onChange={this.handleEmail.bind(this)}
                               bsStyle={this.state.email.valid}
                               help={this.state.email.help}
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
