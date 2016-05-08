import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import CsrfToken from '../common/csrf_token';
import {browserHistory} from 'react-router'
import message from 'antd/lib/message';
import './form.scss';

const formItemLayout = {
    labelCol: {span: 5} ,
    wrapperCol :{ span: 12 }
};
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

const checkEmpty = function(rule, value, callback){
    if(!value){
        callback();
    }else{
        if(value.replace(/\s*/g,"").length == 0){
            callback([new Error('输入格式错误！')]);
        } else if(value.indexOf('#')>=0){
            callback([new Error('输入格式错误！')]);
        } else{
            callback();
        }
    }
}

class TeamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                message.error('表单有误！');
                return;
            }
            const forms = this.props.game.formList.map((val,index)=>{
                const value = values[`form-${index}`];
                delete values[`form-${index}`];
                return `${val.name}=${value}`; 
            });
            values.forms = forms.join("#");
            values.gamename = this.props.gamename;
            values._csrf = $('input[name=_csrf]').val();
            console.log(values);
            $.post('/gameApi/team', values, function (data) {
                if (data.status == 'ok') {
                    message.success('队伍创建成功！');
                    setTimeout(function () {
                        browserHistory.push("/teammanage-" + data.data + ".html");
                    }, 500);
                } else {
                    message.error('队伍创建失败！');
                }
            }.bind(this)).error(function (e) {
                message.error('队伍创建失败:'+e.responseText);
            });
        });
    }


    render() {
        const {getFieldProps} = this.props.form;
        const ennameProps = getFieldProps('enname', {
            rules: [
                {required: true, message: '请填写英文队名！'},
                {pattern: /^\w[a-zA-Z0-9 ]*$/g, message: '仅能输入字母,数字和空格！'}
            ]
        });
        const cnnameProps = getFieldProps('cnname', {
            rules: [
                {required: true,min:1, message: '请填写中文队名！'},
                { validator: checkEmpty},
            ]
        });
        const identityProps = getFieldProps('identity', {
            rules: [
                { required: true, message: '请选择您的身份！' }
            ],
        });
        const infoProps = getFieldProps('info', {
            rules: [
                { required: true, message: '请选择队伍简介！' },
                { min:3,max:50, message: '字数应在3到50之间!' },
                { validator: checkEmpty},
            ],
        });
        
        const formList = this.props.game.formList.map((val,index)=>{
            const userDefineFormProps = getFieldProps(`form-${index}`,{
                rules: [
                    { required: true, message: `请填写${val.name}!`},
                    { validator: checkEmpty},
                ]
            });
            return (
                <FormItem
                    label={`${val.name}：`}
                    {...formItemLayout}
                    hasFeedback
                >
                    <Input {...userDefineFormProps}/>
                </FormItem>
            ); 
        });

        return (
        
            <Form horizontal form={this.props.form}>
                <CsrfToken />
                <FormItem
                    label="英文名："
                    {...formItemLayout}
                    hasFeedback
                >
                    <Input {...ennameProps} />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="中文名："
                    hasFeedback
                >
                    <Input {...cnnameProps}/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="您的身份：">
                    <Select {...identityProps} placeholder="您的身份" style={{ width: '100%' }}>
                        <Option value="队长">队长</Option>
                        <Option value="教练">教练</Option>
                        <Option value="指导老师">指导老师</Option>
                    </Select>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="队伍简介："
                    hasFeedback
                >
                    <Input {...infoProps} type="textarea"/>
                </FormItem>
                {formList}
                <FormItem wrapperCol={{ span: 5, offset: 5}}>
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                </FormItem>
            </Form>
        );
    }
}

export default createForm()(TeamForm);
