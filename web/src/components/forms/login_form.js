import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import { browserHistory } from 'react-router';
import CsrfToken from '../common/csrf_token.js';
import message from 'antd/lib/message';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {data: '', valid: null, help: null},
            password: {data: '', valid: null, help: null}
        };
    }

    handleUsername(e) {
        var username = this.state.username;
        if (!!e) username.data = e.target.value;
        if (username.data.length == 0) {
            username.valid = "error";
            username.help = "用户名不能为空!";
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
        if (password.data.length == 0) {
            password.valid = "error";
            password.help = "密码不能为空!";
        } else {
            password.valid = "success";
            password.help = "";
        }
        this.setState({password: password});
        if (password.valid == "success") return true;
        return false;
    }

    handleSubmit(e) {
        e.preventDefault();
        var flag = this.handleUsername(null) & this.handlePassword(null);
        if (flag == false) return;

        var data = {
            username: this.state.username.data,
            password: this.state.password.data,
            _csrf: $('input[name=_csrf]').val()
        };
        $.post(`/userApi/login${this.props.query}`, data, function (data) {
            if(!!this.props.nextStep){
                top.location.reload();
            }else{
                browserHistory.push(`/userinfo-${this.state.username.data}.html`);
            }
            message.success('登陆成功！');
        }.bind(this)).error(function (e) {
            var password = this.state.password;
            password.help = "用户名或密码错误！";
            password.valid = "error";
            this.setState({password: password});
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
                    <button className="btn-login btn btn-lg btn-primary btn-block">
                        Login in
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginForm;