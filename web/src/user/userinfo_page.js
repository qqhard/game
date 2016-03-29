import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import CsrfToken from '../components/common/csrf_token';
import Button from 'react-bootstrap/lib/Button';
import BelongsForm, {callbackParent} from '../components/belong_form/belong_form.js';
import message from 'antd/lib/message';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PageHeader from 'react-bootstrap/lib/PageHeader';


class UserinfoPage extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col offset="4" span="16">
                        <PageHeader>个人信息
                            <small> 请谨慎修改</small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col offset="4" span="20">
                        <UserinfoForm username={this.props.params.username}/>
                    </Col>
                </Row>
            </div>
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
            instituteid: 0
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
                    sociolname: sociolname,
                    studentid: studentid
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
            }
        });
        console.log(body);
        return true;
    }

    render() {
        const styleLayout = {
            labelClassName: "col-xs-2",
            wrapperClassName: "col-xs-6"
        };
        const right = {display: 'inline'};
        const params = {
            'first': '不选择',
            'provincelabel': '省份',
            'collegelabel': '高校',
            'institutelabel': '学院'
        };


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
                <Input type="text" name="email" value={this.state.email.data}
                       onChange={this.handleEmail.bind(this)}
                       onBlur={this.handleEmail.bind(this)}
                       help={this.state.email.help}
                       bsStyle={this.state.email.valid}
                       label="邮件" {...styleLayout} />
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


export default UserinfoPage;
