import React from 'react';
import LoginForm from '../components/forms/login_form.js';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PageHeader from '../../node_modules/react-bootstrap/lib/PageHeader';

class LoginCheckEmail extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const query = `?checkEmail=${this.props.params.code}`;
        return (
            <div className="container">
                <Row>
                    <Col offset="6" span="12">
                        <PageHeader>Sign In
                            <small> to check your email</small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col offset="8" span="8">
                        <LoginForm query={query}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default LoginCheckEmail;