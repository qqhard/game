import React from 'react';
import {browserHistory} from 'react-router';
import CsrfToken from '../common/csrf_token.js';
import message from 'antd/lib/message';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const FormItem = Form.Item;
const createForm = Form.create;
function noop() {
    return false;
}

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
        if (!flag) return;

        var data = {
            username: this.state.username.data,
            password: this.state.password.data,
            _csrf: $('input[name=_csrf]').val()
        };
        $.post(`/userApi/login${this.props.query}`, data, function (data) {
            if (!!this.props.nextStep) {
                top.location.reload();
            } else {
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

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                message.error('表单有误！');
                return;
            }
            values._csrf = $("input[name=_csrf]").val();
            $.post(`/userApi/login${this.props.query}`, values, (data)=> {
                if (!!this.props.nextStep) {
                    top.location.reload();
                } else {
                    browserHistory.push(`/userinfo-${this.state.username.data}.html`);
                }
                message.success('登陆成功');
            }).error((e)=> {
                message.error('用户名或密码错误');
            });
        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        const usernameProps = getFieldProps('username', {
            rules: [
                {required: true, message: '学号不能为空！'}
            ]
        });
        const passProps = getFieldProps('password', {
            rules: [
                {required: true, whitespace: true, message: '请填写密码'},
            ]
        });
        return (
            <Form horizontal form={this.props.form}>
                <CsrfToken />
                <FormItem
                    label="用户名："
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                    hasFeedback
                >
                    <Input {...usernameProps} />
                </FormItem>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                    hasFeedback
                    label="密码：">
                    <Input {...passProps}
                        type="password"
                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                        autoComplete="off"
                    />
                </FormItem>
                <FormItem wrapperCol={{ span: 5, offset: 5}}>
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>登陆</Button>
                </FormItem>
            </Form>
        );
    }
}

export default createForm()(LoginForm);
