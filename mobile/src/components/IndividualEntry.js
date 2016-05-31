/**
 * Created by hard on 16-5-30.
 */

import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RegisterForm from './form/RegisterForm';
import LoginForm from './form/LoginForm';
import UserinfoForm from './form/UserinfoForm';

class IndividualEntry extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    handlePrev() {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };
    
    handleLoginSubmit(username,password) {
        const { submitLogin } = this.props;
        submitLogin(username,password);
    }
    
    handleRegisterSubmit(username,email,password,rePassword) {
        const { submitRegister } = this.props;
        submitRegister(username,email,password,rePassword);
    }

    render() {
        const { stepIndex,setEntryStep } = this.props;
        return (
            <div>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel onClick={()=>setEntryStep(0)}>用户注册</StepLabel>
                        <StepContent>
                            <RegisterForm onSubmit={this.handleRegisterSubmit.bind(this)} />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel onClick={()=>setEntryStep(1)}>用户登陆</StepLabel>
                        <StepContent>
                            <LoginForm onSubmit={this.handleLoginSubmit.bind(this)} />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>用户信息</StepLabel>
                        <StepContent>
                            <UserinfoForm />
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

export default IndividualEntry;
