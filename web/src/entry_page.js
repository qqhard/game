import React from 'react';
import EntryForm from './components/entry_form/entry_form.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

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
        return (
            <div>
                <Row>
                    <Col offset="4" span="16">
                        <PageHeader>{this.state.game.gametitle}
                            <small> {this.state.game.briefinfo} </small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col offset="4" span="20">
                        <EntryForm username={this.props.params.username} gamename={this.props.params.gamename}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EntryPage;
