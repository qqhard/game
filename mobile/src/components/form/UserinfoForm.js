/**
 * Created by hard on 16-5-30.
 */
import React from 'react';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    title: {
        position: 'fixed',
        top: '0px',
        left: '0px'
    },
    form: {},
    button: {
        width: '60%'
    }
};

class UserinfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentid: '',
            sociolname: '',
            phone: '',
            email: '',
        }
    }

    componentWillReceiveProps(newProps) {
        if (!!newProps.userinfo) {
            this.setState(newProps.userinfo);
        }
    }

    handleStudentid(e) {
        this.setState({studentid: e.target.value})
    }

    handleSociolname(e) {
        this.setState({sociolname: e.target.value})
    }

    handleEmail(e) {
        this.setState({email: e.target.value})
    }

    handlePhone(e) {
        this.setState({phone: e.target.value});
    }
    
    handleProvince(event, index, provinceid) {
        if(this.state.provinceid != provinceid){
            this.props.getColleges(provinceid);
            this.props.clearInstitutes();
            this.setState({provinceid,collegeid:0,instituteid:0});
        }
    }
    
    handleCollege(event, index, collegeid) {
        if(this.state.collegeid != collegeid){
            this.props.getInstitutes(collegeid);
            this.setState({collegeid,instituteid:0})
        }
    }

    handleInstitute(event, index, instituteid) {
        this.setState({instituteid})
    }

    handleSubmit() {
        var {onSubmit} = this.props;
        const { studentid,sociolname,phone,email,provinceid,collegeid,instituteid } = this.state;
        onSubmit(studentid,sociolname,phone,email,provinceid,collegeid,instituteid);
    }
    
    render() {

        const provinces = ()=> {
            let ret = null;
            if (!!this.props.provinces) {
                ret = this.props.provinces.map((val, index)=> {
                    return <MenuItem value={val.provinceid} key={index} label={val.name} primaryText={val.name}/>
                });
            }
            return ret;
        }
        
        const colleges = ()=> {
            let ret = null;
            if (!!this.props.colleges) {
                ret = this.props.colleges.map((val, index)=> {
                    return <MenuItem value={val.collegeid} key={index} label={val.collegename} primaryText={val.collegename}/>
                });
            }
            return ret;
        }
        
        const institutes = ()=> {
            let ret = null;
            if (!!this.props.institutes) {
                ret = this.props.institutes.map((val, index)=> {
                    return <MenuItem value={val.instituteid} key={index} label={val.institutename} primaryText={val.institutename}/>
                });
            }
            return ret;
        }

        return (
            <div style={this.props.style}>
                <TextField
                    floatingLabelText="学号"
                    value={this.state.studentid}
                    fullWidth={true}
                    onChange={this.handleStudentid.bind(this)}
                />
                <TextField
                    floatingLabelText="姓名"
                    value={this.state.sociolname}
                    fullWidth={true}
                    onChange={this.handleSociolname.bind(this)}
                />
                <TextField
                    floatingLabelText="手机"
                    value={this.state.phone}
                    fullWidth={true}
                    onChange={this.handlePhone.bind(this)}
                />
                <TextField
                    floatingLabelText="邮箱"
                    value={this.state.email}
                    fullWidth={true}
                    disabled={true}
                    errorText={!this.state.isEmailActivated && <p>您的邮箱尚未验证，<a href="www.baidu.com">点击验证</a></p>}
                />
                <SelectField floatingLabelText="省份" fullWidth={true} value={this.state.provinceid} onChange={this.handleProvince.bind(this)}>
                    {provinces()}
                </SelectField>
                <SelectField floatingLabelText="学校" fullWidth={true} value={this.state.collegeid} onChange={this.handleCollege.bind(this)}>
                    {colleges()}
                </SelectField>
                <SelectField floatingLabelText="学院" fullWidth={true} value={this.state.instituteid} onChange={this.handleInstitute.bind(this)}>
                    {institutes()}
                </SelectField>
                <div style={{textAlign:'center',marginTop:'20px'}}>
                    <RaisedButton
                        label="提交"
                        primary={true}
                        style={styles.button}
                        onClick={this.handleSubmit.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

export default UserinfoForm;
