/**
 * Created by hard on 16-5-30.
 */
import React from 'react';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
const styles = {
    button: {
        width: '60%'
    }
};

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            rePassword: ''
        }
    }

    handleUsername(e) {
        this.setState({username: e.target.value})
    }

    handleEmail(e) {
        this.setState({email: e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    handleRePassword(e) {
        this.setState({rePassword: e.target.value})
    }

    handleSubmit() {
        const {onSubmit} = this.props;
        onSubmit(this.state.username, this.state.email, this.state.password, this.state.rePassword);
    }

    render() {
        return (
            <div style={this.props.style}>
                <TextField
                    floatingLabelText="用户名"
                    value={this.state.username}
                    onChange={this.handleUsername.bind(this)}
                    fullWidth={true}
                />
                <TextField
                    floatingLabelText="邮箱"
                    value={this.state.email}
                    fullWidth={true}
                    onChange={this.handleEmail.bind(this)}
                />
                <TextField
                    floatingLabelText="密码"
                    type="password"
                    value={this.state.password}
                    fullWidth={true}
                    onChange={this.handlePassword.bind(this)}
                />
                <TextField
                    floatingLabelText="确认密码"
                    type="password"
                    value={this.state.rePassword}
                    fullWidth={true}
                    onChange={this.handleRePassword.bind(this)}
                />
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

export default RegisterForm;
