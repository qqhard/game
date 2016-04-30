import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import CsrfToken from '../common/csrf_token';
import Cascader from 'antd/lib/cascader';
import message from 'antd/lib/message';

const FormItem = Form.Item;
const createForm = Form.create;

class UserinfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceid: 0,
            collegeid: 0,
            instituteid: 0,
            isEmailActivated: false,
            checked: false,
            belongOptions: [],
        }
    }

    initBelong(provinceid, collegeid, instituteid) {
        $.get('/gameApi/provinces', (data)=> {
            var options = [];
            var provinceIndex = -1;
            for (var i = 0; i < data.length; i++) {
                options.push({
                    value: data[i].provinceid,
                    label: data[i].name,
                    children: [
                        {value: '', label: ''}
                    ]
                });
                if (provinceid == data[i].provinceid) {
                    provinceIndex = i;
                }
            }
            if (provinceIndex != -1) {
                $.get(`/gameApi/colleges/${provinceid}`, (data)=> {
                    var collegeIndex = -1;
                    var options2 = [];
                    for (var i in data) {
                        options2.push({
                            value: data[i].collegeid,
                            label: data[i].collegename,
                            children: [
                                {value: '', label: ''}
                            ]
                        });
                        if (collegeid == data[i].collegeid) {
                            collegeIndex = i;
                        }
                    }
                    options[provinceIndex].children = options2;
                    if (collegeIndex != -1) {
                        $.get(`/gameApi/institutes/${collegeid}`, (data) => {
                            var options3 = [];
                            for (var i in data) {
                                options3.push({
                                    value: data[i].instituteid,
                                    label: data[i].institutename,
                                });
                            }
                            options2[collegeIndex].children = options3;
                            this.setState({belongOptions: options});
                        });
                    } else {
                        this.setState({belongOptions: options});
                    }
                });
            } else {
                this.setState({belongOptions: options});
            }
        }, 'json').error(function (e) {
            if (e.status == 403) top.location = '/userApi/auth';
        });
    }

    componentWillMount() {
        var url = '/userApi/userinfo';
        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            async: false,
            success: function (data) {
                this.setState({
                    isEmailActivated: data.isEmailActivated,
                    provinceid: data.provinceid,
                    collegeid: data.collegeid,
                    instituteid: data.instituteid,
                });
                this.initBelong(data.provinceid, data.collegeid, data.instituteid);
                this.props.form.setFieldsValue({
                    phone: data.phone,
                    email: data.email,
                    sociolname: data.sociolname,
                    studentid: data.studentid,
                });
            }.bind(this)
        });
    }

    checkEmail() {
        var body = '_csrf=' + $("input[name=_csrf]").val();
        var url = '/userApi/emailActivation';
        $.post(url, body, function (data) {
            this.setState({message: data.message, checking: true});
        }.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                message.error('表单有误！');
                return;
            }
            var url = '/userApi/userinfo';
            values._csrf = $("input[name=_csrf]").val();
            values.provinceid = this.state.provinceid;
            values.collegeid = this.state.collegeid;
            values.instituteid = this.state.instituteid;
            console.log(values);
            $.ajax({
                url: url,
                type: 'PUT',
                data: values,
                success: function (data) {
                    message.success("个人信息修改成功！");
                    if(!!this.props.nextStep){
                        if(this.state.isEmailActivated)this.props.nextStep();
                        else{
                            message.warn('验证邮箱后才可以报名！');
                        }
                    }
                }.bind(this)
            });
        });
    }

    handleBelong(value) {
        if (value.length > 0 && value[0] != this.state.provinceid) {
            $.get('/gameApi/colleges/' + value[0], function (data) {
                var children = [];
                for (var i in data) {
                    children.push({
                        value: data[i].collegeid,
                        label: data[i].collegename,
                        children: [
                            {value: '', label: ''}
                        ]
                    });
                }

                var options = this.state.belongOptions;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value == value[0]) {
                        options[i].children = children;
                        break;
                    }
                }
                this.setState({belongOptions: options, provinceid: value[0]});
            }.bind(this));
        }
        if (value.length > 1 && value[1] != this.state.collegeid) {
            $.get('/gameApi/institutes/' + value[1], function (data) {
                var children = [];
                for (var i in data) {
                    children.push({
                        value: data[i].instituteid,
                        label: data[i].institutename,
                    });
                }

                var options = this.state.belongOptions;
                var flag = false;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value == value[0]) {
                        var options2 = options[i].children;
                        for (var j in options2) {
                            if (options2[j].value == value[1]) {
                                options2[j].children = children;
                                flag = true;
                                break;
                            }
                        }
                        if (flag)break;
                    }
                }
                this.setState({belongOptions: options, collegeid: value[1]});
            }.bind(this));
        }
        if (value.length > 2 && value[2] != this.state.instituteid) {
            this.setState({instituteid: value[2]});
        }
        if (value.length < 3 || value[0] == 0 || value[1] == 0 || value[2] == 0) {
            this.setState({belongValid:'error'}); 
        }else{
            this.setState({belongValid:'success'}); 
        }
    }

    getEmailIcon(checked, checking) {
        if (checked) {
            return <span style={{lineHeight:"30px",color:'#87d068'}}><Icon type="check-circle"/>邮箱已验证</span>;

        } else {
            if (checking) {
                return <span style={{lineHeight:"30px",color:'origin'}}><Icon type="check-circle"/>{this.state.message}</span>;
            } else {
                return <a onClick={this.checkEmail.bind(this)}><Icon type="exclamation-circle"/>邮箱未验证</a>;
            }
        }

    }

    render() {
        const {getFieldProps} = this.props.form;
        const studentidProps = getFieldProps('studentid', {
            rules: [
                {required: true,min:1, message: '学号不能为空！'}
            ]
        });
        const sociolnameProps = getFieldProps('sociolname', {
            rules: [
                {required: true, message: '姓名不能为空！',}
            ],
        });
        const phoneProps = getFieldProps('phone', {
            rules: [
                {required: true, message: '手机号码不能为空'},
                {len: 11, message: '手机号码长度有误'},
                {pattern: /^\d+$/g, message: '手机号码只能是数字'}
            ]
        });
        const emailProps = getFieldProps('email', {});
        return (

            <Form horizontal form={this.props.form}>
                <CsrfToken />
                <FormItem
                    label="学号："
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                    hasFeedback
                >
                    <Input {...studentidProps} />
                </FormItem>
                <FormItem
                    label="姓名："
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                    hasFeedback
                >
                    <Input {...sociolnameProps}/>
                </FormItem>
                <FormItem
                    label="手机："
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                    hasFeedback
                >
                    <Input {...phoneProps}/>
                </FormItem>
                <FormItem
                    label="邮箱："
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                    hasFeedback
                >
                    <Col span="16">
                        <Input disabled {...emailProps}/>
                    </Col>
                    <Col span="7" offset="1">
                        {this.getEmailIcon(this.state.isEmailActivated, this.state.checking)}
                    </Col>
                </FormItem>
                <FormItem
                    label="学院："
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                    validateStatus={this.state.belongValid}
                >
                    <Cascader
                        options={this.state.belongOptions}
                        defaultValue={[this.state.provinceid,this.state.collegeid,this.state.instituteid]}
                        onChange={this.handleBelong.bind(this)}
                        changeOnSelect style={{width:'100%'}}/>
                </FormItem>
                <FormItem wrapperCol={{ span: 5, offset: 5}}>
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                </FormItem>
            </Form>
        );
    }
}

export default createForm()(UserinfoForm);