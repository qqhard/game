import React from 'react';
import GameInfo from '../components/game_info/game_info.js';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import GameSteps from '../components/game_steps/game_steps.js'
import GameComment from '../components/game_comment/game_comment'
import CheckForm from '../components/forms/check_form.js'

class GameFailed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {game: ''};
    }

    componentDidMount() {
        var _this = this;
        $.get('/game/' + this.props.params.gamename, function (data) {
            _this.setState({game: data});
        });
    }


    render() {
        console.log(this.state.game);
        if (!this.state.game)return <div></div>;
  
        return (
            <Grid>
                <Row>
                    <Col xsOffset={1} xs={8}>
                        <GameInfo data={this.state.game}/>
                    </Col>
                    <Col xs={3}>
                        <GameSteps game={this.state.game}/>
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={1} xs={8}>
                        <CheckForm gamename={this.state.game.gamename} step={this.state.game.step}/>
                    </Col>
                </Row>
            </Grid>

        )
    }
}


export default GameFailed;
