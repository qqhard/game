import React from 'react';
import GameForm from './../components/forms/game_form.js';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PageHeader from '../../node_modules/react-bootstrap/lib/PageHeader';

class CreateGame extends React.Component {

    render() {
        console.log(this.context);
        return (
            <div className="container">
                <Row>
                    <Col offset="4" span="16">
                        <PageHeader>创建赛事
                            <small> 请认真填写</small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col offset="4" span="20">
                        <GameForm />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CreateGame;
