import React from 'react';
import EntryForm from './components/forms/entry_form.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import GameLimitInfo from './components/info/game_limit_info.js';

class EntryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {game: ''};
    }

    componentDidMount() {
        $.get('/gameApi/game/' + this.props.params.gamename, function (data) {
            this.setState({game: data});
        }.bind(this));
    }

    render() {
        console.log(this.context);
        var gameLimitInfo = null;
        if(!!this.state.game) gameLimitInfo = <GameLimitInfo data={this.state.game}/>;
        return (
            <div className="container">
                <Row>
                    <Col xsOffset={1} xs={10}>
                        <PageHeader>{this.state.game.gametitle}
                            <small> {this.state.game.briefinfo} </small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={2} xs={8}>
                        {gameLimitInfo} 
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={1} xs={12}>
                        <EntryForm gamename={this.props.params.gamename}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EntryPage;
