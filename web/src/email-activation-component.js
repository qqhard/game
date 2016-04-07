import React from 'react';
import {render} from 'react-dom'
import message from 'antd/lib/message';
import Button from 'react-bootstrap/lib/Button';
import CsrfToken from './components/common/csrf_token.js';

class EmailActivationComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.params.username);
        this.state = {
            status: '',
            message: ''
        }
    }

    sendEmail() {
        var body = '_csrf=' + $("input[name=_csrf]").val();
        var url = '/userApi/' + this.props.params.username + '/emailActivation';
        $.post(url, body, function (data) {
            this.setState({status: data.status});
            this.setState({message: data.message});
        }.bind(this));
    }

    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                <Button type="submit" size="large" onClick={this.sendEmail.bind(this)}>吃我验证邮件啦</Button>
                <form>
                    <CsrfToken /></form>
            </div>
        )
    }
}

export default EmailActivationComponent;