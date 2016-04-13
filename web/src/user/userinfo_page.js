import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import {Link} from 'react-router';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import UserinfoForm from '../components/forms/userinfo_form.js';

class UserinfoPage extends React.Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col offset="4" span="16">
                        <PageHeader>个人信息
                            <small> 请谨慎修改</small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col offset="4" span="20">
                        <UserinfoForm username={this.props.params.username}/>
                    </Col>
                </Row>
            </div>
        );
    }
}



export default UserinfoPage;
