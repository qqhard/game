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

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleUsername(e) {
        this.setState({username: e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    handleSubmit() {
        var {onSubmit} = this.props;
        onSubmit(this.state.username, this.state.password);
    }

    render() {
        return (
            <div style={this.props.style}>
                <TextField
                    floatingLabelText="用户名"
                    value={this.state.username}
                    fullWidth={true}
                    onChange={this.handleUsername.bind(this)}
                />
                <TextField
                    floatingLabelText="密码"
                    type="password"
                    fullWidth={true}
                    value={this.state.password}
                    onChange={this.handlePassword.bind(this)}
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

export default LoginForm;
