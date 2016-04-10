import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import CsrfToken from '../common/csrf_token';
import Button from 'react-bootstrap/lib/Button';
import BelongsForm, {callbackParent} from './belong_form.js';
import message from 'antd/lib/message';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Icon from 'antd/lib/icon';
import 'antd/lib/index.css';
import {Link} from 'react-router';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const styleLayout = {
    labelClassName: "col-xs-2",
    wrapperClassName: "col-xs-6"
};


class EmailCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            isSubmit: false
        };
    }


    sendEmail() {
        var body = '_csrf=' + $("input[name=_csrf]").val();
        var url = '/userApi/' + this.props.username + '/emailActivation';
        $.post(url, body, function (data) {
            this.setState({message: data.message});
        }.bind(this));
    }

    handleClick() {
        this.sendEmail();
        this.setState({isSubmit: true});
    }

    handleChange(e) {
        this.props.handleEmail(e);
    }

    render() {
        var span = null;

        if (this.props.isEmailActivated) {
            span = <span style={{lineHeight:"30px",color:'green'}}><Icon type="check-circle"/>邮箱已验证</span>;
        } else {
            if (this.state.isSubmit) {
                span = <span style={{lineHeight:"30px",color:'origin'}}><Icon type="check-circle"/>{this.state.message}</span>;
            } else if (this.props.isChange) {
                span = <span style={{lineHeight:"30px",color:'red'}}><Icon type="cross-circle"/>重新提交方可验证</span>;
            } else {
                span = (
                    <span style={{lineHeight:"30px"}}>
                        <a onClick={this.handleClick.bind(this)}><Icon type="exclamation-circle"/>邮箱未验证</a>
                </span>
                );
            }
        }

        return (
            <Input label="邮件" {...styleLayout}>
                <Row>
                    <Col xs={8}>
                        <Input type="text" name="email" value={this.props.value}
                               onChange={this.handleChange.bind(this)}
                               onBlur={this.props.handleEmail}
                               help={this.props.help}
                               bsStyle={this.props.valid}
                        />
                    </Col>
                    <Col xs={4}>
                        {span}
                    </Col>
                </Row>
            </Input>
        );

    }
}

class UserinfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sociolname: {'data': '', 'valid': null, 'help': null},
            studentid: {'data': '', 'valid': null, 'help': null},
            email: {'data': '', 'valid': null, 'help': null},
            phone: {'data': '', 'valid': null, 'help': null},
            provinceid: 0,
            collegeid: 0,
            instituteid: 0,
            initEmail: '',

        };
    }

    componentWillMount() {
        var url = '/userApi/userinfo/' + this.props.username;
        var phone = this.state.phone;
        var email = this.state.email;
        var sociolname = this.state.sociolname;
        var studentid = this.state.studentid;
        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            async: false,
            success: function (data) {
                console.log(data);
                phone['data'] = data.phone;
                email['data'] = data.email;
                sociolname['data'] = data.sociolname;
                studentid['data'] = data.studentid;
                this.setState({
                    provinceid: data.provinceid,
                    collegeid: data.collegeid,
                    instituteid: data.instituteid,
                    phone: phone,
                    email: email,
                    initEmail: email.data,
                    sociolname: sociolname,
                    studentid: studentid,
                    isEmailActivated: data.isEmailActivated
                });
            }.bind(this)
        });
    }

    handleStudentid(e) {
        var data = e == null ? this.state.studentid.data : e.target.value;
        var newStudentID;
        var re = /^[a-zA-Z0-9]+$/g;
        if (data == null || data.length == 0) {
            newStudentID = {'data': data, 'valid': 'error', 'help': '请输入学号'}
        } else if (!re.test(data)) {
            newStudentID = {'data': data, 'valid': 'error', 'help': '无效的学号'}
        }
        else {
            newStudentID = {'data': data, 'valid': 'success', 'help': ''}
        }
        this.setState({studentid: newStudentID});
        return newStudentID.valid == 'success'
    }

    handleSociolname(e) {
        var data = e == null ? this.state.sociolname.data : e.target.value;
        var newSocialName = {data: data, valid: '', help: ''};
        if (data == null || data.length == 0) {
            newSocialName.valid = 'error';
            newSocialName.help = '请输入姓名'
        } else {
            newSocialName.valid = 'success';
            newSocialName.help = ''
        }
        this.setState({sociolname: newSocialName});
        return newSocialName.valid == 'success'
    }

    handlePhone(e) {
        var data = e == null ? this.state.phone.data : e.target.value;
        var newPhone = {data: data, valid: '', help: ''};
        var re = /^\d+$/g;
        if (data == null || data.length == 0) {
            newPhone.valid = 'error';
            newPhone.help = '请输入手机号'
        } else if (data.length < 5 || !re.test(data)) {
            newPhone.valid = 'error';
            newPhone.help = '无效的手机号'
        }
        else {
            newPhone.valid = 'success';
            newPhone.help = ''
        }
        this.setState({phone: newPhone});
        return newPhone.valid == 'success'
    }

    handleEmail(e) {
        var data = e == null ? this.state.email.data : e.target.value;
        var newEmail = {data: data, valid: '', help: ''};
        var re = /^\w[a-zA-Z0-9_\.]*@\w+\.\w+$/gi;
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


    handleSubmit(e) {
        e.preventDefault();
        if (!(this.handleEmail() & this.handlePhone() & this.handleSociolname() & this.handleStudentid())) return false;
        var body = $(e.target).serialize();
        var url = '/userApi/userinfo/' + this.props.username;
        console.log(url);
        $.ajax({
            url: url,
            type: 'PUT',
            data: body,
            success: function (data) {
                message.success("个人信息修改成功！");
                this.setState({
                    initEmail: this.state.email.data,
                    isEmailActivated: false
                });
            }.bind(this)
        });
        console.log(body);
        return true;
    }

    render() {
        const right = {display: 'inline'};
        const params = {
            'first': '不选择',
            'provincelabel': '省份',
            'collegelabel': '高校',
            'institutelabel': '学院'
        };

        var emailActivationUrl = "/emailActivation-" + this.props.username + ".html";

        var emailStatus;
        if (this.state.isEmailActivated) {
            emailStatus = (
                <span style={{lineHeight:"20px"}}><Icon type="check-circle"/>邮箱已验证</span>
            )
        } else {
            emailStatus = (
                <span style={{lineHeight:"30px"}}><Link to={emailActivationUrl}><Icon
                    type="exclamation-circle"/>邮箱未验证</Link></span>
            )
        }

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <Input type="text" name="studentid"
                       value={this.state.studentid.data}
                       onChange={this.handleStudentid.bind(this)}
                       onBlur={this.handleStudentid.bind(this)}
                       help={this.state.studentid.help}
                       bsStyle={this.state.studentid.valid}
                       label="学号" {...styleLayout} />
                <Input type="text" name="sociolname"
                       value={this.state.sociolname.data}
                       help={this.state.sociolname.help}
                       bsStyle={this.state.sociolname.valid}
                       onChange={this.handleSociolname.bind(this)}
                       onBlur={this.handleSociolname.bind(this)}
                       label="姓名" {...styleLayout} />
                <Input type="text" name="phone" value={this.state.phone.data}
                       onChange={this.handlePhone.bind(this)}
                       onBlur={this.handlePhone.bind(this)}
                       help={this.state.phone.help}
                       bsStyle={this.state.phone.valid}
                       label="手机" {...styleLayout} />
                <EmailCheck
                    handleEmail={this.handleEmail.bind(this)}
                    isEmailActivated={this.state.isEmailActivated}
                    isChange={this.state.initEmail!=this.state.email.data}
                    username={this.props.username}
                    value={this.state.email.data}
                    help={this.state.email.help}
                    valid={this.state.email.valid}
                />
                <BelongsForm
                    callbackParent={callbackParent.bind(this)} p={params}
                    provinceid={this.state.provinceid}
                    collegeid={this.state.collegeid}
                    instituteid={this.state.instituteid}
                />
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

export default UserinfoForm;