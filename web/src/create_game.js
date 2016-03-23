import React from 'react';
import GameForm from './components/game_form/game_form.js';
import {Row, Col} from 'antd';
import PageHeader from 'react-bootstrap/lib/PageHeader';

class CreateGame extends React.Component {

    render() {
        console.log(this.context);
        return (
            <div>
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
