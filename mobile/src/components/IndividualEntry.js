/**
 * Created by hard on 16-5-30.
 */

import React from 'react';
import {browserHistory} from 'react-router';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import RegisterForm from './form/RegisterForm';
import LoginForm from './form/LoginForm';
import UserinfoForm from './form/UserinfoForm';
import EntryForm from './form/EntryForm';
import EntryInfo from './info/EntryInfo'
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import {title, form} from '../constant/styles';

class IndividualEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: '',
        }
    }

    componentWillMount() {
        this.props.getEntryStep(this.props.params.gamename);
    }

    componentWillReceiveProps(nextProps) {
        if (!!nextProps.userinfo) {
            const {getProvinces, getColleges, getInstitutes} = this.props;
            getProvinces();
            if (nextProps.userinfo.provinceid > 0) getColleges(nextProps.userinfo.provinceid);
            if (nextProps.userinfo.collegeid > 0) getInstitutes(nextProps.userinfo.collegeid);
        }
        if (!!nextProps.message) {
            if (nextProps.message.status == true) {
                this.setState({open: true, message: '用户信息修改成功'});
                setTimeout(()=> {
                    this.setState({open: false});
                }, 1000);
            } else if (nextProps.message.status == false) {
                this.setState({open: true, message: '用户信息修改失败'});
                setTimeout(()=> {
                    this.setState({open: false});
                }, 1000);
            }
        }
        if (!!nextProps.stepIndex && this.props.stepIndex != nextProps.stepIndex) {
            switch (nextProps.stepIndex) {
                case 2:
                    const {getUserinfo} = this.props;
                    getUserinfo();
                    break;
                case 3:
                    const {getGame} = this.props;
                    getGame(this.props.params.gamename);
                    break;
                case 4:
                    const {getEntry} = this.props;
                    getEntry(this.props.params.gamename);
                    break;
                default:
                    break;
            }
        }
    }
    
    handleRegisterSubmit(username, email, password, rePassword) {
        const {submitRegister,setEntryStep} = this.props;
        submitRegister(username, email, password, rePassword,()=>{
            setEntryStep(1); 
        });
    }

    handleLoginSubmit(username, password) {
        const {submitLogin, getEntryStep} = this.props;
        submitLogin(username, password,()=>{
            getEntryStep(this.props.params.gamename);
        });
    }


    handleUserinfoSubmit(studentid, sociolname, phone, email, provinceid, collegeid, instituteid) {
        const {submitUserinfo,setEntryStep} = this.props;
        submitUserinfo(studentid, sociolname, phone, email, provinceid, collegeid, instituteid,()=>{    
            setEntryStep(3);
        });
    }

    handleEntrySubmit(body) {
        const {submitEntry,setEntryStep} = this.props;
        submitEntry(body,()=>{
            setEntryStep(4);
        });
    }

    render() {
        const {stepIndex, setEntryStep} = this.props;
        const {userinfo, provinces, colleges, institutes, game, entry} = this.props;
        return (
            <div>
                <AppBar
                    title="赛事报名"
                    iconElementLeft={
                        <IconButton onClick={
                            ()=>browserHistory.push('/games.html')
                        }>
                            <HardwareKeyboardArrowLeft />
                        </IconButton>
                    }
                    style={title}
                />
                <Stepper style={form} activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel onClick={()=>setEntryStep(0)}>用户注册</StepLabel>
                        <StepContent>
                            <RegisterForm onSubmit={this.handleRegisterSubmit.bind(this)}/>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel onClick={()=>setEntryStep(1)}>用户登陆</StepLabel>
                        <StepContent>
                            <LoginForm onSubmit={this.handleLoginSubmit.bind(this)}/>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>用户信息</StepLabel>
                        <StepContent>
                            <UserinfoForm
                                userinfo={userinfo}
                                provinces={provinces}
                                colleges={colleges}
                                institutes={institutes}
                                onSubmit={this.handleUserinfoSubmit.bind(this)}
                            />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel onClick={()=>setEntryStep(3)}>报名信息</StepLabel>
                        <StepContent>
                            <EntryForm game={game} onSubmit={this.handleEntrySubmit.bind(this)}/>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>报名成功</StepLabel>
                        <StepContent>
                            <EntryInfo entry={entry}/>
                        </StepContent>
                    </Step>
                </Stepper>
                <Dialog
                    modal={false}
                    open={this.state.open}
                >
                    {this.state.message}
                </Dialog>
            </div>
        );
    }
}

export default IndividualEntry;
