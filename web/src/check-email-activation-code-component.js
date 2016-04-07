import React from 'react';
import {render} from 'react-dom'
import message from 'antd/lib/message';
import Button from 'react-bootstrap/lib/Button';

class CheckEmailActivationCodeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            message: ''
        }
    }

    componentWillMount() {
        var url = '/userApi/'+this.props.params.username+'/checkActivation/'+this.props.params.code;
        $.get(url, function (data) {
            this.setState({status: data.status, message: data.message});
        }.bind(this))
    }

    render() {
        return (
            <h1>{this.state.message}</h1>
        )
    }

}

export default CheckEmailActivationCodeComponent;