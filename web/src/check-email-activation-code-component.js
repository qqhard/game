import React from 'react';
import {render} from 'react-dom'
import { browserHistory } from 'react-router';

class CheckEmailActivationCodeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    componentWillMount() {
        var url = '/userApi/checkActivation/'+this.props.params.code;
        $.get(url, function (data) {
            if (data.status == 'ok'){
                this.setState({message: data.message});
            }
        }.bind(this)).error(function () {
            const next_url = `/login-check-email-${this.props.params.code}.html`;
            browserHistory.push(next_url);
        }.bind(this));
    }

    render() {
        return (
            <h1>{this.state.message}</h1>
        )
    }

}

export default CheckEmailActivationCodeComponent;