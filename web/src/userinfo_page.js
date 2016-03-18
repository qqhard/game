import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import CsrfToken from './components/common/csrf_token';
import Button from 'react-bootstrap/lib/Button';
import BelongsForm from './components/belong_form/belong_form.js';

class UserinfoPage extends React.Component {
    render() {
        return (
            <UserinfoForm username={this.props.params.username}/>
        );
    }
}

class UserinfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialname: {'data': '', 'valid': null, 'help': null},
            studentid: {'data': '', 'valid': null, 'help': null},
            email: {'data': '', 'valid': null, 'help': null},
            phone: {'data': '', 'valid': null, 'help': null},
            provinceid: 0,
            collegeid: 0,
            instituteid: 0
        };
    }

    componentWillMount() {
        var url = '/userinfo/' + this.props.username;
        var phone = this.state.phone;
        var email = this.state.email;
        var sociolname = this.state.socialname;
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
                sociolname['data'] = data.socialname;
                studentid['data'] = data.studentid;
                this.setState({
                    provinceid: data.provinceid,
                    collegeid: data.collegeid,
                    instituteid: data.instituteid,
                    phone: phone,
                    email: email,
                    socialname: sociolname,
                    studentid: studentid
                });
            }.bind(this)
        });
    }

    callbackParent(provinceid, provincename, collegeid, collegename, instituteid, institutename) {
        this.setState({
            provinceid: provinceid,
            provincename: provincename,
            collegeid: collegeid,
            collegename: collegename,
            instituteid: instituteid,
            institutename: institutename
        });
    }

    validateStudentID(id) {

    }

    handleStudentid(e) {
        var filed = this.state.studentid;
        filed['data'] = e.target.value;
        this.setState({studentid: filed});
    }

    handleSociolname(e) {
        var filed = this.state.socialname;
        filed['data'] = e.target.value;
        this.setState({socialname: filed});
    }

    handlePhone(e) {
        var filed = this.state.phone;
        filed['data'] = e.target.value;
        this.setState({phone: filed});
    }

    handleEmail(e) {
        var filed = this.state.email;
        filed['data'] = e.target.value;
        this.setState({email: filed});
    }

    handleSubmit(e) {
        e.preventDefault();
        var body = $(e.target).serialize();
        var url = '/userinfo/' + this.props.username;
        console.log(url);
        $.ajax({
            url: url,
            type: 'PUT',
            data: body,
            success: function (data) {
                console.log(data);
            }
        });
        console.log(body);
    }

    render() {
        const styleLayout = {
            labelClassName: "col-xs-2",
            wrapperClassName: "col-xs-6"
        }
        const right = {display: 'inline'}
        const params = {
            'first': '不选择',
            'provincelabel': '省份',
            'collegelabel': '高校',
            'institutelabel': '学院'
        };


        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <Input type="text" name="studentid" value={this.state.studentid.data}
                       onChange={this.handleStudentid.bind(this)} label="学号" {...styleLayout} />
                <Input type="text" name="sociolname" value={this.state.socialname.data}
                       onChange={this.handleSociolname.bind(this)} label="姓名" {...styleLayout} />
                <Input type="text" name="phone" value={this.state.phone.data} onChange={this.handlePhone.bind(this)}
                       label="手机" {...styleLayout} />
                <Input type="text" name="email" value={this.state.email.data} onChange={this.handleEmail.bind(this)}
                       label="邮件" {...styleLayout} />
                <BelongsForm
                    callbackParent={this.callbackParent.bind(this)} p={params}
                    provinceid={this.state.provinceid} provincename={this.state.provincename}
                    collegeid={this.state.collegeid} collegename={this.state.collegename}
                    instituteid={this.state.instituteid} institutename={this.state.institutename}
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
