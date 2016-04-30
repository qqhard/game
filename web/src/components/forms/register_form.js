import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CsrfToken from '../common/csrf_token';
import message from 'antd/lib/message';
import './form.scss';
import {classnames} from '../common/classnames';

const FormItem = Form.Item;
const createForm = Form.create;
function noop() {
    return false;
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passBarShow: false,
            rePassBarShow: false,
            passStrength: 'L',
            rePassStrength: 'L',
        }
    }

    getPassStrenth(value, type) {
        if (value) {
            let strength;
            if (value.length < 6) {
                strength = 'L';
            } else if (value.length <= 9) {
                strength = 'M';
            } else {
                strength = 'H';
            }
            if (type === 'password') {
                this.setState({passBarShow: true, passStrength: strength});
            } else {
                this.setState({rePassBarShow: true, rePassStrength: strength});
            }
        } else {
            if (type === 'password') {
                this.setState({passBarShow: false});
            } else {
                this.setState({rePassBarShow: false});
            }
        }
    }

    checkPass(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'password');

        if (form.getFieldValue('password')) {
            form.validateFields(['rePassword'], {force: true});
        }

        callback();
    }

    checkPass2(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'rePassword');

        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    renderPassStrengthBar(type) {
        const strength = type === 'password' ? this.state.passStrength : this.state.rePassStrength;
        const classSet = classnames({
            'ant-pwd-strength': true,
            'ant-pwd-strength-low': strength === 'L',
            'ant-pwd-strength-medium': strength === 'M',
            'ant-pwd-strength-high': strength === 'H'
        });

        const level = {
            L: '低',
            M: '中',
            H: '高'
        };

        return (
            <div>
                <ul className={classSet}>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-1"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-2"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-3"></li>
                    <span className="ant-form-text">
                        {level[strength]}
                    </span>
                </ul>
            </div>
        );
    }

    autoLogin(username, password) {
        var data = {
            username: username,
            password: password,
            _csrf: $('input[name=_csrf]').val()
        };
        $.post('/userApi/login', data, function (data) {
            message.success('自动登录成功');
            top.location.reload();
        }.bind(this)).error(function (e) {
            message.error('自动登陆失败');
            browserHistory.push("/login.html");
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                message.error('表单有误！');
                return;
            }
            values._csrf = $("input[name=_csrf]").val();
            $.post('/userApi/register', values, function (data) {
                if (data.status == "ok") {
                    message.success("注册成功！");
                    if (!!this.props.nextStep) this.props.nextStep();
                    this.autoLogin(values.username, values.password);
                } else {
                    message.error(data.data);
                }
            }.bind(this));
        });
    }

    render() {
        const {getFieldProps} = this.props.form;

        const usernameProps = getFieldProps('username', {
            rules: [
                {required: true, whitespace: true, message: '请填写用户名'},
                {min: 5, message: '用户名至少5位'},
                {pattern:/^[a-zA-z0-9_]+$/g, message:'用户名只能包含字母数字和下划线'}
            ]
        });
        const emailProps = getFieldProps('email', {
            rules: [
                {required: true, whitespace: true, message: '请填写邮箱'},
                { type: 'email', message: '请输入正确的邮箱地址' }
            ]
        });
        const passProps = getFieldProps('password', {
            rules: [
                {required: true, whitespace: true, message: '请填写密码'},
                {validator: this.checkPass.bind(this)}
            ]
        });
        const rePassProps = getFieldProps('rePassword', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: this.checkPass2.bind(this),
            }],
        });
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        return (

            <Form horizontal form={this.props.form}>
                <CsrfToken />
                <Row>
                    <Col span="19">
                        <FormItem
                            label="用户名："
                            hasFeedback
                            {...formItemLayout}
                        >
                            <Input {...usernameProps} />
                        </FormItem>

                    </Col>
                </Row>
                <Row>
                    <Col span="19">
                        <FormItem
                            label="邮箱："
                            {...formItemLayout}
                            hasFeedback
                        >
                            <Input {...emailProps}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="19">
                        <FormItem
                            {...formItemLayout}
                            hasFeedback
                            label="密码：">
                            <Input {...passProps}
                                type="password"
                                onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                autoComplete="off"
                            />
                        </FormItem>
                    </Col>
                    <Col span="5">
                        {this.state.passBarShow ? this.renderPassStrengthBar('password') : null}
                    </Col>
                </Row>

                <Row>
                    <Col span="19">
                        <FormItem
                            {...formItemLayout}
                            hasFeedback
                            label="确认密码：">
                            <Input {...rePassProps}
                                type="password"
                                onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                autoComplete="off"
                            />
                        </FormItem>
                    </Col>
                    <Col span="5">
                        {this.state.rePassBarShow ? this.renderPassStrengthBar('repassword') : null}
                    </Col>
                </Row>
                <Row>
                    <Col span="19">
                        <FormItem wrapperCol={{ span: 6, offset: 5}}>
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default createForm()(RegisterForm);
