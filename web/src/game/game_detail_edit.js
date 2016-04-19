import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageHeader from '../../node_modules/react-bootstrap/lib/PageHeader';
import GameDetailForm from '../components/forms/game_detail_form.js'; 

class GameDetailEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col>
                        <PageHeader>赛事详情
                            <small> 请认真填写</small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <GameDetailForm />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default GameDetailEdit;
